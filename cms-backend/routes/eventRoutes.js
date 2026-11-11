const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { asyncHandler, HttpError } = require('../utils/errors');
const { uniqueSlug } = require('../utils/slug');
const {
  requireString,
  optionalString,
  optionalUrl,
  oneOf,
  parseId,
  parseDate,
  parsePagination,
  buildPagination,
  optionalQueryString,
  slugify
} = require('../utils/validation');

const EVENT_STATUSES = ['draft', 'published', 'cancelled'];

/**
 * Validates event input. In partial mode only provided fields are checked;
 * `existing` supplies current dates so end_date >= start_date always holds.
 */
const parseEventInput = (body, { partial = false, existing = {} } = {}) => {
  const fields = {};
  const has = (key) => !partial || body[key] !== undefined;

  if (has('title')) fields.title = requireString(body.title, 'Title', { max: 255 });
  if (body.description !== undefined) fields.description = optionalString(body.description, 'Description', { max: 10000 });
  if (body.location !== undefined) fields.location = optionalString(body.location, 'Location', { max: 255 });
  if (has('start_date')) fields.start_date = parseDate(body.start_date, 'Start date');
  if (body.end_date !== undefined) {
    fields.end_date = body.end_date === null || body.end_date === '' ? null : parseDate(body.end_date, 'End date');
  }
  if (body.image_url !== undefined) fields.image_url = optionalUrl(body.image_url, 'Image URL');
  if (body.registration_url !== undefined) {
    fields.registration_url = optionalUrl(body.registration_url, 'Registration URL', { allowRelative: false });
  }
  if (body.status !== undefined) fields.status = oneOf(body.status, EVENT_STATUSES, 'Status');

  const start = fields.start_date || existing.start_date;
  const end = fields.end_date !== undefined ? fields.end_date : existing.end_date;
  if (start && end && new Date(end) < new Date(start)) {
    throw new HttpError(400, 'End date cannot be before start date');
  }
  return fields;
};

const listEvents = async ({ where, values, order }, { page, limit, offset }) => {
  const [list, count] = await Promise.all([
    pool.query(
      `SELECT * FROM events ${where} ORDER BY ${order}
       LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset]
    ),
    pool.query(`SELECT COUNT(*)::int AS count FROM events ${where}`, values)
  ]);
  return {
    success: true,
    data: { events: list.rows, pagination: buildPagination(page, limit, count.rows[0].count) }
  };
};

// GET /api/events?when=upcoming|past|all - Published events
router.get('/', asyncHandler(async (req, res) => {
  const when = optionalQueryString(req.query.when) || 'all';
  oneOf(when, ['upcoming', 'past', 'all'], 'when');

  const filters = {
    upcoming: ["AND COALESCE(end_date, start_date) >= NOW()", 'start_date ASC, id ASC'],
    past: ['AND COALESCE(end_date, start_date) < NOW()', 'start_date DESC, id DESC'],
    all: ['', 'start_date ASC, id ASC']
  };
  const [extra, order] = filters[when];

  res.json(await listEvents(
    { where: `WHERE status = 'published' ${extra}`, values: [], order },
    parsePagination(req.query, { defaultLimit: 20 })
  ));
}));

// GET /api/events/admin/all?status= - All events (admin only)
router.get('/admin/all', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const status = optionalQueryString(req.query.status);
  const values = status ? [oneOf(status, EVENT_STATUSES, 'Status')] : [];
  res.json(await listEvents(
    { where: status ? 'WHERE status = $1' : '', values, order: 'start_date DESC, id DESC' },
    parsePagination(req.query, { defaultLimit: 20 })
  ));
}));

// GET /api/events/:slug - Single published event
router.get('/:slug', asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM events WHERE slug = $1 AND status = 'published'",
    [req.params.slug]
  );
  if (!rows[0]) throw new HttpError(404, 'Event not found');
  res.json({ success: true, data: rows[0] });
}));

// POST /api/events - Create event (admin only)
router.post('/', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const fields = parseEventInput(req.body);
  const slug = await uniqueSlug('events', slugify(fields.title), { fallback: 'event' });

  const { rows } = await pool.query(
    `INSERT INTO events (title, slug, description, location, start_date, end_date, image_url, registration_url, status, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      fields.title, slug, fields.description || null, fields.location || null, fields.start_date,
      fields.end_date || null, fields.image_url || null, fields.registration_url || null,
      fields.status || 'draft', req.user.id
    ]
  );
  res.status(201).json({ success: true, data: rows[0], message: 'Event created successfully' });
}));

// PUT /api/events/:id - Update event (admin only, partial updates allowed)
router.put('/:id', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const current = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  if (!current.rows[0]) throw new HttpError(404, 'Event not found');
  const existing = current.rows[0];

  const fields = parseEventInput(req.body, { partial: true, existing });
  if (fields.title !== undefined && fields.title !== existing.title) {
    fields.slug = await uniqueSlug('events', slugify(fields.title), { excludeId: id, fallback: 'event' });
  }

  const columns = Object.keys(fields);
  if (columns.length === 0) return res.json({ success: true, data: existing, message: 'Nothing to update' });

  const sets = columns.map((column, i) => `${column} = $${i + 1}`);
  const { rows } = await pool.query(
    `UPDATE events SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${columns.length + 1} RETURNING *`,
    [...columns.map((column) => fields[column]), id]
  );
  res.json({ success: true, data: rows[0], message: 'Event updated successfully' });
}));

// DELETE /api/events/:id - Delete event (admin only)
router.delete('/:id', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const { rows } = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [parseId(req.params.id)]);
  if (!rows[0]) throw new HttpError(404, 'Event not found');
  res.json({ success: true, data: rows[0], message: 'Event deleted successfully' });
}));

module.exports = router;
