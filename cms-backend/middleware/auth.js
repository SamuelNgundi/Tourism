const jwt = require('jsonwebtoken');
const pool = require('../db');

const unauthorized = (res, error) => res.status(401).json({ success: false, error });

/**
 * JWT Authentication Middleware
 * Verifies the Bearer token and loads the current user from the database, so
 * deleted users, role changes and password changes take effect immediately.
 */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unauthorized(res, 'Access denied. No token provided.');
  }

  let decoded;
  try {
    decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
  } catch (error) {
    return unauthorized(res, error.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid token.');
  }

  try {
    const { rows } = await pool.query(
      'SELECT id, email, role, token_version FROM users WHERE id = $1',
      [decoded.id]
    );
    const user = rows[0];

    if (!user || (decoded.tv || 0) !== user.token_version) {
      return unauthorized(res, 'Invalid token.');
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-based authorization middleware
 * @param {Array<string>} allowedRoles - Array of roles allowed to access the route
 */
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return unauthorized(res, 'Unauthorized');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden. Insufficient permissions.'
      });
    }

    next();
  };
};

module.exports = { authMiddleware, authorizeRole };
