const postQueries = require('../db/queries');
const { HttpError } = require('../utils/errors');
const { uniqueSlug } = require('../utils/slug');
const {
  requireString,
  optionalString,
  optionalUrl,
  oneOf,
  parseId,
  slugify,
  stripHtml,
  buildPagination
} = require('../utils/validation');

const POST_STATUSES = ['draft', 'published', 'archived'];
const MAX_BODY_LENGTH = 500000;

const isAdmin = (user) => user && user.role === 'admin';

const assertCanManage = (post, user) => {
  if (!isAdmin(user) && post.author_id !== user.id) {
    throw new HttpError(403, 'You can only manage your own posts');
  }
};

const parseTagIds = async (tagIds) => {
  if (tagIds === undefined || tagIds === null) return undefined;
  if (!Array.isArray(tagIds)) {
    throw new HttpError(400, 'tag_ids must be an array of tag IDs');
  }
  const ids = [...new Set(tagIds.map((id) => parseId(id, 'tag id')))];
  if (ids.length > 0) {
    const existing = await postQueries.findExistingTagIds(ids);
    if (existing.length !== ids.length) {
      throw new HttpError(400, 'One or more tags do not exist');
    }
  }
  return ids;
};

/**
 * Validates post fields. In partial mode only provided fields are checked.
 * Returns only the columns that should be written.
 */
const validatePostInput = (data, { partial = false } = {}) => {
  const fields = {};

  if (!partial || data.title !== undefined) {
    fields.title = requireString(data.title, 'Title', { max: 255 });
  }
  if (!partial || data.body !== undefined) {
    if (typeof data.body !== 'string' || data.body.trim().length === 0) {
      throw new HttpError(400, 'Body content is required');
    }
    if (data.body.length > MAX_BODY_LENGTH) {
      throw new HttpError(400, 'Body content is too long');
    }
    fields.body = data.body;
  }
  if (data.excerpt !== undefined) {
    fields.excerpt = optionalString(data.excerpt, 'Excerpt', { max: 500 });
  }
  if (data.status !== undefined) {
    fields.status = oneOf(data.status, POST_STATUSES, 'Status');
  }
  if (data.featured_image !== undefined) {
    fields.featured_image = optionalUrl(data.featured_image, 'Featured image');
  }

  return fields;
};

/**
 * Admins may assign a post to another user; for anyone else author_id is ignored.
 */
const resolveAuthorId = async (requestedAuthorId, user) => {
  if (!isAdmin(user) || requestedAuthorId === undefined || requestedAuthorId === null || requestedAuthorId === '') {
    return undefined;
  }
  const authorId = parseId(requestedAuthorId, 'author_id');
  if (!(await postQueries.userExists(authorId))) {
    throw new HttpError(400, 'Author does not exist');
  }
  return authorId;
};

/**
 * Post Service
 * Handles business logic for blog posts
 */
class PostService {
  async listPosts(filters, { page, limit, offset }) {
    const [posts, totalItems] = await Promise.all([
      postQueries.listPosts(filters, limit, offset),
      postQueries.countPosts(filters)
    ]);
    return {
      success: true,
      data: { posts, pagination: buildPagination(page, limit, totalItems) }
    };
  }

  // Public listing: published posts only, optional search and tag filter.
  async getPublishedPosts({ search, tag }, pagination) {
    return this.listPosts({ status: 'published', search, tag }, pagination);
  }

  // Admin listing: admins see every post, authors only their own.
  async getPostsForUser(user, { status, search, tag, authorId }, pagination) {
    const filters = {
      status: !status || status === 'all' ? undefined : oneOf(status, POST_STATUSES, 'Status'),
      search,
      tag,
      authorId: isAdmin(user) ? authorId : user.id
    };
    return this.listPosts(filters, pagination);
  }

  async getPublishedPostBySlug(slug) {
    const post = await postQueries.getPostBySlug(slug);
    if (!post || post.status !== 'published') {
      throw new HttpError(404, 'Post not found');
    }
    post.view_count = await postQueries.incrementViewCount(post.id);
    return { success: true, data: post };
  }

  async getPostForEditing(id, user) {
    const post = await postQueries.getPostById(parseId(id));
    if (!post) throw new HttpError(404, 'Post not found');
    assertCanManage(post, user);
    return { success: true, data: post };
  }

  async createPost(data, user) {
    const fields = validatePostInput(data);
    const tagIds = await parseTagIds(data.tag_ids);
    const authorId = await resolveAuthorId(data.author_id, user);

    const post = await postQueries.createPost({
      title: fields.title,
      slug: await uniqueSlug('posts', slugify(fields.title), { fallback: 'post' }),
      body: fields.body,
      excerpt: fields.excerpt || `${stripHtml(fields.body).substring(0, 200)}...`,
      status: fields.status || 'draft',
      author_id: authorId || user.id,
      featured_image: fields.featured_image || null,
      tag_ids: tagIds || []
    });

    return { success: true, data: post, message: 'Post created successfully' };
  }

  async updatePost(id, data, user) {
    const postId = parseId(id);
    const existing = await postQueries.getPostById(postId);
    if (!existing) throw new HttpError(404, 'Post not found');
    assertCanManage(existing, user);

    const updates = validatePostInput(data, { partial: true });
    const tagIds = await parseTagIds(data.tag_ids);
    const authorId = await resolveAuthorId(data.author_id, user);
    if (authorId !== undefined) updates.author_id = authorId;

    if (updates.title !== undefined && updates.title !== existing.title) {
      updates.slug = await uniqueSlug('posts', slugify(updates.title), { excludeId: postId, fallback: 'post' });
    }

    const post = await postQueries.updatePost(postId, updates, tagIds);
    return { success: true, data: post, message: 'Post updated successfully' };
  }

  async deletePost(id) {
    const deletedPost = await postQueries.deletePost(parseId(id));
    if (!deletedPost) throw new HttpError(404, 'Post not found');
    return { success: true, data: deletedPost, message: 'Post deleted successfully' };
  }
}

module.exports = new PostService();
module.exports.POST_STATUSES = POST_STATUSES;
