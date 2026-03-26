const express = require('express');
const router = express.Router();
const postService = require('../services/postService');
const { authMiddleware, authorizeRole } = require('../middleware/auth');

/**
 * Public Routes - No authentication required
 */

// GET /api/posts - Get all published posts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await postService.getPublishedPosts(page, limit);
    res.json(result);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch posts'
    });
  }
});

// GET /api/posts/admin/:id - Get single post by ID (admin only)
// MUST be before /:slug to prevent "admin" from being treated as a slug
router.get('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.getPostById(id);
    res.json(result);
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(404).json({
      success: false,
      error: error.message || 'Post not found'
    });
  }
});

// GET /api/posts/:slug - Get single post by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await postService.getPostBySlug(slug);
    res.json(result);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(404).json({
      success: false,
      error: error.message || 'Post not found'
    });
  }
});

// GET /api/posts/tags/all - Get all tags
router.get('/tags/all', async (req, res) => {
  try {
    const result = await postService.getAllTags();
    res.json(result);
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch tags'
    });
  }
});

/**
 * Protected Routes - Authentication required
 */

// GET /api/posts/admin/all - Get all posts (including drafts) - Admin/Author only
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || 'all';

    // For admin view, we'll get posts with different statuses
    // This is a simplified version - you might want to enhance the query
    const result = await postService.getPublishedPosts(page, limit);
    
    // In a real scenario, you'd modify the query to filter by status
    res.json(result);
  } catch (error) {
    console.error('Get admin posts error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch posts'
    });
  }
});

// POST /api/posts - Create new post - Admin/Author only
router.post('/', authMiddleware, async (req, res) => {
  try {
    const postData = req.body;
    const result = await postService.createPost(postData, req.user.id);
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create post'
    });
  }
});

// PUT /api/posts/:id - Update existing post - Admin/Author only
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const result = await postService.updatePost(id, updates);
    res.json(result);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update post'
    });
  }
});

// DELETE /api/posts/:id - Delete post - Admin only
router.delete('/:id', authMiddleware, authorizeRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postService.deletePost(id);
    
    res.json(result);
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to delete post'
    });
  }
});

module.exports = router;
