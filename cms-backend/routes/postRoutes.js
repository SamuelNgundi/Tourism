const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const commentService = require('../services/commentService');
const { listTags } = require('./tagRoutes');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { useLimiter } = require('../middleware/rateLimit');
const { asyncHandler } = require('../utils/errors');
const { parsePagination, parseId, optionalQueryString } = require('../utils/validation');

const listFilters = (query) => ({
  search: optionalQueryString(query.search),
  tag: optionalQueryString(query.tag)
});

/**
 * Public Routes - No authentication required
 */

// GET /api/posts?page=&limit=&search=&tag= - Published posts
router.get('/', asyncHandler(async (req, res) => {
  res.json(await postService.getPublishedPosts(listFilters(req.query), parsePagination(req.query)));
}));

// GET /api/posts/tags/all - Get all tags (kept for the admin editor)
router.get('/tags/all', listTags);

/**
 * Protected Routes - declared before /:slug so "admin" is never treated as a slug
 */

// GET /api/posts/admin/all?status=&search=&tag=&author_id= - All posts incl. drafts
router.get('/admin/all', authMiddleware, asyncHandler(async (req, res) => {
  const filters = {
    ...listFilters(req.query),
    status: optionalQueryString(req.query.status),
    authorId: req.query.author_id ? parseId(req.query.author_id, 'author_id') : undefined
  };
  res.json(await postService.getPostsForUser(req.user, filters, parsePagination(req.query)));
}));

// GET /api/posts/admin/:id - Get single post by ID for editing
router.get('/admin/:id', authMiddleware, asyncHandler(async (req, res) => {
  res.json(await postService.getPostForEditing(req.params.id, req.user));
}));

// GET /api/posts/:slug - Get a published post by slug (counts a view)
router.get('/:slug', asyncHandler(async (req, res) => {
  res.json(await postService.getPublishedPostBySlug(req.params.slug));
}));

// GET /api/posts/:slug/comments - Approved comments for a post
router.get('/:slug/comments', asyncHandler(async (req, res) => {
  res.json(await commentService.listApprovedForPost(req.params.slug));
}));

// POST /api/posts/:slug/comments - Submit a comment (held for moderation)
router.post('/:slug/comments', useLimiter('publicForms'), asyncHandler(async (req, res) => {
  res.status(201).json(await commentService.submit(req.params.slug, req.body));
}));

// POST /api/posts - Create new post
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  res.status(201).json(await postService.createPost(req.body, req.user));
}));

// PUT /api/posts/:id - Update a post (authors: own posts only)
router.put('/:id', authMiddleware, asyncHandler(async (req, res) => {
  res.json(await postService.updatePost(req.params.id, req.body, req.user));
}));

// DELETE /api/posts/:id - Delete post - Admin only
router.delete('/:id', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  res.json(await postService.deletePost(req.params.id));
}));

module.exports = router;
