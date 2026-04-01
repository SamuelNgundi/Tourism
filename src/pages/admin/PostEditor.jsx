import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ArrowLeft, Save, Eye, Trash2, Upload, Image, User, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function PostEditor() {
  const navigate = useNavigate();
  const { id } = useParams(); // If editing existing post
  const isEditMode = !!id;

  const token = localStorage.getItem('adminToken');
  
  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState([]);

  // Fetch post data if editing
  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    if (isEditMode) {
      fetchPost(id);
    }
    fetchTags();
    fetchUsers();
    fetchMediaLibrary();
  }, [id, token]);

  const fetchPost = async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/posts/admin/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const post = response.data.data;
      setTitle(post.title);
      setBody(post.body);
      setExcerpt(post.excerpt || '');
      setStatus(post.status);
      setSelectedUserId(post.author_id?.toString() || '');
      setFeaturedImage(post.featured_image || null);
    } catch (err) {
      setError('Failed to load post');
      console.error('Error loading post:', err.response?.data || err.message);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/tags/all`);
      setTags(response.data.data);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      // Set empty array as fallback
      setUsers([]);
    }
  };

  const fetchMediaLibrary = async () => {
    try {
      const response = await axios.get(`${API_URL}/media`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMediaLibrary(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch media library:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim() || !body.trim()) {
      setError('Title and content are required');
      setLoading(false);
      return;
    }

    try {
      const postData = {
        title: title.trim(),
        body,
        excerpt: excerpt.trim() || body.substring(0, 200) + '...',
        status,
        author_id: selectedUserId ? parseInt(selectedUserId) : undefined,
        featured_image: featuredImage,
        tag_ids: selectedTagIds.length > 0 ? selectedTagIds : undefined
      };

      if (isEditMode) {
        // Update existing post
        await axios.put(`${API_URL}/posts/${id}`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Post updated successfully!');
      } else {
        // Create new post
        const response = await axios.post(`${API_URL}/posts`, postData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Post created successfully!');
        navigate(`/admin/posts/${response.data.data.id}/edit`);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`${API_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Post deleted successfully!');
      navigate('/admin/posts');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTagIds(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP, or GIF)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_URL}/media/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      const uploadedMedia = response.data.data;
      setFeaturedImage(uploadedMedia.url);
      
      // Refresh media library
      fetchMediaLibrary();
      
      alert('Image uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image: ' + (err.response?.data?.error || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const selectFromLibrary = (mediaUrl) => {
    setFeaturedImage(mediaUrl);
  };

  const insertImageIntoContent = () => {
    if (!featuredImage) {
      alert('Please upload or select an image first');
      return;
    }
    const imageHtml = `<img src="${featuredImage}" alt="Post image" />`;
    setBody(body + '\n' + imageHtml);
  };

  const handleDeleteMedia = async (mediaId, mediaUrl) => {
    // Check if this image is currently set as featured image
    if (featuredImage === mediaUrl) {
      if (confirm('This image is set as featured image. Deleting it will remove the featured image. Continue?')) {
        setFeaturedImage(null);
      } else {
        return;
      }
    }

    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    try {
      setUploading(true);
      await axios.delete(`${API_URL}/media/${mediaId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh media library
      fetchMediaLibrary();
      alert('Image deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete image: ' + (err.response?.data?.error || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'clean']
    ]
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/posts')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? 'Edit Post' : 'Create New Post'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {isEditMode ? 'Update your blog post' : 'Write a new blog post'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditMode && (
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              )}
              <button
                onClick={() => window.open(`/blog`, '_blank')}
                className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-greenDark transition-colors flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-brand-green text-white px-6 py-2 rounded-lg hover:bg-brand-greenDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-xl shadow p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent text-lg"
                  required
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl shadow p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content *
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={body}
                    onChange={setBody}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your content here..."
                    className="bg-white"
                    style={{ height: '400px' }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Image */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Image className="h-5 w-5 mr-2" />
                  Featured Image
                </h3>
                
                {featuredImage ? (
                  <div className="mb-4">
                    <img 
                      src={featuredImage} 
                      alt="Featured" 
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => setFeaturedImage(null)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                        id="file-upload"
                      />
                      <div
                        htmlFor="file-upload"
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-brand-green transition-colors"
                      >
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, WebP up to 5MB
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Media Library */}
                {mediaLibrary.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Or select from library:</p>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {mediaLibrary.map((media) => (
                        <div key={media.id} className="relative group">
                          <button
                            type="button"
                            onClick={() => selectFromLibrary(media.url)}
                            className={`w-full aspect-square rounded-lg overflow-hidden border-2 ${
                              featuredImage === media.url ? 'border-brand-green' : 'border-gray-200'
                            }`}
                          >
                            <img 
                              src={media.url} 
                              alt={media.original_name} 
                              className="w-full h-full object-cover"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMedia(media.id, media.url)}
                            className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity shadow-lg"
                            title="Delete image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={insertImageIntoContent}
                  disabled={!featuredImage}
                  className="mt-4 w-full text-sm bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Insert into Content
                </button>
              </div>
              {/* Publish Settings */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Publish Settings</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {status === 'draft' && '📝 Only you can see this'}
                    {status === 'published' && '✅ Visible to everyone'}
                    {status === 'archived' && '🗄️ Hidden from public view'}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-green text-white font-semibold py-3 rounded-lg hover:bg-brand-greenDark transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                  </button>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Excerpt</h3>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description (optional)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Short summary for search results and social sharing
                </p>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="space-y-2">
                  {tags.map((tag) => (
                    <label
                      key={tag.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTagIds.includes(tag.id)}
                        onChange={() => toggleTag(tag.id)}
                        className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                      />
                      <span className="text-sm text-gray-700">{tag.name}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select tags to categorize your post
                </p>
              </div>

              {/* Author/Owner */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Post Author
                </h3>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                >
                  <option value="">Select author...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email} ({user.role})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Choose who authored this post
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PostEditor;
