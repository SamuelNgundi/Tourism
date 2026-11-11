const { app, request, pool, resetDb, createUser, createTag, createPost, auth } = require('./helpers');

let admin;
let author;

beforeEach(async () => {
  await resetDb();
  admin = await createUser({ role: 'admin' });
  author = await createUser();
});
afterAll(() => pool.end());

describe('public post listing', () => {
  test('returns only published posts with empty tag arrays and comment counts', async () => {
    await createPost(author, { title: 'Published' });
    await createPost(author, { title: 'Draft', status: 'draft' });
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(res.body.data.posts.map((p) => p.title)).toEqual(['Published']);
    expect(res.body.data.posts[0]).toMatchObject({ tags: [], comment_count: 0, view_count: 0 });
    expect(res.body.data.pagination.totalItems).toBe(1);
  });

  test('supports search and tag filters', async () => {
    const wildlife = await createTag('Wildlife');
    await createPost(author, { title: 'Maasai Mara safari', tag_ids: [wildlife.id] });
    await createPost(author, { title: 'Nairobi food tour', body: '<p>Nyama choma</p>' });

    const search = await request(app).get('/api/posts?search=nyama');
    expect(search.body.data.posts.map((p) => p.title)).toEqual(['Nairobi food tour']);

    const tag = await request(app).get('/api/posts?tag=wildlife');
    expect(tag.body.data.posts.map((p) => p.title)).toEqual(['Maasai Mara safari']);
    expect(tag.body.data.posts[0].tags).toEqual(['Wildlife']);
  });

  test('clamps the page size', async () => {
    const res = await request(app).get('/api/posts?limit=1000');
    expect(res.body.data.pagination.itemsPerPage).toBe(50);
  });
});

describe('GET /api/posts/:slug', () => {
  test('returns published posts and counts views', async () => {
    const post = await createPost(author, { title: 'Hello Kenya' });
    await request(app).get(`/api/posts/${post.slug}`);
    const res = await request(app).get(`/api/posts/${post.slug}`);
    expect(res.status).toBe(200);
    expect(res.body.data.view_count).toBe(2);
  });

  test('hides drafts from the public', async () => {
    const post = await createPost(author, { title: 'Secret', status: 'draft' });
    expect((await request(app).get(`/api/posts/${post.slug}`)).status).toBe(404);
  });
});

describe('admin post listing', () => {
  test('GET /admin/all returns drafts and filters by status', async () => {
    await createPost(author, { title: 'Draft', status: 'draft' });
    await createPost(author, { title: 'Live' });
    const all = await request(app).get('/api/posts/admin/all').set(auth(admin));
    expect(all.status).toBe(200);
    expect(all.body.data.posts).toHaveLength(2);

    const drafts = await request(app).get('/api/posts/admin/all?status=draft').set(auth(admin));
    expect(drafts.body.data.posts.map((p) => p.title)).toEqual(['Draft']);
  });

  test('authors only see their own posts', async () => {
    const other = await createUser();
    await createPost(other, { title: 'Not mine' });
    await createPost(author, { title: 'Mine', status: 'draft' });
    const res = await request(app).get('/api/posts/admin/all').set(auth(author));
    expect(res.body.data.posts.map((p) => p.title)).toEqual(['Mine']);
  });

  test('GET /admin/:id enforces ownership and validates the id', async () => {
    const post = await createPost(admin, { title: 'Admin post' });
    expect((await request(app).get(`/api/posts/admin/${post.id}`).set(auth(author))).status).toBe(403);
    expect((await request(app).get('/api/posts/admin/abc').set(auth(admin))).status).toBe(400);
    const res = await request(app).get(`/api/posts/admin/${post.id}`).set(auth(admin));
    expect(res.status).toBe(200);
    expect(res.body.data.tag_ids).toEqual([]);
  });
});

