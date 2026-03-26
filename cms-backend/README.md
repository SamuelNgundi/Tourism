# Blog CMS Backend

Traditional blog CMS backend with Node.js, Express, PostgreSQL, and JWT authentication.

## 📁 Project Structure

```
cms-backend/
├── db/
│   ├── index.js          # Database connection pool
│   ├── queries.js        # SQL queries for posts
│   ├── schema.sql        # Database schema
│   └── init.js           # Database initialization script
├── routes/
│   ├── authRoutes.js     # Authentication endpoints
│   ├── postRoutes.js     # Posts CRUD endpoints
│   └── mediaRoutes.js    # Media upload endpoints
├── services/
│   ├── authService.js    # Authentication business logic
│   └── postService.js    # Posts business logic
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── uploads/              # Uploaded files (auto-created)
├── index.js              # Express server entry point
├── package.json
└── .env
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- pnpm or npm installed

### 1. Install Dependencies

```bash
cd cms-backend
pnpm install
# or
npm install
```

### 2. Configure Environment Variables

The `.env` file is already configured with defaults. Update if needed:

```env
PORT=3001
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_cms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:5173
```

### 3. Initialize Database

```bash
# Create database and tables
npm run db:init
```

This will:
- Create the `blog_cms` database
- Create tables: users, posts, tags, post_tags, media
- Insert default admin user (email: `admin@tembeakenya.com`, password: `admin123`)
- Insert sample tags

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/register` | Register new user | Yes (Admin) |
| GET | `/api/auth/profile` | Get current user profile | Yes |

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get published posts | No |
| GET | `/api/posts/:slug` | Get single post by slug | No |
| GET | `/api/posts/tags/all` | Get all tags | No |
| GET | `/api/posts/admin/all` | Get all posts (including drafts) | Yes |
| POST | `/api/posts` | Create new post | Yes |
| PUT | `/api/posts/:id` | Update post | Yes |
| DELETE | `/api/posts/:id` | Delete post | Yes (Admin) |

### Media

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/media/upload` | Upload file | Yes |
| GET | `/api/media` | Get all media files | Yes |

## 📝 Usage Examples

### Login

```javascript
const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@tembeakenya.com',
    password: 'admin123'
  })
});

const data = await response.json();
// Save token: data.data.token
```

### Get Published Posts

```javascript
const response = await fetch('http://localhost:3001/api/posts?page=1&limit=10');
const data = await response.json();
```

### Create Post (Authenticated)

```javascript
const response = await fetch('http://localhost:3001/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    title: 'My First Blog Post',
    body: '<p>Post content with HTML...</p>',
    excerpt: 'Short description of the post',
    status: 'published', // draft | published | archived
    tag_ids: [1, 2, 3] // Optional tag IDs
  })
});
```

### Upload Media (Authenticated)

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:3001/api/media/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: formData
});
```

## 🗄️ Database Schema

### Users Table
- `id` - Serial primary key
- `email` - Unique email
- `hashed_password` - Bcrypt hashed password
- `role` - admin | author
- `created_at`, `updated_at` - Timestamps

### Posts Table
- `id` - Serial primary key
- `title` - Post title
- `slug` - Unique URL-friendly slug
- `body` - Post content (HTML/text)
- `excerpt` - Short description
- `status` - draft | published | archived
- `author_id` - Foreign key to users
- `published_at` - Publication timestamp
- `created_at`, `updated_at` - Timestamps

### Tags Table
- `id` - Serial primary key
- `name` - Tag name
- `slug` - Unique slug
- `created_at` - Timestamp

### Post_Tags Table
- Junction table for many-to-many relationship
- `post_id`, `tag_id` - Composite primary key

### Media Table
- `id` - Serial primary key
- `filename`, `original_name`, `mimetype`, `size` - File metadata
- `url` - File URL
- `uploaded_by` - Foreign key to users
- `created_at` - Timestamp

## 🔒 Security Notes

1. **Change Default Admin Password**: Immediately after first login
2. **JWT Secret**: Use a strong, unique secret in production
3. **HTTPS**: Always use HTTPS in production
4. **Environment Variables**: Never commit `.env` to version control
5. **File Uploads**: Validate file types and sizes (already implemented)

## 🛠️ Development

### Using Nodemon

The dev script uses nodemon for auto-restart on file changes:

```bash
npm run dev
```

### Testing with cURL

**Health Check:**
```bash
curl http://localhost:3001/health
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tembeakenya.com","password":"admin123"}'
```

**Get Posts:**
```bash
curl http://localhost:3001/api/posts
```

## 📦 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure production database credentials
4. Set correct `FRONTEND_URL`
5. Consider using S3/Cloudinary for media storage
6. Enable HTTPS
7. Set up proper logging and monitoring

## 🆘 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running: `pg_ctl status`
- Check credentials in `.env`
- Verify database exists: `psql -U postgres -l`

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:3001 | xargs kill` (Unix)

### CORS Issues
- Verify `FRONTEND_URL` matches your frontend's origin
- Check browser console for specific CORS errors

## 📚 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: node-postgres (pg)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: multer
- **CORS**: cors middleware

## 🤝 Integration with Frontend

The backend is ready to integrate with your existing React + Vite frontend. See the frontend integration guide in the main README.
