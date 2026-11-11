const path = require('path');

module.exports = {
  get uploadsDir() {
    return process.env.UPLOADS_DIR
      ? path.resolve(process.env.UPLOADS_DIR)
      : path.join(__dirname, 'uploads');
  },

  get allowedOrigins() {
    const configured = (process.env.FRONTEND_URL || 'http://localhost:5173')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);
    return [
      ...new Set([
        ...configured,
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174'
      ])
    ];
  }
};
