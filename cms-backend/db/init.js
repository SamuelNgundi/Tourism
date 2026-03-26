require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Create connection to default postgres database
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to default database first
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('📝 Starting database initialization...');
    
    // Check if database exists
    const dbExists = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME || 'blog_cms']
    );
    
    // Create database if it doesn't exist
    if (dbExists.rows.length === 0) {
      console.log(`📦 Creating database ${process.env.DB_NAME || 'blog_cms'}...`);
      await client.query(`CREATE DATABASE ${process.env.DB_NAME || 'blog_cms'}`);
      console.log('✅ Database created successfully!');
    } else {
      console.log('✅ Database already exists');
    }
    
    client.release();
    
    // Now connect to the target database
    const targetPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'blog_cms',
      password: process.env.DB_PASSWORD || 'postgres',
      port: process.env.DB_PORT || 5432,
    });
    
    const targetClient = await targetPool.connect();
    
    // Read and execute schema
    console.log('📄 Reading schema file...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🔧 Executing schema...');
    await targetClient.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Tables created: users, posts, tags, post_tags, media');
    console.log('👤 Default admin user created (email: admin@tembeakenya.com, password: admin123)');
    console.log('⚠️  IMPORTANT: Change the default admin password immediately!');
    
    targetClient.release();
    await targetPool.end();
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('\n✨ Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = initializeDatabase;
