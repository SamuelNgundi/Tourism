require('dotenv').config();
const axios = require('axios');

async function createFirstPost() {
  try {
    // First, login
    console.log('📝 Logging in...');
    const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'admin@tembeakenya.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Login successful!\n');
    
    // Create first post
    console.log('✍️  Creating first blog post...');
    const postResponse = await axios.post(
      'http://localhost:3001/api/posts',
      {
        title: 'Welcome to Tourism Ambassadors Blog',
        body: '<p>This is our first blog post created via the new CMS API! We are excited to share stories, tips, and updates from Kenya\'s Tourism Ambassadors community.</p>',
        excerpt: 'First blog post for the Tourism Ambassadors Kenya platform',
        status: 'published',
        tag_ids: [1, 2] // Travel Tips and Kenyan Culture
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    const post = postResponse.data.data;
    console.log('✅ Post created successfully!\n');
    console.log('📊 Post Details:');
    console.log('   Title:', post.title);
    console.log('   ID:', post.id);
    console.log('   Slug:', post.slug);
    console.log('   Status:', post.status);
    console.log('   Published At:', post.published_at);
    console.log('\n🎉 Success! Your blog now has content.');
    console.log('\n🌐 Visit http://localhost:5174/blog to see it!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

createFirstPost();
