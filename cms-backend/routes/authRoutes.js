const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { authMiddleware, authorizeRole } = require('../middleware/auth');
const { useLimiter } = require('../middleware/rateLimit');
const { asyncHandler } = require('../utils/errors');

// POST /api/auth/login - User login (rate limited)
router.post('/login', useLimiter('login'), asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.json(await authService.login(email, password));
}));

// POST /api/auth/register - Register new user (admin only)
router.post('/register', authMiddleware, authorizeRole('admin'), asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  res.status(201).json(await authService.register(email, password, role || 'author'));
}));

// GET /api/auth/profile - Get current user profile
router.get('/profile', authMiddleware, asyncHandler(async (req, res) => {
  res.json(await authService.getProfile(req.user.id));
}));

// PUT /api/auth/password - Change own password
router.put('/password', authMiddleware, asyncHandler(async (req, res) => {
  const { current_password, new_password } = req.body;
  res.json(await authService.changePassword(req.user.id, current_password, new_password));
}));

module.exports = router;
