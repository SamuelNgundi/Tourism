const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authMiddleware, authorizeRole } = require('../middleware/auth');

/**
 * GET /api/users - Get all users (Admin only)
 */
router.get('/', authMiddleware, authorizeRole('admin'), async (req, res) => {
  try {
    const query = `
      SELECT id, email, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch users'
    });
  }
});

/**
 * GET /api/users/:id - Get user by ID (Admin only)
 */
router.get('/:id', authMiddleware, authorizeRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT id, email, role, created_at
      FROM users
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch user'
    });
  }
});

module.exports = router;
