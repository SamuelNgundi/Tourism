# Blog CMS - Complete Setup Guide

## 🎯 Overview

This is a complete traditional blog CMS with:
- **Backend**: Node.js/Express with PostgreSQL
- **Frontend**: React + Vite (your existing Tourism Ambassadors frontend)
- **Authentication**: JWT-based auth with role management
- **Features**: Full CRUD for posts, media uploads, tags management

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ PostgreSQL 12+ installed and running
- ✅ pnpm or npm installed

## 🚀 Step-by-Step Setup

### Step 1: Backend Setup

#### 1.1 Install Backend Dependencies

```bash
cd cms-backend
pnpm install
```

#### 1.2 Configure Database Connection

The `.env` file is already configured. Update if your PostgreSQL credentials differ:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_cms
```

#### 1.3 Initialize Database

Create the database and tables:

```bash
npm run db:init
```

This will:
- Create `blog_cms` database
- Create tables: users, posts, tags, post_tags, media
- Insert default admin user
- Insert sample tags

**Default Admin Credentials:**
- Email: `admin@tembeakenya.com`
- Password: `admin123`
- ⚠️ **Change this immediately after first login!**

#### 1.4 Start Backend Server

```bash
npm run dev
```

Server runs on: `http://localhost:3001`

You should see:
```
✅ Connected to PostgreSQL database
🚀 Blog CMS API Server
📍 Port: 3001
🔗 API Base: http://localhost:3001/api
```

### Step 2: Frontend Setup

#### 2.1 Add Required Dependencies

Your frontend needs axios for API calls:

```bash
# From main project root
pnpm add axios
```

#### 2.2 Configure Environment Variables

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:3001/api
```

#### 2.3 Update BlogPage.jsx

The BlogPage has been updated to fetch data from the backend API instead of hardcoded data.

### Step 3: Test the Integration

#### 3.1 Test Backend API

Open another terminal and test the API:

```bash
curl http://localhost:3001/health
```

Should return:
```json
{
  "success": true,
  "message": "Blog CMS API is running",
  "timestamp": "..."
}
```

#### 3.2 Test Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@tembeakenya.com\",\"password\":\"admin123\"}"
```

Should return a JWT token.

#### 3.3 Start Frontend

```bash
# From project root
pnpm run dev
```

Navigate to the Blog page at `http://localhost:5173/blog`

## 📁 Project Structure

```
Tourism/
├── cms-backend/           # NEW: Backend API
│   ├── db/               # Database layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Auth middleware
│   ├── uploads/          # Uploaded files
│   └── index.js          # Express server
├── src/
│   ├── pages/
│   │   └── BlogPage.jsx  # Updated to use API
│   └── ...
└── package.json
```

## 🔑 API Endpoints Summary

### Public Endpoints (No Auth)

- `GET /api/posts` - Get published posts
- `GET /api/posts/:slug` - Get single post
- `GET /api/posts/tags/all` - Get all tags

### Protected Endpoints (Requires JWT)

- `POST /api/auth/login` - Login
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/media/upload` - Upload file

## 🔒 Authentication Flow

1. **Login**: Send credentials to `/api/auth/login`
2. **Receive Token**: Get JWT token in response
3. **Store Token**: Save in localStorage or state
4. **Use Token**: Include in Authorization header: `Bearer <token>`
5. **Access Protected Routes**: Token validated by middleware

## 📝 Creating Your First Post

### Option 1: Using cURL

```bash
# First, get token from login
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "body": "<p>This is the content with HTML support!</p>",
    "excerpt": "A brief description",
    "status": "published",
    "tag_ids": [1, 2]
  }'
```

### Option 2: Using the Admin UI (Coming Next)

You can build an admin interface at `/admin` route for easier content management.

## 🛠️ Troubleshooting

### Database Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: Start PostgreSQL service
- Windows: Open Services → PostgreSQL → Start
- Mac: `brew services start postgresql`
- Linux: `sudo systemctl start postgresql`

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution**: Change PORT in `.env` or kill the process using port 3001

### CORS Error

```
Access to fetch at 'http://localhost:3001' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: 
- Verify FRONTEND_URL in backend `.env` matches your frontend
- Ensure backend server is running

### Module Not Found

```
Error: Cannot find module 'express'
```

**Solution**: Run `pnpm install` in the cms-backend directory

## 📊 Database Access

### View Data Directly

```bash
psql -U postgres -d blog_cms
```

Useful queries:
```sql
-- List all posts
SELECT id, title, status, published_at FROM posts ORDER BY created_at DESC;

-- List all users
SELECT id, email, role FROM users;

-- List all tags
SELECT * FROM tags;
```

## 🎨 Next Steps

### Immediate Enhancements

1. ✅ **DONE**: Backend API setup
2. ✅ **DONE**: Database integration
3. ✅ **DONE**: BlogPage connects to API
4. 🔄 **TODO**: Create Admin Dashboard for managing posts
5. 🔄 **TODO**: Add rich text editor (Tiptap/Quill)
6. 🔄 **TODO**: Image upload in admin UI
7. 🔄 **TODO**: Add categories alongside tags
8. 🔄 **TODO**: Implement search functionality

### Admin Dashboard Features

- Post editor with WYSIWYG
- Media library
- Draft management
- Scheduled publishing
- SEO meta tags
- Analytics

## 🌐 Production Deployment

### Backend (Railway/Render/Heroku)

1. Set environment variables
2. Connect PostgreSQL addon
3. Run `npm run db:init`
4. Deploy

### Frontend (Vercel/Netlify)

1. Set `VITE_API_URL` to production API URL
2. Build and deploy

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)
- [node-postgres](https://node-postgres.com/)

## 🆘 Need Help?

Check the detailed README in `cms-backend/README.md` for more information.

---

**Happy Blogging! 🎉**
