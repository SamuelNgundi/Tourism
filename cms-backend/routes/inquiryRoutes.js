const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { useLimiter } = require('../middleware/rateLimit');
const { asyncHandler, HttpError } = require('../utils/errors');
const {
  requireString,
  optionalString,
  requireEmail,
  oneOf,
  parseId,
  parsePagination,
  buildPagination,
  optionalQueryString
} = require('../utils/validation');

const INQUIRY_TYPES = ['contact', 'tour_booking', 'club_registration', 'membership', 'competition', 'general'];
const INQUIRY_STATUSES = ['new', 'in_progress', 'resolved', 'archived'];
const PHONE_RE = /^[+\d\s()-]{6,30}$/;

const parseDetails = (details) => {
  if (details === undefined || details === null) return {};
  if (typeof details !== 'object' || Array.isArray(details)) {
    throw new HttpError(400, 'Details must be an object');
  }
  if (JSON.stringify(details).length > 5000) {
    throw new HttpError(400, 'Details are too large');
  }
  return details;
};

// POST /api/inquiries - Public form submission (contact, tour booking, club registration, ...)
router.post('/', useLimiter('publicForms'), asyncHandler(async (req, res) => {
  const body = req.body;
  const type = body.type === undefined ? 'contact' : oneOf(body.type, INQUIRY_TYPES, 'Type');
  const name = requireString(body.name, 'Name', { max: 100 });
  const email = requireEmail(body.email);
  const phone = optionalString(body.phone, 'Phone', { max: 30 });
  if (phone && !PHONE_RE.test(phone)) throw new HttpError(400, 'Phone must be a valid phone number');
  const subject = optionalString(body.subject, 'Subject', { max: 200 });
  const message = requireString(body.message, 'Message', { max: 5000 });
  const details = parseDetails(body.details);

  const { rows } = await pool.query(
    `INSERT INTO inquiries (type, name, email, phone, subject, message, details)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, type, status, created_at`,
    [type, name, email, phone, subject, message, details]
  );

  res.status(201).json({
    success: true,
    data: rows[0],
    message: 'Thank you! We have received your message and will get back to you soon.'
  });
}));

router.use(authMiddleware, authorizeRole('admin'));

// GET /api/inquiries?status=&type=&search= - Admin inbox
router.get('/', asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query, { defaultLimit: 20 });
  const conditions = [];
  const values = [];
  const status = optionalQueryString(req.query.status);
  const type = optionalQueryString(req.query.type);
  const search = optionalQueryString(req.query.search);

  if (status) {
    values.push(oneOf(status, INQUIRY_STATUSES, 'Status'));
    conditions.push(`status = $${values.length}`);
  }
  if (type) {
    values.push(oneOf(type, INQUIRY_TYPES, 'Type'));
    conditions.push(`type = $${values.length}`);
  }
  if (search) {
    values.push(`%${search.replace(/[\\%_]/g, '\\$&')}%`);
    conditions.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR subject ILIKE $${values.length})`);
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [list, count] = await Promise.all([
    pool.query(
      `SELECT * FROM inquiries ${where}
       ORDER BY created_at DESC, id DESC
       LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset]
    ),
    pool.query(`SELECT COUNT(*)::int AS count FROM inquiries ${where}`, values)
  ]);

  res.json({
    success: true,
    data: { inquiries: list.rows, pagination: buildPagination(page, limit, count.rows[0].count) }
  });
}));

// GET /api/inquiries/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM inquiries WHERE id = $1', [parseId(req.params.id)]);
  if (!rows[0]) throw new HttpError(404, 'Inquiry not found');
  res.json({ success: true, data: rows[0] });
}));

// PATCH /api/inquiries/:id - Update status and/or admin notes
router.patch('/:id', asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const fields = [];
  const values = [];

  if (req.body.status !== undefined) {
    values.push(oneOf(req.body.status, INQUIRY_STATUSES, 'Status'));
    fields.push(`status = $${values.length}`);
  }
  if (req.body.admin_notes !== undefined) {
    values.push(optionalString(req.body.admin_notes, 'Admin notes', { max: 5000 }));
    fields.push(`admin_notes = $${values.length}`);
  }
  if (fields.length === 0) throw new HttpError(400, 'Nothing to update. Provide status or admin_notes');

  values.push(id);
  const { rows } = await pool.query(
    `UPDATE inquiries SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${values.length} RETURNING *`,
    values
  );
  if (!rows[0]) throw new HttpError(404, 'Inquiry not found');
  res.json({ success: true, data: rows[0], message: 'Inquiry updated successfully' });
}));

// DELETE /api/inquiries/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [parseId(req.params.id)]);
  if (!rows[0]) throw new HttpError(404, 'Inquiry not found');
  res.json({ success: true, data: rows[0], message: 'Inquiry deleted successfully' });
}));

module.exports = router;
