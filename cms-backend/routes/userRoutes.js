const express = require('express');
const router = express.Router();
const pool = require('../db');
const { ROLES } = require('../services/authService');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { asyncHandler, HttpError } = require('../utils/errors');
const { parseId, oneOf } = require('../utils/validation');

router.use(authMiddleware, authorizeRole('admin'));

const USER_FIELDS = `
  u.id, u.email, u.role, u.created_at, u.updated_at,
  (SELECT COUNT(*)::int FROM posts p WHERE p.author_id = u.id) AS post_count`;

// GET /api/users - List users (admin only)
router.get('/', asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${USER_FIELDS} FROM users u ORDER BY u.created_at DESC`);
  res.json({ success: true, data: rows });
}));

// GET /api/users/:id - Get user by ID (admin only)
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const { rows } = await pool.query(`SELECT ${USER_FIELDS} FROM users u WHERE u.id = $1`, [id]);
  if (!rows[0]) throw new HttpError(404, 'User not found');
  res.json({ success: true, data: rows[0] });
}));

// PATCH /api/users/:id - Change a user's role (admin only)
router.patch('/:id', asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const role = oneOf(req.body.role, ROLES, 'Role');

  if (id === req.user.id) {
    throw new HttpError(400, 'You cannot change your own role');
  }

  const { rows } = await pool.query(
    `UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING id, email, role, created_at, updated_at`,
    [role, id]
  );
  if (!rows[0]) throw new HttpError(404, 'User not found');
  res.json({ success: true, data: rows[0], message: 'User updated successfully' });
}));

// DELETE /api/users/:id - Delete a user (admin only). Their posts are kept without an author.
router.delete('/:id', asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === req.user.id) {
    throw new HttpError(400, 'You cannot delete your own account');
  }

  const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id, email, role', [id]);
  if (!rows[0]) throw new HttpError(404, 'User not found');
  res.json({ success: true, data: rows[0], message: 'User deleted successfully' });
}));

module.exports = router;
