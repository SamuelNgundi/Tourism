const postQueries = require('../db/queries');

/**
 * Utility function to generate URL-friendly slug from title
 * @param {string} title - Post title
 * @returns {string} - URL-friendly slug
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
};

/**
 * Validate post input data
 * @param {object} postData - Post data to validate
 * @returns {object} - Validation result
 */
const validatePostInput = (postData) => {
  const errors = [];
  
  if (!postData.title || postData.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (postData.title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }

  if (!postData.body || postData.body.trim().length === 0) {
    errors.push('Body content is required');
  }

  if (postData.excerpt && postData.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters');
  }

  const validStatuses = ['draft', 'published', 'archived'];
  if (postData.status && !validStatuses.includes(postData.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Post Service
 * Handles business logic for blog posts
 */
class PostService {
  /**
   * Get all published posts with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<object>} - Paginated posts
   */
  async getPublishedPosts(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const posts = await postQueries.getAllPosts('published', limit, offset);
      const totalCount = await postQueries.getTotalCount('published');
      
      return {
        success: true,
        data: {
          posts,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalItems: totalCount,
            itemsPerPage: limit
          }
        }
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single post by slug
   * @param {string} slug - Post slug
   * @returns {Promise<object>} - Post data
   */
  async getPostBySlug(slug) {
    try {
      const post = await postQueries.getPostBySlug(slug);
      
      if (!post) {
        throw new Error('Post not found');
      }

      return {
        success: true,
        data: post
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get single post by ID (for admin)
   * @param {number} id - Post ID
   * @returns {Promise<object>} - Post data
   */
  async getPostById(id) {
    try {
      const post = await postQueries.getPostById(id);
      
      if (!post) {
        throw new Error('Post not found');
      }

      return {
        success: true,
        data: post
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new post
   * @param {object} postData - Post data
   * @param {number} authorId - Author user ID
   * @returns {Promise<object>} - Created post
   */
  async createPost(postData, authorId) {
    try {
      // Validate input
      const validation = validatePostInput(postData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Generate slug from title
      let slug = generateSlug(postData.title);
      
      // Check if slug already exists and make it unique
      let existingPost = await postQueries.getPostBySlug(slug);
      let counter = 1;
      while (existingPost) {
        slug = `${generateSlug(postData.title)}-${counter}`;
        existingPost = await postQueries.getPostBySlug(slug);
        counter++;
      }

      // Create post
      const post = await postQueries.createPost(
        postData.title,
        slug,
        postData.body,
        postData.excerpt || postData.body.substring(0, 200) + '...',
        postData.status || 'draft',
        authorId,
        postData.tag_ids || []
      );

      return {
        success: true,
        data: post,
        message: 'Post created successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update existing post
   * @param {number} id - Post ID
   * @param {object} updates - Updates to apply
   * @returns {Promise<object>} - Updated post
   */
  async updatePost(id, updates) {
    try {
      // Validate input if provided
      if (updates.title || updates.body) {
        const validation = validatePostInput({ ...updates });
        if (!validation.isValid) {
          throw new Error(validation.errors.join(', '));
        }
      }

      // Generate new slug if title changed
      if (updates.title) {
        const newSlug = generateSlug(updates.title);
        const existingPost = await postQueries.getPostBySlug(newSlug);
        
        if (existingPost && existingPost.id !== id) {
          // Slug exists for different post, make unique
          let counter = 1;
          let uniqueSlug = newSlug;
          while (await postQueries.getPostBySlug(uniqueSlug)) {
            uniqueSlug = `${newSlug}-${counter}`;
            counter++;
          }
          updates.slug = uniqueSlug;
        } else {
          updates.slug = newSlug;
        }
      }

      // Update post
      const updatedPost = await postQueries.updatePost(id, updates, updates.tag_ids);

      return {
        success: true,
        data: updatedPost.rows[0],
        message: 'Post updated successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete post
   * @param {number} id - Post ID
   * @returns {Promise<object>} - Deleted post
   */
  async deletePost(id) {
    try {
      const deletedPost = await postQueries.deletePost(id);
      
      if (!deletedPost) {
        throw new Error('Post not found');
      }

      return {
        success: true,
        data: deletedPost,
        message: 'Post deleted successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all tags
   * @returns {Promise<object>} - All tags
   */
  async getAllTags() {
    try {
      const query = 'SELECT * FROM tags ORDER BY name';
      const result = await pool.query(query);
      
      return {
        success: true,
        data: result.rows
      };
    } catch (error) {
      throw error;
    }
  }
}

// Import pool for getAllTags
const pool = require('../db');

module.exports = new PostService();
