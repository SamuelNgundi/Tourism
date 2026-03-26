require('dotenv').config();
const pool = require('./db');

async function addFeaturedImageColumn() {
  try {
    console.log('📝 Adding featured_image column to posts table...');
    
    // Check if column exists
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'posts' AND column_name = 'featured_image'
    `;
    
    const checkResult = await pool.query(checkQuery);
    
    if (checkResult.rows.length === 0) {
      // Column doesn't exist, add it
      const addQuery = `
        ALTER TABLE posts 
        ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500)
      `;
      
      await pool.query(addQuery);
      console.log('✅ featured_image column added successfully!');
    } else {
      console.log('✅ featured_image column already exists!');
    }
    
    console.log('✨ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

addFeaturedImageColumn();
