require('dotenv').config();
const pool = require('./db');

(async () => {
  try {
    console.log('Setting up featured images...');
    
    const mediaResult = await pool.query('SELECT url FROM media ORDER BY created_at');
    const images = mediaResult.rows;
    
    if (images.length === 0) {
      console.log('No images found!');
      process.exit(1);
    }
    
    console.log('Found ' + images.length + ' image(s)');
    
    const postsResult = await pool.query('SELECT id, title FROM posts ORDER BY created_at');
    const posts = postsResult.rows;
    
    if (posts.length === 0) {
      console.log('No posts found!');
      process.exit(1);
    }
    
    console.log('Found ' + posts.length + ' post(s)');
    
    let updated = 0;
    for (let i = 0; i < posts.length; i++) {
      const imageUrl = images[i % images.length].url;
      await pool.query('UPDATE posts SET featured_image = \ WHERE id = \', [imageUrl, posts[i].id]);
      console.log('Updated post ' + posts[i].id + ': ' + posts[i].title.substring(0, 30));
      updated++;
    }
    
    console.log('Successfully set featured images for ' + updated + ' post(s)!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();