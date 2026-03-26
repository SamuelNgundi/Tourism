require('dotenv').config();
const pool = require('./db');

(async () => {
  try {
    await pool.query("UPDATE media SET url='/uploads/images/FB_IMG_1704554784230[1]_edited.jpg-1774446726608-559304594.jpeg' WHERE id=1");
    console.log(' Fixed broken media URL!');
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();