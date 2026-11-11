const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');

const config = require('./config');
const pool = require('./db');
const { HttpError } = require('./utils/errors');
const { createRateLimiters } = require('./middleware/rateLimit');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const userRoutes = require('./routes/userRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentRoutes = require('./routes/commentRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const eventRoutes = require('./routes/eventRoutes');

const PG_ERRORS = {
  23505: [409, 'Resource already exists'],
  23503: [400, 'Referenced resource does not exist'],
  23514: [400, 'Invalid value'],
  '22P02': [400, 'Invalid input'],
  22007: [400, 'Invalid date'],
  22008: [400, 'Invalid date']
};

const parseTrustProxy = (value) => {
  if (value === undefined || value === '') return false;
  if (value === 'true') return true;
  if (value === 'false') return false;
  const n = Number(value);
  return Number.isInteger(n) ? n : value;
};

/**
 * Builds the Express app. Options override rate limits (used by tests).
 */
function createApp(options = {}) {
  const app = express();
  const allowedOrigins = config.allowedOrigins;

  app.set('trust proxy', parseTrustProxy(process.env.TRUST_PROXY));
  app.locals.rateLimiters = createRateLimiters(options);

  // Uploaded images are embedded by the frontend on another origin.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  app.use(cors({
    origin(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new HttpError(403, 'Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  }));

  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static(config.uploadsDir));

  app.get('/health', async (req, res) => {
    let database = 'up';
    try {
      await pool.query('SELECT 1');
    } catch (error) {
      database = 'down';
    }
    res.status(database === 'up' ? 200 : 503).json({
      success: database === 'up',
      message: 'Blog CMS API is running',
      database,
      timestamp: new Date().toISOString()
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/comments', commentRoutes);
  app.use('/api/inquiries', inquiryRoutes);
  app.use('/api/newsletter', newsletterRoutes);
  app.use('/api/events', eventRoutes);

  app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      const error = err.code === 'LIMIT_FILE_SIZE' ? 'File too large. Maximum size is 5MB' : err.message;
      return res.status(400).json({ success: false, error });
    }

    if (Number.isInteger(err.status) && err.status >= 400 && err.status < 500) {
      const error = err.type === 'entity.parse.failed' ? 'Invalid JSON body' : err.message;
      return res.status(err.status).json({ success: false, error });
    }

    if (err.code && PG_ERRORS[err.code]) {
      const [status, error] = PG_ERRORS[err.code];
      return res.status(status).json({ success: false, error });
    }

    if (process.env.NODE_ENV !== 'test') console.error('Error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };
