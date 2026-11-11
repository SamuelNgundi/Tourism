const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const pool = require('../db');
const { authMiddleware } = require('../middleware/auth');
const { asyncHandler, HttpError } = require('../utils/errors');
const { parseId, parsePagination, buildPagination } = require('../utils/validation');

const ALLOWED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const subdirFor = (mimetype) => (mimetype.startsWith('image/') ? 'images' : 'documents');

const publicUrl = (relativeUrl) =>
  `${process.env.BASE_URL || `http://localhost:${process.env.PORT || 3001}`}${relativeUrl}`;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dest = path.join(config.uploadsDir, subdirFor(file.mimetype));
      fs.mkdir(dest, { recursive: true }, (err) => cb(err, dest));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname).toLowerCase();
      const name = path.basename(file.originalname, path.extname(file.originalname))
        .replace(/[^\w.-]+/g, '_')
        .slice(0, 100);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIMES.includes(file.mimetype)) return cb(null, true);
    cb(new HttpError(400, `Invalid file type: ${file.mimetype}. Allowed types: ${ALLOWED_MIMES.join(', ')}`));
  }
});

// POST /api/media/upload - Upload a file
router.post('/upload', authMiddleware, upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) throw new HttpError(400, 'No file uploaded');

  const fileUrl = `/uploads/${subdirFor(req.file.mimetype)}/${req.file.filename}`;
  const { rows } = await pool.query(
    `INSERT INTO media (filename, original_name, mimetype, size, url, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, fileUrl, req.user.id]
  );

  res.status(201).json({
    success: true,
    data: { ...rows[0], url: publicUrl(fileUrl) },
    message: 'File uploaded successfully'
  });
}));

// GET /api/media?page=&limit= - List media files
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query, { defaultLimit: 50, maxLimit: 100 });
  const [list, count] = await Promise.all([
    pool.query('SELECT * FROM media ORDER BY created_at DESC, id DESC LIMIT $1 OFFSET $2', [limit, offset]),
    pool.query('SELECT COUNT(*)::int AS count FROM media')
  ]);
  res.json({ success: true, data: list.rows, pagination: buildPagination(page, limit, count.rows[0].count) });
}));

// DELETE /api/media/:id - Delete a media file (admins, or the user who uploaded it)
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  const { rows } = await pool.query('SELECT * FROM media WHERE id = $1', [id]);
  const mediaFile = rows[0];
  if (!mediaFile) throw new HttpError(404, 'Media file not found');

  if (req.user.role !== 'admin' && mediaFile.uploaded_by !== req.user.id) {
    throw new HttpError(403, 'You can only delete files you uploaded');
  }

  const deleted = await pool.query('DELETE FROM media WHERE id = $1 RETURNING *', [id]);

  const filePath = path.join(config.uploadsDir, subdirFor(mediaFile.mimetype), path.basename(mediaFile.filename));
  fs.promises.unlink(filePath).catch((error) => {
    if (error.code !== 'ENOENT') console.warn('Could not delete physical file:', error.message);
  });

  res.json({ success: true, data: deleted.rows[0], message: 'Media file deleted successfully' });
}));

module.exports = router;
