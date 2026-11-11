const express = require('express');
const router = express.Router();
const commentService = require('../services/commentService');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { asyncHandler } = require('../utils/errors');
const { parsePagination, optionalQueryString } = require('../utils/validation');

// Comment moderation (admin only). Public submission lives under /api/posts/:slug/comments.
router.use(authMiddleware, authorizeRole('admin'));

// GET /api/comments?status=&post_id= - List comments for moderation
router.get('/', asyncHandler(async (req, res) => {
  const filters = { status: optionalQueryString(req.query.status), postId: req.query.post_id };
  res.json(await commentService.listForAdmin(filters, parsePagination(req.query, { defaultLimit: 20 })));
}));

// PATCH /api/comments/:id - Approve / reject a comment
router.patch('/:id', asyncHandler(async (req, res) => {
  res.json(await commentService.updateStatus(req.params.id, req.body.status));
}));

// DELETE /api/comments/:id
router.delete('/:id', asyncHandler(async (req, res) => {
  res.json(await commentService.remove(req.params.id));
}));

module.exports = router;
