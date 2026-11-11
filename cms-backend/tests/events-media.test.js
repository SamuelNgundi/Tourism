const fs = require('fs');
const path = require('path');
const config = require('../config');
const { app, request, pool, resetDb, createUser, auth } = require('./helpers');

let admin;
let author;
const daysFromNow = (n) => new Date(Date.now() + n * 86400000).toISOString();
const PNG = Buffer.from('89504e470d0a1a0a0000000d4948445200000001000000010806000000', 'hex');

const createEvent = (body) => request(app).post('/api/events').set(auth(admin)).send(body);

beforeEach(async () => {
  await resetDb();
  admin = await createUser({ role: 'admin' });
  author = await createUser();
});
afterAll(() => pool.end());

describe('events', () => {
  test('admin creates events (draft by default) with unique slugs', async () => {
    const first = await createEvent({ title: 'Tembea Lamu', start_date: daysFromNow(10), location: 'Lamu' });
    const second = await createEvent({ title: 'Tembea Lamu', start_date: daysFromNow(20) });
    expect(first.status).toBe(201);
    expect(first.body.data).toMatchObject({ slug: 'tembea-lamu', status: 'draft', created_by: admin.id });
    expect(second.body.data.slug).toBe('tembea-lamu-1');
  });

  test.each([
    [{ start_date: daysFromNow(1) }],
    [{ title: 'No date' }],
    [{ title: 'Bad date', start_date: 'someday' }],
    [{ title: 'Backwards', start_date: daysFromNow(5), end_date: daysFromNow(1) }],
    [{ title: 'Bad link', start_date: daysFromNow(1), registration_url: '/relative' }],
    [{ title: 'Bad status', start_date: daysFromNow(1), status: 'soon' }]
  ])('validates input %#', async (body) => {
    expect((await createEvent(body)).status).toBe(400);
  });

  test('authors cannot manage events', async () => {
    const res = await request(app).post('/api/events').set(auth(author)).send({ title: 'X', start_date: daysFromNow(1) });
    expect(res.status).toBe(403);
  });

  test('public sees published events only, filtered by upcoming/past', async () => {
    await createEvent({ title: 'Future', start_date: daysFromNow(5), status: 'published' });
    await createEvent({ title: 'Past', start_date: daysFromNow(-5), status: 'published' });
    await createEvent({ title: 'Hidden', start_date: daysFromNow(5) });

    const names = async (q) => (await request(app).get(`/api/events${q}`)).body.data.events.map((e) => e.title);
    expect(await names('')).toEqual(['Past', 'Future']);
    expect(await names('?when=upcoming')).toEqual(['Future']);
    expect(await names('?when=past')).toEqual(['Past']);
    expect((await request(app).get('/api/events?when=tomorrow')).status).toBe(400);

    expect((await request(app).get('/api/events/future')).status).toBe(200);
    expect((await request(app).get('/api/events/hidden')).status).toBe(404);
  });

  test('admin lists all events including drafts', async () => {
    await createEvent({ title: 'Draft', start_date: daysFromNow(5) });
    const res = await request(app).get('/api/events/admin/all?status=draft').set(auth(admin));
    expect(res.body.data.events.map((e) => e.title)).toEqual(['Draft']);
  });

  test('partial updates, slug changes with title, end date checked against stored start', async () => {
    const { id } = (await createEvent({ title: 'Old', start_date: daysFromNow(10) })).body.data;
    const res = await request(app).put(`/api/events/${id}`).set(auth(admin)).send({ title: 'New Name', status: 'published' });
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({ title: 'New Name', slug: 'new-name', status: 'published' });

    const bad = await request(app).put(`/api/events/${id}`).set(auth(admin)).send({ end_date: daysFromNow(1) });
    expect(bad.status).toBe(400);
    expect((await request(app).put('/api/events/999').set(auth(admin)).send({ title: 'x' })).status).toBe(404);
  });

  test('admin deletes events', async () => {
    const { id } = (await createEvent({ title: 'Bye', start_date: daysFromNow(1) })).body.data;
    expect((await request(app).delete(`/api/events/${id}`).set(auth(admin))).status).toBe(200);
    expect((await request(app).delete(`/api/events/${id}`).set(auth(admin))).status).toBe(404);
  });
});

describe('media', () => {
  const upload = (user, buffer = PNG, filename = 'pic.png', contentType = 'image/png') =>
    request(app).post('/api/media/upload').set(auth(user)).attach('file', buffer, { filename, contentType });

  test('uploads an image to the configured directory', async () => {
    const res = await upload(author);
    expect(res.status).toBe(201);
    expect(res.body.data.url).toMatch(/\/uploads\/images\/pic-.*\.png$/);
    expect(fs.existsSync(path.join(config.uploadsDir, 'images', res.body.data.filename))).toBe(true);
  });

  test('rejects disallowed file types and missing files', async () => {
    expect((await upload(author, Buffer.from('x'), 'x.exe', 'application/x-msdownload')).status).toBe(400);
    expect((await request(app).post('/api/media/upload').set(auth(author))).status).toBe(400);
  });

  test('lists media with pagination', async () => {
    await upload(author);
    const res = await request(app).get('/api/media').set(auth(author));
    expect(res.body.data).toHaveLength(1);
    expect(res.body.pagination.totalItems).toBe(1);
  });

  test("authors cannot delete others' files; uploader and admin can", async () => {
    const other = await createUser();
    const mine = (await upload(author)).body.data;
    expect((await request(app).delete(`/api/media/${mine.id}`).set(auth(other))).status).toBe(403);
    expect((await request(app).delete(`/api/media/${mine.id}`).set(auth(author))).status).toBe(200);

    const theirs = (await upload(other)).body.data;
    expect((await request(app).delete(`/api/media/${theirs.id}`).set(auth(admin))).status).toBe(200);
    expect((await request(app).delete(`/api/media/${theirs.id}`).set(auth(admin))).status).toBe(404);
  });
});
