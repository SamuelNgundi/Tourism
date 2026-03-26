import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, FilePlus, FileText, Settings, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if already logged in
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      logout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const newToken = response.data.data.token;
      localStorage.setItem('adminToken', newToken);
      setToken(newToken);
      setUser(response.data.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setUser(null);
    navigate('/admin');
  };

  // Login Form
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-green to-camp-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Tourism Ambassadors
            </h1>
            <p className="text-white/90">Admin Dashboard</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tembeakenya.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-green text-white font-semibold py-3 rounded-lg hover:bg-brand-greenDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Default credentials: admin@tembeakenya.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, {user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/posts/new')}
                className="bg-brand-green text-white px-4 py-2 rounded-lg hover:bg-brand-greenDark transition-colors flex items-center space-x-2"
              >
                <FilePlus className="h-4 w-4" />
                <span>New Post</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">-</p>
              </div>
              <div className="bg-brand-green/10 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-brand-green" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Published</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">-</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Role</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 capitalize">{user?.role}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/posts/new')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green hover:bg-brand-green/5 transition-colors text-left"
            >
              <FilePlus className="h-6 w-6 text-brand-green mb-2" />
              <h3 className="font-semibold text-gray-900">Create New Post</h3>
              <p className="text-sm text-gray-500 mt-1">Write and publish a new blog post</p>
            </button>

            <button
              onClick={() => navigate('/admin/posts')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green hover:bg-brand-green/5 transition-colors text-left"
            >
              <FileText className="h-6 w-6 text-brand-green mb-2" />
              <h3 className="font-semibold text-gray-900">Manage Posts</h3>
              <p className="text-sm text-gray-500 mt-1">View and edit existing posts</p>
            </button>

            <button
              onClick={() => navigate('/blog')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-brand-green hover:bg-brand-green/5 transition-colors text-left"
            >
              <Settings className="h-6 w-6 text-brand-green mb-2" />
              <h3 className="font-semibold text-gray-900">View Blog</h3>
              <p className="text-sm text-gray-500 mt-1">See the public blog page</p>
            </button>
          </div>
        </div>

        {/* Recent Posts Preview */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
            <button
              onClick={() => navigate('/admin/posts')}
              className="text-brand-green hover:text-brand-greenDark text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Navigate to Posts management to see all your content
          </p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
