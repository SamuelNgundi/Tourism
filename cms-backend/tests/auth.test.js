const { createApp } = require('../app');
const { app, request, pool, resetDb, createUser, auth } = require('./helpers');

beforeEach(resetDb);
afterAll(() => pool.end());

describe('POST /api/auth/login', () => {
  test('logs in with valid credentials (email is case-insensitive)', async () => {
    await createUser({ email: 'writer@example.com' });
    const res = await request(app).post('/api/auth/login').send({ email: 'Writer@Example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.user).toMatchObject({ email: 'writer@example.com', role: 'author' });
  });

  test('rejects a wrong password with 401', async () => {
    await createUser({ email: 'writer@example.com' });
    const res = await request(app).post('/api/auth/login').send({ email: 'writer@example.com', password: 'nope' });
    expect(res.status).toBe(401);
  });

  test('requires email and password', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.com' });
    expect(res.status).toBe(400);
  });

  test('is rate limited', async () => {
    const limitedApp = createApp({ loginRateLimit: 3 });
    for (let i = 0; i < 3; i++) {
      await request(limitedApp).post('/api/auth/login').send({ email: 'x@example.com', password: 'wrong' });
    }
    const res = await request(limitedApp).post('/api/auth/login').send({ email: 'x@example.com', password: 'wrong' });
    expect(res.status).toBe(429);
  });
});

describe('POST /api/auth/register', () => {
  test('admin can register a user', async () => {
    const admin = await createUser({ role: 'admin' });
    const res = await request(app).post('/api/auth/register').set(auth(admin))
      .send({ email: 'New@Example.com', password: 'longpassword' });
    expect(res.status).toBe(201);
    expect(res.body.data.user).toMatchObject({ email: 'new@example.com', role: 'author' });
  });

  test('authors cannot register users', async () => {
    const author = await createUser();
    const res = await request(app).post('/api/auth/register').set(auth(author))
      .send({ email: 'x@example.com', password: 'longpassword' });
    expect(res.status).toBe(403);
  });

  test.each([
    [{ email: 'bad', password: 'longpassword' }],
    [{ email: 'ok@example.com', password: 'short' }],
    [{ email: 'ok@example.com', password: 'longpassword', role: 'superuser' }]
  ])('validates input %#', async (body) => {
    const admin = await createUser({ role: 'admin' });
    const res = await request(app).post('/api/auth/register').set(auth(admin)).send(body);
    expect(res.status).toBe(400);
  });

  test('rejects duplicate emails with 409', async () => {
    const admin = await createUser({ role: 'admin', email: 'admin@example.com' });
    const res = await request(app).post('/api/auth/register').set(auth(admin))
      .send({ email: 'ADMIN@example.com', password: 'longpassword' });
    expect(res.status).toBe(409);
  });
});

describe('auth middleware', () => {
  test('rejects missing and invalid tokens', async () => {
    expect((await request(app).get('/api/auth/profile')).status).toBe(401);
    expect((await request(app).get('/api/auth/profile').set('Authorization', 'Bearer junk')).status).toBe(401);
  });

  test('rejects tokens of deleted users', async () => {
    const user = await createUser();
    await pool.query('DELETE FROM users WHERE id = $1', [user.id]);
    const res = await request(app).get('/api/auth/profile').set(auth(user));
    expect(res.status).toBe(401);
  });
});

describe('PUT /api/auth/password', () => {
  test('changes the password, revokes old tokens and returns a new one', async () => {
    const user = await createUser({ email: 'me@example.com' });
    const res = await request(app).put('/api/auth/password').set(auth(user))
      .send({ current_password: 'password123', new_password: 'newpassword456' });
    expect(res.status).toBe(200);

    expect((await request(app).get('/api/auth/profile').set(auth(user))).status).toBe(401);
    const fresh = await request(app).get('/api/auth/profile').set('Authorization', `Bearer ${res.body.data.token}`);
    expect(fresh.status).toBe(200);

    const login = await request(app).post('/api/auth/login').send({ email: 'me@example.com', password: 'newpassword456' });
    expect(login.status).toBe(200);
  });

  test('requires the correct current password', async () => {
    const user = await createUser();
    const res = await request(app).put('/api/auth/password').set(auth(user))
      .send({ current_password: 'wrong', new_password: 'newpassword456' });
    expect(res.status).toBe(400);
  });

  test('rejects short or unchanged passwords', async () => {
    const user = await createUser();
    const short = await request(app).put('/api/auth/password').set(auth(user))
      .send({ current_password: 'password123', new_password: 'short' });
    const same = await request(app).put('/api/auth/password').set(auth(user))
      .send({ current_password: 'password123', new_password: 'password123' });
    expect(short.status).toBe(400);
    expect(same.status).toBe(400);
  });
});
