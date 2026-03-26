const pool = require('../db');

/**
 * Database queries for posts
 */
const postQueries = {
  // Get all posts with optional filters
  getAllPosts: async (status = 'published', limit = 10, offset = 0) => {
    const query = `
      SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.status,
        p.published_at,
        p.created_at,
        u.email as author_email,
        ARRAY_AGG(DISTINCT t.name) as tags
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.status = $1
      GROUP BY p.id, u.email
      ORDER BY p.published_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [status, limit, offset]);
    return result.rows;
  },

  // Get post by slug
  getPostBySlug: async (slug) => {
    const query = `
      SELECT 
        p.*,
        u.email as author_email,
        ARRAY_AGG(DISTINCT t.name) as tags
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.slug = $1
      GROUP BY p.id, u.id
    `;
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  // Get post by ID
  getPostById: async (id) => {
    const query = `
      SELECT 
        p.*,
        u.email as author_email,
        ARRAY_AGG(DISTINCT t.name) as tags
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN post_tags pt ON p.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE p.id = $1
      GROUP BY p.id, u.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Create new post
  createPost: async (title, slug, body, excerpt, status, author_id, tag_ids = []) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Insert post
      const postQuery = `
        INSERT INTO posts (title, slug, body, excerpt, status, author_id, published_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const published_at = status === 'published' ? new Date() : null;
      const postResult = await client.query(postQuery, [title, slug, body, excerpt, status, author_id, published_at]);
      const post = postResult.rows[0];

      // Insert tags if provided
      if (tag_ids && tag_ids.length > 0) {
        for (const tag_id of tag_ids) {
          await client.query(
            'INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)',
            [post.id, tag_id]
          );
        }
      }

      await client.query('COMMIT');
      return post;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Update post
  updatePost: async (id, updates, tag_ids = []) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Build dynamic update query
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (updates.title) {
        fields.push(`title = $${paramCount++}`);
        values.push(updates.title);
      }
      if (updates.slug) {
        fields.push(`slug = $${paramCount++}`);
        values.push(updates.slug);
      }
      if (updates.body !== undefined) {
        fields.push(`body = $${paramCount++}`);
        values.push(updates.body);
      }
      if (updates.excerpt !== undefined) {
        fields.push(`excerpt = $${paramCount++}`);
        values.push(updates.excerpt);
      }
      if (updates.status) {
        fields.push(`status = $${paramCount++}`);
        values.push(updates.status);
        if (updates.status === 'published') {
          fields.push(`published_at = COALESCE(published_at, $${paramCount++})`);
          values.push(new Date());
        }
      }

      if (fields.length > 0) {
        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);
        
        const updateQuery = `
          UPDATE posts 
          SET ${fields.join(', ')}
          WHERE id = $${paramCount}
          RETURNING *
        `;
        
        await client.query(updateQuery, values);
      }

      // Update tags if provided
      if (tag_ids) {
        // Delete existing tags
        await client.query('DELETE FROM post_tags WHERE post_id = $1', [id]);
        
        // Insert new tags
        for (const tag_id of tag_ids) {
          await client.query(
            'INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)',
            [id, tag_id]
          );
        }
      }

      await client.query('COMMIT');
      return await client.query('SELECT * FROM posts WHERE id = $1', [id]);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Delete post
  deletePost: async (id) => {
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Get total count of posts
  getTotalCount: async (status = 'published') => {
    const query = 'SELECT COUNT(*) FROM posts WHERE status = $1';
    const result = await pool.query(query, [status]);
    return parseInt(result.rows[0].count);
  }
};

module.exports = postQueries;
