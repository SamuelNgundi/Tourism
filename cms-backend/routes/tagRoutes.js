const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { asyncHandler, HttpError } = require('../utils/errors');
const { parseId, requireString, optionalString, slugify } = require('../utils/validation');

const listTags = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`
    SELECT t.*, COUNT(pt.post_id)::int AS post_count
    FROM tags t
    LEFT JOIN post_tags pt ON pt.tag_id = t.id
    GROUP BY t.id
    ORDER BY t.name
  `);
  res.json({ success: true, data: rows });
});

const parseTagInput = (body) => {
  const name = requireString(body.name, 'Name', { max: 100 });
  const slug = slugify(optionalString(body.slug, 'Slug', { max: 100 }) || name).slice(0, 100);
  if (!slug) throw new HttpError(400, 'Tag name must contain letters or numbers');
  return { name, slug };
};

const assertUnique = async ({ name, slug }, excludeId = null) => {
  const { rows } = await pool.query(
    `SELECT id FROM tags
     WHERE (LOWER(name) = LOWER($1) OR slug = $2) AND ($3::int IS NULL OR id <> $3)`,
    [name, slug, excludeId]
  );
  if (rows.length > 0) throw new HttpError(409, 'A tag with this name or slug already exists');
};

// GET /api/tags - All tags with post counts
router.get('/', listTags);

// POST /api/tags - Create tag (admin only)
router.post('/', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const tag = parseTagInput(req.body);
  await assertUnique(tag);
  const { rows } = await pool.query(
    'INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING *',
    [tag.name, tag.slug]
  );
  res.status(201).json({ success: true, data: rows[0], message: 'Tag created successfully' });
}));

// PUT /api/tags/:id - Rename tag (admin only)
router.put('/:id', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const tag = parseTagInput(req.body);
  await assertUnique(tag, id);
  const { rows } = await pool.query(
    'UPDATE tags SET name = $1, slug = $2 WHERE id = $3 RETURNING *',
    [tag.name, tag.slug, id]
  );
  if (!rows[0]) throw new HttpError(404, 'Tag not found');
  res.json({ success: true, data: rows[0], message: 'Tag updated successfully' });
}));

// DELETE /api/tags/:id - Delete tag and detach it from posts (admin only)
router.delete('/:id', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const { rows } = await pool.query('DELETE FROM tags WHERE id = $1 RETURNING *', [id]);
  if (!rows[0]) throw new HttpError(404, 'Tag not found');
  res.json({ success: true, data: rows[0], message: 'Tag deleted successfully' });
}));

module.exports = router;
module.exports.listTags = listTags;
