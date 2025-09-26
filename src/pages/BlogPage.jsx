import React, { useState } from 'react';
import { Calendar, User, Eye, MessageCircle, Search, Tag } from 'lucide-react';

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 24 },
    { id: 'travel-tips', name: 'Travel Tips', count: 8 },
    { id: 'culture', name: 'Kenyan Culture', count: 6 },
    { id: 'ambassador-stories', name: 'Ambassador Stories', count: 5 },
    { id: 'tourism-updates', name: 'Tourism Updates', count: 5 }
  ];

  const featuredPost = {
    title: "The Ultimate Guide to Experiencing Maasai Culture Authentically",
    excerpt: "Discover the rich traditions, customs, and way of life of the Maasai people through respectful cultural tourism experiences that benefit local communities.",
    author: "Sarah Wanjiku",
    date: "March 8, 2024",
    readTime: "8 min read",
    views: 1240,
    comments: 23,
    image: "https://images.unsplash.com/photo-1517804234-5885b7cb0b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
    category: "Kenyan Culture"
  };

  const blogPosts = [
    {
      title: "10 Hidden Gems in Kenya Every Tourist Should Visit",
      excerpt: "Beyond the famous Maasai Mara and Mount Kenya, discover lesser-known destinations that showcase Kenya's incredible diversity.",
      author: "James Kiprotich",
      date: "March 5, 2024",
      readTime: "6 min read",
      views: 856,
      comments: 15,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Travel Tips"
    },
    {
      title: "How Tourism Ambassadors Are Changing Rural Communities",
      excerpt: "Real stories from Tourism Ambassadors who are making a difference in their local communities through sustainable tourism initiatives.",
      author: "Grace Mutua",
      date: "March 3, 2024",
      readTime: "5 min read",
      views: 642,
      comments: 8,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Ambassador Stories"
    },
    {
      title: "Sustainable Tourism Practices for the Conscious Traveler",
      excerpt: "Learn how to travel responsibly in Kenya while supporting local communities and preserving the environment for future generations.",
      author: "Dr. Michael Otieno",
      date: "February 28, 2024",
      readTime: "7 min read",
      views: 728,
      comments: 12,
      image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Tourism Updates"
    },
    {
      title: "The Best Kenyan Foods You Must Try During Your Visit",
      excerpt: "A culinary journey through Kenya's diverse food culture, from coastal Swahili dishes to highland specialties.",
      author: "Fatuma Hassan",
      date: "February 25, 2024",
      readTime: "9 min read",
      views: 1023,
      comments: 19,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Kenyan Culture"
    },
    {
      title: "Photography Tips for Capturing Kenya's Wildlife",
      excerpt: "Professional wildlife photographers share their secrets for getting the perfect shot during your Kenyan safari adventure.",
      author: "David Njoroge",
      date: "February 22, 2024",
      readTime: "4 min read",
      views: 594,
      comments: 7,
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Travel Tips"
    },
    {
      title: "From Student to Tourism Ambassador: My Journey",
      excerpt: "Personal story of transformation and empowerment through the Tourism Ambassadors program from a university student's perspective.",
      author: "Kevin Maina",
      date: "February 20, 2024",
      readTime: "6 min read",
      views: 421,
      comments: 11,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80",
      category: "Ambassador Stories"
    }
  ];

  const filteredPosts = selectedCategory === 'all' ? blogPosts : blogPosts.filter(post => post.category.toLowerCase().replace(' ', '-') === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Kenya landscape for blog"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-forest-900/40"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            TOURISM AMBASSADORS <span className="text-nature-400">BLOG</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Stories, insights, and updates from Kenya's Tourism Ambassadors community. Discover travel tips, cultural insights, and inspiring stories from the #TembeaKenya movement.
          </p>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-brand-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-brand-green/10'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest-900 mb-4">
              FEATURED <span className="text-nature-600">ARTICLE</span>
            </h2>
          </div>

          <div className="bg-gradient-to-r from-brand-green to-camp-600 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-forest-900">{featuredPost.category}</span>
                </div>
              </div>
              <div className="p-8 lg:p-12 text-white">
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-white/90 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-white/80 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{featuredPost.views} views</span>
                  </div>
                </div>
                <button className="bg-white text-brand-green px-6 py-3 rounded-lg font-semibold hover:bg-brand-green/10 transition-colors">
                  READ FULL ARTICLE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-4">
              LATEST <span className="text-nature-600">ARTICLES</span>
            </h2>
            <p className="text-lg text-forest-700">Stay updated with the latest stories and insights from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-forest-900">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-forest-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <span className="text-brand-green font-medium">{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <button className="text-brand-green font-medium text-sm hover:text-brand-greenDark transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
              LOAD MORE ARTICLES
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-forest-600 to-camp-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            STAY UPDATED WITH <span className="text-nature-200">#TembeaKenya</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter and never miss the latest stories, travel tips, and cultural insights from Kenya's Tourism Ambassadors.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-brand-green px-6 py-3 rounded-lg font-semibold hover:bg-brand-green/10 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
