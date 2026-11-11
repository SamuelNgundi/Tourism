require('dotenv').config();
const { createApp } = require('./app');
const config = require('./config');

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set. Add it to cms-backend/.env before starting the server.');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET.length < 32) {
  console.warn('⚠️  JWT_SECRET is shorter than 32 characters. Use a long random secret in production.');
}

const app = createApp();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('===========================================');
  console.log(`🚀 Blog CMS API Server`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log(`✅ CORS enabled for: ${config.allowedOrigins.join(', ')}`);
  console.log('===========================================');
});

module.exports = app;
