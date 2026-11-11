const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { useLimiter } = require('../middleware/rateLimit');
const { asyncHandler, HttpError } = require('../utils/errors');
const {
  requireEmail,
  optionalString,
  oneOf,
  parseId,
  parsePagination,
  buildPagination,
  optionalQueryString
} = require('../utils/validation');

const TOKEN_RE = /^[a-f0-9]{48}$/;

// POST /api/newsletter/subscribe - Subscribe (or re-subscribe) an email
router.post('/subscribe', useLimiter('publicForms'), asyncHandler(async (req, res) => {
  const email = requireEmail(req.body.email);
  const name = optionalString(req.body.name, 'Name', { max: 100 });

  const { rows } = await pool.query(
    `INSERT INTO newsletter_subscribers (email, name, unsubscribe_token)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE
       SET status = 'subscribed', name = COALESCE(EXCLUDED.name, newsletter_subscribers.name),
           updated_at = CURRENT_TIMESTAMP
       WHERE newsletter_subscribers.status = 'unsubscribed'
     RETURNING id`,
    [email, name, crypto.randomBytes(24).toString('hex')]
  );

  if (rows.length === 0) {
    return res.json({ success: true, message: 'You are already subscribed' });
  }
  res.status(201).json({ success: true, message: 'Subscribed successfully' });
}));

// POST /api/newsletter/unsubscribe - Unsubscribe using the token from an email link
router.post('/unsubscribe', asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (typeof token !== 'string' || !TOKEN_RE.test(token)) {
    throw new HttpError(400, 'Invalid unsubscribe token');
  }
  const { rows } = await pool.query(
    `UPDATE newsletter_subscribers SET status = 'unsubscribed', updated_at = CURRENT_TIMESTAMP
     WHERE unsubscribe_token = $1 RETURNING id`,
    [token]
  );
  if (!rows[0]) throw new HttpError(404, 'Subscription not found');
  res.json({ success: true, message: 'You have been unsubscribed' });
}));

// GET /api/newsletter/subscribers?status= - Admin list
router.get('/subscribers', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query, { defaultLimit: 50, maxLimit: 200 });
  const status = optionalQueryString(req.query.status);
  const values = status ? [oneOf(status, ['subscribed', 'unsubscribed'], 'Status')] : [];
  const where = status ? 'WHERE status = $1' : '';

  const [list, count] = await Promise.all([
    pool.query(
      `SELECT * FROM newsletter_subscribers ${where}
       ORDER BY created_at DESC, id DESC
       LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset]
    ),
    pool.query(`SELECT COUNT(*)::int AS count FROM newsletter_subscribers ${where}`, values)
  ]);

  res.json({
    success: true,
    data: { subscribers: list.rows, pagination: buildPagination(page, limit, count.rows[0].count) }
  });
}));

// DELETE /api/newsletter/subscribers/:id - Admin removes a subscriber entirely
router.delete('/subscribers/:id', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    'DELETE FROM newsletter_subscribers WHERE id = $1 RETURNING id, email',
    [parseId(req.params.id)]
  );
  if (!rows[0]) throw new HttpError(404, 'Subscriber not found');
  res.json({ success: true, data: rows[0], message: 'Subscriber deleted successfully' });
}));

module.exports = router;
