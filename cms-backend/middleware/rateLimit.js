const rateLimit = require('express-rate-limit');

const envInt = (name, fallback) => {
  const value = parseInt(process.env[name], 10);
  return Number.isInteger(value) && value > 0 ? value : fallback;
};

const tooManyRequests = (message) => (req, res) =>
  res.status(429).json({ success: false, error: message });

/**
 * Builds the per-app rate limiters. Each app instance gets its own counters.
 */
const createRateLimiters = (options = {}) => {
  const windowMs = options.rateLimitWindowMs || envInt('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000);

  return {
    login: rateLimit({
      windowMs,
      limit: options.loginRateLimit || envInt('LOGIN_RATE_LIMIT_MAX', 10),
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      handler: tooManyRequests('Too many login attempts. Please try again later.')
    }),
    publicForms: rateLimit({
      windowMs,
      limit: options.publicFormRateLimit || envInt('PUBLIC_FORM_RATE_LIMIT_MAX', 20),
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      handler: tooManyRequests('Too many submissions. Please try again later.')
    })
  };
};

// Route-level middleware that delegates to the limiter registered on the app.
const useLimiter = (name) => (req, res, next) => {
  const limiter = req.app.locals.rateLimiters && req.app.locals.rateLimiters[name];
  return limiter ? limiter(req, res, next) : next();
};

module.exports = { createRateLimiters, useLimiter };
