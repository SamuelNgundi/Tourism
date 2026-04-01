require('dotenv').config();
const axios = require('axios');
const API_URL = 'http://localhost:3001/api';

async function testDelete() {
  console.log(' Testing Media Delete Functionality...\n');
  
  try {
    // Login
    console.log('Step 1: Logging in...');
    const loginResponse = await axios.post(\\/auth/login\, {
      email: 'admin@tembeakenya.com',
      password: 'admin123'
    });
    const token = loginResponse.data.data.token;
    console.log(' Logged in\n');
    
    // Get media library
    console.log('Step 2: Getting media library...');
    const mediaResponse = await axios.get(\\/media\, {
      headers: { 'Authorization': \Bearer \\ }
    });
    const mediaFiles = mediaResponse.data.data;
    
    if (mediaFiles.length === 0) {
      console.log('  No media files to delete. Upload an image first!');
      process.exit(0);
    }
    
    console.log(\Found \ media file(s):\);
    mediaFiles.forEach((m, i) => {
      console.log(\  \. \ (ID: \)\);
    });
    console.log();
    
    // Test delete on last file (safer than deleting random ones)
    const fileToDelete = mediaFiles[mediaFiles.length - 1];
    console.log(\Step 3: Deleting '\'...\);
    
    const deleteResponse = await axios.delete(\\/media/\\, {
      headers: { 'Authorization': \Bearer \\ }
    });
    
    console.log(' Delete successful!');
    console.log(\   Response: \\);
    console.log();
    
    // Verify deletion
    console.log('Step 4: Verifying deletion...');
    const verifyResponse = await axios.get(\\/media\, {
      headers: { 'Authorization': \Bearer \\ }
    });
    const remainingFiles = verifyResponse.data.data;
    
    if (remainingFiles.length === mediaFiles.length - 1) {
      console.log(' Deletion verified! File count reduced by 1.');
    } else {
      console.log(' Verification failed! File count unchanged.');
    }
    
    console.log('\n Delete functionality test complete!\n');
  } catch (error) {
    console.error(' Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testDelete();