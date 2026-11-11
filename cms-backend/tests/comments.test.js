const { createApp } = require('../app');
const { app, request, pool, resetDb, createUser, createPost, auth } = require('./helpers');

let admin;
let post;
const comment = { author_name: 'Wanjiru', author_email: 'wanjiru@example.com', body: 'Great trip!' };

beforeEach(async () => {
  await resetDb();
  admin = await createUser({ role: 'admin' });
  post = await createPost(admin, { title: 'Diani Beach' });
});
afterAll(() => pool.end());

const submit = (body = comment, slug = post.slug) => request(app).post(`/api/posts/${slug}/comments`).send(body);

describe('public comments', () => {
  test('submitted comments are pending and hidden until approved', async () => {
    const res = await submit();
    expect(res.status).toBe(201);
    expect(res.body.data.status).toBe('pending');
    expect(res.body.data.author_email).toBeUndefined();
    expect((await request(app).get(`/api/posts/${post.slug}/comments`)).body.data).toEqual([]);
  });

  test('validates input and rejects comments on drafts or missing posts', async () => {
    expect((await submit({ ...comment, author_email: 'bad' })).status).toBe(400);
    expect((await submit({ ...comment, body: '' })).status).toBe(400);
    expect((await submit({ ...comment, body: 'x'.repeat(2001) })).status).toBe(400);
    expect((await submit(comment, 'missing')).status).toBe(404);
    const draft = await createPost(admin, { status: 'draft' });
    expect((await submit(comment, draft.slug)).status).toBe(404);
  });

  test('comment submission is rate limited', async () => {
    const limited = createApp({ publicFormRateLimit: 2 });
    await request(limited).post(`/api/posts/${post.slug}/comments`).send(comment);
    await request(limited).post(`/api/posts/${post.slug}/comments`).send(comment);
    expect((await request(limited).post(`/api/posts/${post.slug}/comments`).send(comment)).status).toBe(429);
  });
});

describe('comment moderation', () => {
  test('admin lists pending comments and approves one; it becomes public and counted', async () => {
    const created = (await submit()).body.data;
    const pending = await request(app).get('/api/comments?status=pending').set(auth(admin));
    expect(pending.body.data.comments).toHaveLength(1);
    expect(pending.body.data.comments[0]).toMatchObject({ post_title: 'Diani Beach', author_email: 'wanjiru@example.com' });

    const approve = await request(app).patch(`/api/comments/${created.id}`).set(auth(admin)).send({ status: 'approved' });
    expect(approve.status).toBe(200);

    const pub = await request(app).get(`/api/posts/${post.slug}/comments`);
    expect(pub.body.data.map((c) => c.body)).toEqual(['Great trip!']);
    expect(pub.body.data[0].author_email).toBeUndefined();
    const list = await request(app).get('/api/posts');
    expect(list.body.data.posts[0].comment_count).toBe(1);
  });

  test('rejected comments stay hidden; invalid status is rejected', async () => {
    const created = (await submit()).body.data;
    await request(app).patch(`/api/comments/${created.id}`).set(auth(admin)).send({ status: 'rejected' });
    expect((await request(app).get(`/api/posts/${post.slug}/comments`)).body.data).toEqual([]);
    expect((await request(app).patch(`/api/comments/${created.id}`).set(auth(admin)).send({ status: 'spam' })).status).toBe(400);
  });

  test('admin deletes comments; authors cannot moderate', async () => {
    const author = await createUser();
    const created = (await submit()).body.data;
    expect((await request(app).get('/api/comments').set(auth(author))).status).toBe(403);
    expect((await request(app).delete(`/api/comments/${created.id}`).set(auth(admin))).status).toBe(200);
    expect((await request(app).delete(`/api/comments/${created.id}`).set(auth(admin))).status).toBe(404);
  });
});
