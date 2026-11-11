const pool = require('../db');
const { HttpError } = require('../utils/errors');
const { requireString, requireEmail, oneOf, parseId, buildPagination } = require('../utils/validation');

const COMMENT_STATUSES = ['pending', 'approved', 'rejected'];

const findPublishedPostId = async (slug) => {
  const { rows } = await pool.query("SELECT id FROM posts WHERE slug = $1 AND status = 'published'", [slug]);
  if (!rows[0]) throw new HttpError(404, 'Post not found');
  return rows[0].id;
};

class CommentService {
  async listApprovedForPost(slug) {
    const postId = await findPublishedPostId(slug);
    const { rows } = await pool.query(
      `SELECT id, author_name, body, created_at FROM comments
       WHERE post_id = $1 AND status = 'approved'
       ORDER BY created_at ASC, id ASC`,
      [postId]
    );
    return { success: true, data: rows };
  }

  async submit(slug, body) {
    const postId = await findPublishedPostId(slug);
    const authorName = requireString(body.author_name, 'Name', { max: 100 });
    const authorEmail = requireEmail(body.author_email);
    const text = requireString(body.body, 'Comment', { max: 2000 });

    const { rows } = await pool.query(
      `INSERT INTO comments (post_id, author_name, author_email, body)
       VALUES ($1, $2, $3, $4)
       RETURNING id, post_id, author_name, body, status, created_at`,
      [postId, authorName, authorEmail, text]
    );
    return {
      success: true,
      data: rows[0],
      message: 'Thanks! Your comment will appear once it has been approved.'
    };
  }

  async listForAdmin({ status, postId }, { page, limit, offset }) {
    const conditions = [];
    const values = [];
    if (status) {
      values.push(oneOf(status, COMMENT_STATUSES, 'Status'));
      conditions.push(`c.status = $${values.length}`);
    }
    if (postId) {
      values.push(parseId(postId, 'post_id'));
      conditions.push(`c.post_id = $${values.length}`);
    }
    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [list, count] = await Promise.all([
      pool.query(
        `SELECT c.*, p.title AS post_title, p.slug AS post_slug
         FROM comments c JOIN posts p ON p.id = c.post_id
         ${where}
         ORDER BY c.created_at DESC, c.id DESC
         LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        [...values, limit, offset]
      ),
      pool.query(`SELECT COUNT(*)::int AS count FROM comments c ${where}`, values)
    ]);

    return {
      success: true,
      data: { comments: list.rows, pagination: buildPagination(page, limit, count.rows[0].count) }
    };
  }

  async updateStatus(id, status) {
    const { rows } = await pool.query(
      `UPDATE comments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [oneOf(status, COMMENT_STATUSES, 'Status'), parseId(id)]
    );
    if (!rows[0]) throw new HttpError(404, 'Comment not found');
    return { success: true, data: rows[0], message: 'Comment updated successfully' };
  }

  async remove(id) {
    const { rows } = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [parseId(id)]);
    if (!rows[0]) throw new HttpError(404, 'Comment not found');
    return { success: true, data: rows[0], message: 'Comment deleted successfully' };
  }
}

module.exports = new CommentService();
