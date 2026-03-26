const axios = require('axios');

const API_URL = 'http://localhost:3001/api';

async function testImages() {
  console.log('🖼️ Testing Image Loading System...\n');
  
  try {
    // Step 1: Login
    console.log('🔐 Step 1: Logging in...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@tembeakenya.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Logged in successfully!\n');
    
    // Step 2: Check media library
    console.log('📚 Step 2: Checking media library...');
    const mediaResponse = await axios.get(`${API_URL}/media`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const mediaFiles = mediaResponse.data.data || [];
    if (mediaFiles.length > 0) {
      console.log(`✅ Found ${mediaFiles.length} media file(s)`);
      console.log('\nMedia files:');
      mediaFiles.forEach((media, i) => {
        console.log(`  ${i + 1}. ${media.original_name}`);
        console.log(`     URL: ${media.url}`);
        console.log(`     Type: ${media.mimetype}`);
      });
    } else {
      console.log('⚠️  No media files found. Upload an image first!');
    }
    console.log();
    
    // Step 3: Check posts for featured images
    console.log('📝 Step 3: Checking posts for featured images...');
    const postsResponse = await axios.get(`${API_URL}/posts`, {
      params: { page: 1, limit: 10 }
    });
    
    const posts = postsResponse.data.data.posts || [];
    if (posts.length > 0) {
      console.log(`✅ Found ${posts.length} post(s)`);
      console.log('\nPosts:');
      posts.forEach((post, i) => {
        console.log(`  ${i + 1}. ${post.title}`);
        console.log(`     Featured Image: ${post.featured_image ? '✅ YES' : '❌ NO'}`);
        if (post.featured_image) {
          console.log(`     URL: ${post.featured_image}`);
        }
      });
    } else {
      console.log('⚠️  No posts found.');
    }
    console.log();
    
    // Step 4: Test image accessibility
    if (mediaFiles.length > 0) {
      console.log('🔗 Step 4: Testing image URL accessibility...');
      const testUrl = mediaFiles[0].url;
      
      try {
        const imageTest = await axios.get(testUrl, { 
          responseType: 'arraybuffer',
          timeout: 5000
        });
        
        if (imageTest.status === 200) {
          console.log('✅ Image URL is accessible!');
          console.log(`   URL: ${testUrl}`);
          console.log(`   Size: ${(imageTest.data.length / 1024).toFixed(2)} KB`);
        }
      } catch (error) {
        console.log('❌ Image URL NOT accessible!');
        console.log(`   Error: ${error.message}`);
        console.log(`   URL: ${testUrl}`);
        console.log('\n💡 Possible fixes:');
        console.log('   - Ensure backend server is running on port 3001');
        console.log('   - Check if uploads folder exists');
        console.log('   - Verify static file serving in index.js');
      }
    }
    
    console.log('\n✨ Image loading test complete!\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testImages();
