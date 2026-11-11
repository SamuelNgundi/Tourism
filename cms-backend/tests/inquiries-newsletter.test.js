const { app, request, pool, resetDb, createUser, auth } = require('./helpers');

let admin;
const booking = {
  type: 'tour_booking',
  name: 'Otieno',
  email: 'otieno@example.com',
  phone: '+254 712 345 678',
  subject: 'Maasai Mara trip',
  message: 'We are a group of 6.',
  details: { group_size: 6, date: '2026-12-20' }
};

beforeEach(async () => {
  await resetDb();
  admin = await createUser({ role: 'admin' });
});
afterAll(() => pool.end());

describe('inquiries', () => {
  test('public can submit a tour booking; type defaults to contact', async () => {
    const res = await request(app).post('/api/inquiries').send(booking);
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ type: 'tour_booking', status: 'new' });

    const contact = await request(app).post('/api/inquiries').send({ name: 'A', email: 'a@example.com', message: 'Hi' });
    expect(contact.body.data.type).toBe('contact');
  });

  test.each([
    [{ ...booking, type: 'spam' }],
    [{ ...booking, email: 'nope' }],
    [{ ...booking, message: '' }],
    [{ ...booking, phone: 'call me' }],
    [{ ...booking, details: 'text' }]
  ])('validates submissions %#', async (body) => {
    expect((await request(app).post('/api/inquiries').send(body)).status).toBe(400);
  });

  test('admin inbox lists, filters, searches and shows details', async () => {
    await request(app).post('/api/inquiries').send(booking);
    await request(app).post('/api/inquiries').send({ type: 'club_registration', name: 'Kamau', email: 'k@example.com', message: 'Club' });

    const all = await request(app).get('/api/inquiries').set(auth(admin));
    expect(all.body.data.inquiries).toHaveLength(2);
    const clubs = await request(app).get('/api/inquiries?type=club_registration').set(auth(admin));
    expect(clubs.body.data.inquiries.map((i) => i.name)).toEqual(['Kamau']);
    const search = await request(app).get('/api/inquiries?search=mara').set(auth(admin));
    expect(search.body.data.inquiries.map((i) => i.name)).toEqual(['Otieno']);

    const one = await request(app).get(`/api/inquiries/${search.body.data.inquiries[0].id}`).set(auth(admin));
    expect(one.body.data.details).toEqual({ group_size: 6, date: '2026-12-20' });
  });

  test('admin updates status and notes, then deletes', async () => {
    const { id } = (await request(app).post('/api/inquiries').send(booking)).body.data;
    const res = await request(app).patch(`/api/inquiries/${id}`).set(auth(admin))
      .send({ status: 'in_progress', admin_notes: 'Called back' });
    expect(res.body.data).toMatchObject({ status: 'in_progress', admin_notes: 'Called back' });
    expect((await request(app).patch(`/api/inquiries/${id}`).set(auth(admin)).send({ status: 'done' })).status).toBe(400);
    expect((await request(app).patch(`/api/inquiries/${id}`).set(auth(admin)).send({})).status).toBe(400);
    expect((await request(app).delete(`/api/inquiries/${id}`).set(auth(admin))).status).toBe(200);
    expect((await request(app).get(`/api/inquiries/${id}`).set(auth(admin))).status).toBe(404);
  });

  test('inbox is admin only', async () => {
    const author = await createUser();
    expect((await request(app).get('/api/inquiries')).status).toBe(401);
    expect((await request(app).get('/api/inquiries').set(auth(author))).status).toBe(403);
  });
});

describe('newsletter', () => {
  test('subscribing twice is idempotent', async () => {
    const first = await request(app).post('/api/newsletter/subscribe').send({ email: 'Fan@Example.com', name: 'Fan' });
    const second = await request(app).post('/api/newsletter/subscribe').send({ email: 'fan@example.com' });
    expect(first.status).toBe(201);
    expect(second.status).toBe(200);
    const { rows } = await pool.query('SELECT * FROM newsletter_subscribers');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ email: 'fan@example.com', status: 'subscribed', name: 'Fan' });
  });

  test('rejects invalid emails', async () => {
    expect((await request(app).post('/api/newsletter/subscribe').send({ email: 'x' })).status).toBe(400);
  });

  test('unsubscribe by token, then re-subscribe', async () => {
    await request(app).post('/api/newsletter/subscribe').send({ email: 'fan@example.com' });
    const { rows } = await pool.query('SELECT unsubscribe_token FROM newsletter_subscribers');
    const res = await request(app).post('/api/newsletter/unsubscribe').send({ token: rows[0].unsubscribe_token });
    expect(res.status).toBe(200);
    expect((await pool.query('SELECT status FROM newsletter_subscribers')).rows[0].status).toBe('unsubscribed');

    expect((await request(app).post('/api/newsletter/subscribe').send({ email: 'fan@example.com' })).status).toBe(201);
    expect((await pool.query('SELECT status FROM newsletter_subscribers')).rows[0].status).toBe('subscribed');
  });

  test('invalid or unknown tokens are rejected', async () => {
    expect((await request(app).post('/api/newsletter/unsubscribe').send({ token: 'abc' })).status).toBe(400);
    expect((await request(app).post('/api/newsletter/unsubscribe').send({ token: 'a'.repeat(48) })).status).toBe(404);
  });

  test('admin lists, filters and deletes subscribers', async () => {
    await request(app).post('/api/newsletter/subscribe').send({ email: 'a@example.com' });
    await request(app).post('/api/newsletter/subscribe').send({ email: 'b@example.com' });
    const author = await createUser();
    expect((await request(app).get('/api/newsletter/subscribers').set(auth(author))).status).toBe(403);

    const list = await request(app).get('/api/newsletter/subscribers?status=subscribed').set(auth(admin));
    expect(list.body.data.subscribers).toHaveLength(2);
    expect(list.body.data.pagination.totalItems).toBe(2);

    const id = list.body.data.subscribers[0].id;
    expect((await request(app).delete(`/api/newsletter/subscribers/${id}`).set(auth(admin))).status).toBe(200);
    expect((await request(app).delete(`/api/newsletter/subscribers/${id}`).set(auth(admin))).status).toBe(404);
  });
});
