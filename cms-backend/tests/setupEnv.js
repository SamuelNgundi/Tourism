const os = require('os');
const path = require('path');

// Load the developer's DB credentials, then force an isolated test database.
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

process.env.NODE_ENV = 'test';
process.env.DB_NAME = process.env.TEST_DB_NAME || 'blog_cms_test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.LOGIN_RATE_LIMIT_MAX = '1000';
process.env.PUBLIC_FORM_RATE_LIMIT_MAX = '1000';
process.env.UPLOADS_DIR = path.join(os.tmpdir(), 'tourism-cms-test-uploads');
