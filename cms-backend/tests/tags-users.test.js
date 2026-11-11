const { app, request, pool, resetDb, createUser, createTag, createPost, auth } = require('./helpers');

let admin;
let author;

beforeEach(async () => {
  await resetDb();
  admin = await createUser({ role: 'admin' });
  author = await createUser();
});
afterAll(() => pool.end());

describe('tags', () => {
  test('GET /api/tags lists tags with post counts (and /api/posts/tags/all still works)', async () => {
    const tag = await createTag('Wildlife');
    await createTag('Beaches');
    await createPost(author, { tag_ids: [tag.id] });
    const res = await request(app).get('/api/tags');
    expect(res.status).toBe(200);
    expect(res.body.data.map((t) => [t.name, t.post_count])).toEqual([['Beaches', 0], ['Wildlife', 1]]);
    expect((await request(app).get('/api/posts/tags/all')).body.data).toHaveLength(2);
  });

  test('admin creates a tag with a generated slug', async () => {
    const res = await request(app).post('/api/tags').set(auth(admin)).send({ name: 'Road Trips' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ name: 'Road Trips', slug: 'road-trips' });
  });

  test('rejects duplicates, empty names and non-admins', async () => {
    await createTag('Wildlife');
    expect((await request(app).post('/api/tags').set(auth(admin)).send({ name: 'wildlife' })).status).toBe(409);
    expect((await request(app).post('/api/tags').set(auth(admin)).send({ name: '  ' })).status).toBe(400);
    expect((await request(app).post('/api/tags').set(auth(author)).send({ name: 'New' })).status).toBe(403);
  });

  test('admin renames a tag', async () => {
    const tag = await createTag('Wildlfe');
    const res = await request(app).put(`/api/tags/${tag.id}`).set(auth(admin)).send({ name: 'Wildlife' });
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ name: 'Wildlife', slug: 'wildlife' });
    expect((await request(app).put('/api/tags/999').set(auth(admin)).send({ name: 'X' })).status).toBe(404);
  });

  test('deleting a tag detaches it from posts', async () => {
    const tag = await createTag('Gone');
    const post = await createPost(author, { tag_ids: [tag.id] });
    expect((await request(app).delete(`/api/tags/${tag.id}`).set(auth(admin))).status).toBe(200);
    const res = await request(app).get(`/api/posts/${post.slug}`);
    expect(res.body.data.tags).toEqual([]);
    expect((await request(app).delete(`/api/tags/${tag.id}`).set(auth(admin))).status).toBe(404);
  });
});

describe('users', () => {
  test('admin lists users with post counts but no password hashes', async () => {
    await createPost(author);
    const res = await request(app).get('/api/users').set(auth(admin));
    expect(res.status).toBe(200);
    const listed = res.body.data.find((u) => u.id === author.id);
    expect(listed.post_count).toBe(1);
    expect(listed.hashed_password).toBeUndefined();
  });

  test('authors cannot access user management', async () => {
    expect((await request(app).get('/api/users').set(auth(author))).status).toBe(403);
  });

  test('admin changes a role and it takes effect immediately', async () => {
    const res = await request(app).patch(`/api/users/${author.id}`).set(auth(admin)).send({ role: 'admin' });
    expect(res.status).toBe(200);
    expect(res.body.data.role).toBe('admin');
    // The author's existing token now has admin rights without re-login.
    expect((await request(app).get('/api/users').set(auth(author))).status).toBe(200);
  });

  test('validates role and protects the admin from changing themselves', async () => {
    expect((await request(app).patch(`/api/users/${author.id}`).set(auth(admin)).send({ role: 'owner' })).status).toBe(400);
    expect((await request(app).patch(`/api/users/${admin.id}`).set(auth(admin)).send({ role: 'author' })).status).toBe(400);
    expect((await request(app).patch('/api/users/999').set(auth(admin)).send({ role: 'author' })).status).toBe(404);
  });

  test('admin deletes a user; their posts remain without an author', async () => {
    const post = await createPost(author);
    expect((await request(app).delete(`/api/users/${author.id}`).set(auth(admin))).status).toBe(200);
    const { rows } = await pool.query('SELECT author_id FROM posts WHERE id = $1', [post.id]);
    expect(rows[0].author_id).toBeNull();
    expect((await request(app).get('/api/auth/profile').set(auth(author))).status).toBe(401);
  });

  test('admin cannot delete themselves', async () => {
    expect((await request(app).delete(`/api/users/${admin.id}`).set(auth(admin))).status).toBe(400);
  });
});
