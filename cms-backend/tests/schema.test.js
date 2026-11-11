const fs = require('fs');
const path = require('path');
const { app, request, pool, resetDb } = require('./helpers');

const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8');
const MALFORMED_HASH = '$2b$10YxJgT9Z8vN3mK4pL6qR7sW8xA9bC0dE1fG2hH3iJ4kK5lL6mM7nN8oO9pP';

beforeEach(resetDb);
afterAll(() => pool.end());

describe('db/schema.sql', () => {
  test('can be re-run on an existing database without losing data', async () => {
    await pool.query("INSERT INTO posts (title, slug, body, status) VALUES ('Keep', 'keep', 'b', 'published')");
    await pool.query(schema);
    await pool.query(schema);
    const { rows } = await pool.query('SELECT title, view_count FROM posts');
    expect(rows).toEqual([{ title: 'Keep', view_count: 0 }]);
  });

  test('seeds a working admin login (admin123)', async () => {
    await pool.query(schema);
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@tembeakenya.com', password: 'admin123' });
    expect(res.status).toBe(200);
  });

  test('repairs the malformed admin hash from older versions', async () => {
    await pool.query(
      "INSERT INTO users (email, hashed_password, role) VALUES ('admin@tembeakenya.com', $1, 'admin')",
      [MALFORMED_HASH]
    );
    await pool.query(schema);
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@tembeakenya.com', password: 'admin123' });
    expect(res.status).toBe(200);
  });
});
