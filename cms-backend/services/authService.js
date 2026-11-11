const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { HttpError } = require('../utils/errors');
const { requireEmail, oneOf } = require('../utils/validation');

const ROLES = ['admin', 'author'];
const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_ROUNDS = process.env.NODE_ENV === 'test' ? 4 : 10;

const validateNewPassword = (password, field = 'Password') => {
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    throw new HttpError(400, `${field} must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }
  if (password.length > 128) {
    throw new HttpError(400, `${field} must be at most 128 characters`);
  }
};

const toPublicUser = (user) => ({ id: user.id, email: user.email, role: user.role });

/**
 * Authentication Service
 * Handles user authentication, password hashing, and JWT token generation
 */
class AuthService {
  signToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role, tv: user.token_version || 0 },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  async login(email, password) {
    if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
      throw new HttpError(400, 'Email and password are required');
    }

    const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email.trim()]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      throw new HttpError(401, 'Invalid email or password');
    }

    return {
      success: true,
      data: { user: toPublicUser(user), token: this.signToken(user) }
    };
  }

  async register(email, password, role = 'author') {
    const normalizedEmail = requireEmail(email);
    validateNewPassword(password);
    oneOf(role, ROLES, 'Role');

    const existing = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
    if (existing.rows.length > 0) {
      throw new HttpError(409, 'User with this email already exists');
    }

    const hashed_password = await this.hashPassword(password);
    const result = await pool.query(
      `INSERT INTO users (email, hashed_password, role)
       VALUES ($1, $2, $3)
       RETURNING id, email, role, created_at`,
      [normalizedEmail, hashed_password, role]
    );

    return { success: true, data: { user: result.rows[0] } };
  }

  async getProfile(userId) {
    const { rows } = await pool.query(
      'SELECT id, email, role, created_at FROM users WHERE id = $1',
      [userId]
    );
    if (rows.length === 0) {
      throw new HttpError(404, 'User not found');
    }
    return { success: true, data: rows[0] };
  }

  /**
   * Changes the password and invalidates every previously issued token.
   * Returns a fresh token so the current session stays logged in.
   */
  async changePassword(userId, currentPassword, newPassword) {
    if (typeof currentPassword !== 'string' || !currentPassword) {
      throw new HttpError(400, 'Current password is required');
    }
    validateNewPassword(newPassword, 'New password');

    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = rows[0];
    if (!user) {
      throw new HttpError(404, 'User not found');
    }
    if (!(await bcrypt.compare(currentPassword, user.hashed_password))) {
      throw new HttpError(400, 'Current password is incorrect');
    }
    if (currentPassword === newPassword) {
      throw new HttpError(400, 'New password must be different from the current password');
    }

    const hashed = await this.hashPassword(newPassword);
    const updated = await pool.query(
      `UPDATE users
       SET hashed_password = $1, token_version = token_version + 1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id, email, role, token_version`,
      [hashed, userId]
    );

    return {
      success: true,
      message: 'Password changed successfully',
      data: { token: this.signToken(updated.rows[0]) }
    };
  }
}

module.exports = new AuthService();
module.exports.ROLES = ROLES;
