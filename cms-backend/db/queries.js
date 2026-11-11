const pool = require('./index');

const escapeLike = (value) => value.replace(/[\\%_]/g, '\\$&');

const TAG_NAMES = `COALESCE(ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL), '{}') AS tags`;
const TAG_IDS = `COALESCE(ARRAY_AGG(DISTINCT t.id) FILTER (WHERE t.id IS NOT NULL), '{}') AS tag_ids`;
const COMMENT_COUNT = `(SELECT COUNT(*)::int FROM comments c WHERE c.post_id = p.id AND c.status = 'approved') AS comment_count`;
const TAG_JOINS = `
  LEFT JOIN users u ON p.author_id = u.id
  LEFT JOIN post_tags pt ON p.id = pt.post_id
  LEFT JOIN tags t ON pt.tag_id = t.id`;

const LIST_FIELDS = `
  p.id, p.title, p.slug, p.excerpt, p.status, p.featured_image, p.view_count,
  p.author_id, p.published_at, p.created_at, p.updated_at,
  u.email AS author_email, ${TAG_NAMES}, ${COMMENT_COUNT}`;

const DETAIL_FIELDS = `p.*, u.email AS author_email, ${TAG_NAMES}, ${TAG_IDS}, ${COMMENT_COUNT}`;

const UPDATABLE_COLUMNS = ['title', 'slug', 'body', 'excerpt', 'status', 'featured_image', 'author_id'];

/**
 * Builds a WHERE clause for post listings.
 * @param {object} filters - { status, search, tag, authorId }
 */
const buildFilters = ({ status, search, tag, authorId } = {}) => {
  const conditions = [];
  const values = [];
  const param = (value) => {
    values.push(value);
    return `$${values.length}`;
  };

  if (status) conditions.push(`p.status = ${param(status)}`);
  if (authorId) conditions.push(`p.author_id = ${param(authorId)}`);
  if (search) {
    const p = param(`%${escapeLike(search)}%`);
    conditions.push(`(p.title ILIKE ${p} OR p.excerpt ILIKE ${p} OR p.body ILIKE ${p})`);
  }
  if (tag) {
    const p = param(tag);
    conditions.push(`EXISTS (
      SELECT 1 FROM post_tags pt2 JOIN tags t2 ON t2.id = pt2.tag_id
      WHERE pt2.post_id = p.id AND (t2.slug = ${p} OR LOWER(t2.name) = LOWER(${p}))
    )`);
  }

  return { where: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '', values };
};

const replaceTags = async (client, postId, tagIds) => {
  await client.query('DELETE FROM post_tags WHERE post_id = $1', [postId]);
  if (tagIds.length > 0) {
    await client.query(
      'INSERT INTO post_tags (post_id, tag_id) SELECT $1, UNNEST($2::int[])',
      [postId, tagIds]
    );
  }
};

const withTransaction = async (fn) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Database queries for posts
 */
const postQueries = {
  listPosts: async (filters, limit, offset) => {
    const { where, values } = buildFilters(filters);
    const query = `
      SELECT ${LIST_FIELDS}
      FROM posts p
      ${TAG_JOINS}
      ${where}
      GROUP BY p.id, u.email
      ORDER BY COALESCE(p.published_at, p.created_at) DESC, p.id DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    const result = await pool.query(query, [...values, limit, offset]);
    return result.rows;
  },

  countPosts: async (filters) => {
    const { where, values } = buildFilters(filters);
    const result = await pool.query(`SELECT COUNT(*)::int AS count FROM posts p ${where}`, values);
    return result.rows[0].count;
  },

  getPostBySlug: async (slug) => {
    const query = `
      SELECT ${DETAIL_FIELDS}
      FROM posts p
      ${TAG_JOINS}
      WHERE p.slug = $1
      GROUP BY p.id, u.id
    `;
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  },

  getPostById: async (id) => {
    const query = `
      SELECT ${DETAIL_FIELDS}
      FROM posts p
      ${TAG_JOINS}
      WHERE p.id = $1
      GROUP BY p.id, u.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  incrementViewCount: async (id) => {
    const result = await pool.query(
      'UPDATE posts SET view_count = view_count + 1 WHERE id = $1 RETURNING view_count',
      [id]
    );
    return result.rows[0] ? result.rows[0].view_count : null;
  },

  findExistingTagIds: async (tagIds) => {
    const result = await pool.query('SELECT id FROM tags WHERE id = ANY($1::int[])', [tagIds]);
    return result.rows.map((row) => row.id);
  },

  userExists: async (id) => {
    const result = await pool.query('SELECT 1 FROM users WHERE id = $1', [id]);
    return result.rows.length > 0;
  },

  createPost: async ({ title, slug, body, excerpt, status, author_id, featured_image, tag_ids = [] }) => {
    const id = await withTransaction(async (client) => {
      const { rows } = await client.query(
        `INSERT INTO posts (title, slug, body, excerpt, status, author_id, featured_image, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, CASE WHEN $5::varchar = 'published' THEN CURRENT_TIMESTAMP END)
         RETURNING id`,
        [title, slug, body, excerpt, status, author_id, featured_image]
      );
      await replaceTags(client, rows[0].id, tag_ids);
      return rows[0].id;
    });
    return postQueries.getPostById(id);
  },

  /**
   * @param {number} id
   * @param {object} updates - columns to change (see UPDATABLE_COLUMNS)
   * @param {number[]|undefined} tagIds - replaces tags only when an array is given
   */
  updatePost: async (id, updates, tagIds) => {
    await withTransaction(async (client) => {
      const fields = [];
      const values = [];

      for (const column of UPDATABLE_COLUMNS) {
        if (updates[column] !== undefined) {
          values.push(updates[column]);
          fields.push(`${column} = $${values.length}`);
        }
      }
      if (updates.status === 'published') {
        fields.push('published_at = COALESCE(published_at, CURRENT_TIMESTAMP)');
      }

      if (fields.length > 0) {
        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);
        await client.query(`UPDATE posts SET ${fields.join(', ')} WHERE id = $${values.length}`, values);
      }

      if (Array.isArray(tagIds)) {
        await replaceTags(client, id, tagIds);
      }
    });
    return postQueries.getPostById(id);
  },

  deletePost: async (id) => {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = postQueries;