describe('creating posts', () => {
  test('stores featured image, tags and generates a unique slug', async () => {
    const tag = await createTag('Food');
    const first = await createPost(author, { title: 'Same Title', featured_image: '/uploads/images/a.jpg', tag_ids: [tag.id, tag.id] });
    const second = await createPost(author, { title: 'Same Title' });
    expect(first).toMatchObject({ slug: 'same-title', featured_image: '/uploads/images/a.jpg', tags: ['Food'] });
    expect(second.slug).toBe('same-title-1');
    expect(first.published_at).toBeTruthy();
  });

  test('rejects unknown tags and unsafe image URLs', async () => {
    const badTag = await request(app).post('/api/posts').set(auth(author)).send({ title: 'T', body: 'B', tag_ids: [999] });
    const badImage = await request(app).post('/api/posts').set(auth(author))
      .send({ title: 'T', body: 'B', featured_image: 'javascript:alert(1)' });
    expect(badTag.status).toBe(400);
    expect(badImage.status).toBe(400);
  });

  test('requires title and body', async () => {
    const res = await request(app).post('/api/posts').set(auth(author)).send({ title: 'Only title' });
    expect(res.status).toBe(400);
  });

  test('admins can assign an author; authors cannot', async () => {
    const byAdmin = await createPost(admin, { author_id: author.id });
    expect(byAdmin.author_id).toBe(author.id);
    const byAuthor = await createPost(author, { author_id: admin.id });
    expect(byAuthor.author_id).toBe(author.id);
  });
});

describe('updating posts', () => {
  test('body-only update keeps title, slug and tags', async () => {
    const tag = await createTag('Wildlife');
    const post = await createPost(author, { title: 'Stable', tag_ids: [tag.id] });
    const res = await request(app).put(`/api/posts/${post.id}`).set(auth(author)).send({ body: '<p>New</p>' });
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ title: 'Stable', slug: 'stable', body: '<p>New</p>', tags: ['Wildlife'] });
  });

  test('resending the same title does not change the slug', async () => {
    const post = await createPost(author, { title: 'Keep Me' });
    const res = await request(app).put(`/api/posts/${post.id}`).set(auth(author)).send({ title: 'Keep Me', body: 'x' });
    expect(res.body.data.slug).toBe('keep-me');
  });

  test('changing the title updates the slug and tag_ids replaces tags', async () => {
    const a = await createTag('A');
    const b = await createTag('B');
    const post = await createPost(author, { title: 'Old', tag_ids: [a.id] });
    const res = await request(app).put(`/api/posts/${post.id}`).set(auth(author)).send({ title: 'New Title', tag_ids: [b.id] });
    expect(res.body.data).toMatchObject({ slug: 'new-title', tags: ['B'] });
  });

  test('publishing a draft sets published_at; featured image can be cleared', async () => {
    const post = await createPost(author, { status: 'draft', featured_image: 'https://example.com/a.jpg' });
    expect(post.published_at).toBeNull();
    const res = await request(app).put(`/api/posts/${post.id}`).set(auth(author)).send({ status: 'published', featured_image: null });
    expect(res.body.data.published_at).toBeTruthy();
    expect(res.body.data.featured_image).toBeNull();
  });

  test("authors cannot edit other people's posts; admins can", async () => {
    const post = await createPost(admin);
    expect((await request(app).put(`/api/posts/${post.id}`).set(auth(author)).send({ body: 'x' })).status).toBe(403);
    expect((await request(app).put(`/api/posts/${post.id}`).set(auth(admin)).send({ body: 'x' })).status).toBe(200);
  });

  test('returns 404 for missing posts and 400 for invalid status', async () => {
    const post = await createPost(author);
    expect((await request(app).put('/api/posts/9999').set(auth(admin)).send({ body: 'x' })).status).toBe(404);
    expect((await request(app).put(`/api/posts/${post.id}`).set(auth(author)).send({ status: 'live' })).status).toBe(400);
  });
});

describe('deleting posts', () => {
  test('admin only, 404 when missing', async () => {
    const post = await createPost(author);
    expect((await request(app).delete(`/api/posts/${post.id}`).set(auth(author))).status).toBe(403);
    expect((await request(app).delete(`/api/posts/${post.id}`).set(auth(admin))).status).toBe(200);
    expect((await request(app).delete(`/api/posts/${post.id}`).set(auth(admin))).status).toBe(404);
  });
});
