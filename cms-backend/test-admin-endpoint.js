const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function testEndpoint() {
  try {
    console.log('🔐 Step 1: Logging in as admin...');
    
    // Login to get token
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@tembeakenya.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Token received!');
    
    console.log('\n📝 Step 2: Fetching post by ID (1)...');
    
    // Test the admin endpoint
    const postResponse = await axios.get(`${API_URL}/posts/admin/1`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Post fetched successfully!');
    console.log('\n📄 Post details:');
    console.log('  Title:', postResponse.data.data.title);
    console.log('  Status:', postResponse.data.data.status);
    console.log('  Author ID:', postResponse.data.data.author_id);
    console.log('  Featured Image:', postResponse.data.data.featured_image || 'None');
    
    console.log('\n✨ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

testEndpoint();
