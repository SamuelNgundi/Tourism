const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

/**
 * Authentication Service
 * Handles user authentication, password hashing, and JWT token generation
 */
class AuthService {
  /**
   * Login user and generate JWT token
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} - User info and token
   */
  async login(email, password) {
    try {
      // Find user by email
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      
      if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
      }

      const user = result.rows[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.hashed_password);
      
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          },
          token
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role (admin|author)
   * @returns {Promise<object>} - Created user info
   */
  async register(email, password, role = 'author') {
    try {
      // Check if user already exists
      const checkQuery = 'SELECT id FROM users WHERE email = $1';
      const existing = await pool.query(checkQuery, [email]);
      
      if (existing.rows.length > 0) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashed_password = await bcrypt.hash(password, 10);

      // Insert new user
      const insertQuery = `
        INSERT INTO users (email, hashed_password, role)
        VALUES ($1, $2, $3)
        RETURNING id, email, role, created_at
      `;
      const result = await pool.query(insertQuery, [email, hashed_password, role]);

      return {
        success: true,
        data: {
          user: result.rows[0]
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current user profile
   * @param {number} userId - User ID
   * @returns {Promise<object>} - User profile
   */
  async getProfile(userId) {
    try {
      const query = `
        SELECT id, email, role, created_at
        FROM users
        WHERE id = $1
      `;
      const result = await pool.query(query, [userId]);
      
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return {
        success: true,
        data: result.rows[0]
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
