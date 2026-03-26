require('dotenv').config();
const bcrypt = require('bcrypt');
const pool = require('./db');

async function createAdminUser() {
  try {
    const email = 'admin@tembeakenya.com';
    const password = 'admin123';
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Creating admin user...');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Hashed password:', hashedPassword);
    
    // Delete existing admin user if exists
    await pool.query('DELETE FROM users WHERE email = $1', [email]);
    
    // Insert new admin user with proper bcrypt hash
    const result = await pool.query(
      `INSERT INTO users (email, hashed_password, role) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, role`,
      [email, hashedPassword, 'admin']
    );
    
    console.log('\n✅ Admin user created successfully!');
    console.log('User:', result.rows[0]);
    console.log('\n🔐 You can now login with:');
    console.log('   Email:', email);
    console.log('   Password:', password);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdminUser();
