const request = require('supertest');
const pool = require('../db');
const authService = require('../services/authService');
const { createApp } = require('../app');

const app = createApp();
let userCounter = 0;

const resetDb = () =>
  pool.query(`TRUNCATE comments, post_tags, posts, tags, media, inquiries,
    newsletter_subscribers, events, users RESTART IDENTITY CASCADE`);

const createUser = async ({ email, password = 'password123', role = 'author' } = {}) => {
  userCounter += 1;
  const hashed = await authService.hashPassword(password);
  const { rows } = await pool.query(
    'INSERT INTO users (email, hashed_password, role) VALUES ($1, $2, $3) RETURNING *',
    [email || `user${userCounter}@example.com`, hashed, role]
  );
  const user = rows[0];
  return { ...user, password, token: authService.signToken(user) };
};

const createTag = async (name) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const { rows } = await pool.query('INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING *', [name, slug]);
  return rows[0];
};

const createPost = async (user, overrides = {}) => {
  const res = await request(app)
    .post('/api/posts')
    .set('Authorization', `Bearer ${user.token}`)
    .send({ title: 'A Post', body: '<p>Body text</p>', status: 'published', ...overrides });
  if (res.status !== 201) throw new Error(`createPost failed: ${res.status} ${JSON.stringify(res.body)}`);
  return res.body.data;
};

const auth = (user) => ({ Authorization: `Bearer ${user.token}` });

module.exports = { app, request, pool, resetDb, createUser, createTag, createPost, auth };
