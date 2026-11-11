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

`JWT_SECRET` is required; the server will not start without it. Optional: `UPLOADS_DIR`, `BASE_URL`, `TRUST_PROXY`, `LOGIN_RATE_LIMIT_MAX` (default 10), `PUBLIC_FORM_RATE_LIMIT_MAX` (default 20), `RATE_LIMIT_WINDOW_MS` (default 15 min).

### 3. Initialize Database

```bash
# Create database and tables
npm run db:init
```

This will:
- Create the `blog_cms` database
- Create or upgrade tables: users, posts, tags, post_tags, media, comments, inquiries, newsletter_subscribers, events (safe to re-run on an existing database)
- Insert default admin user (email: `admin@tembeakenya.com`, password: `admin123`)
- Insert sample tags

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3001`

## 🔌 API Endpoints

List endpoints accept `?page=` and `?limit=` and return a `pagination` object. Errors are always `{ "success": false, "error": "..." }`.

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Login (rate limited) | No |
| POST | `/api/auth/register` | Register a user | Admin |
| GET | `/api/auth/profile` | Current user | Yes |
| PUT | `/api/auth/password` | Change password (`current_password`, `new_password`); revokes old tokens and returns a new one | Yes |

### Posts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/posts?search=&tag=` | Published posts | No |
| GET | `/api/posts/:slug` | Published post by slug (increments `view_count`) | No |
| GET | `/api/posts/:slug/comments` | Approved comments | No |
| POST | `/api/posts/:slug/comments` | Submit a comment (`author_name`, `author_email`, `body`), held for moderation | No |
| GET | `/api/posts/admin/all?status=&search=&tag=&author_id=` | All posts incl. drafts (authors see only their own) | Yes |
| GET | `/api/posts/admin/:id` | Post for editing | Yes (owner or admin) |
| POST | `/api/posts` | Create post | Yes |
| PUT | `/api/posts/:id` | Update post (partial; tags only replaced when `tag_ids` is sent) | Yes (owner or admin) |
| DELETE | `/api/posts/:id` | Delete post | Admin |

### Tags

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tags` (or `/api/posts/tags/all`) | Tags with post counts | No |
| POST / PUT / DELETE | `/api/tags`, `/api/tags/:id` | Create, rename, delete | Admin |

### Comments (moderation)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/comments?status=&post_id=` | List comments | Admin |
| PATCH | `/api/comments/:id` | Set `status` (`pending`, `approved`, `rejected`) | Admin |
| DELETE | `/api/comments/:id` | Delete comment | Admin |

### Inquiries (contact, tour booking, club registration, ...)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/inquiries` | Submit a form: `type` (`contact`, `tour_booking`, `club_registration`, `membership`, `competition`, `general`), `name`, `email`, `phone`, `subject`, `message`, `details` (object) | No (rate limited) |
| GET | `/api/inquiries?status=&type=&search=` | Inbox | Admin |
| GET / PATCH / DELETE | `/api/inquiries/:id` | View, update `status`/`admin_notes`, delete | Admin |

### Newsletter

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/newsletter/subscribe` | Subscribe (`email`, `name`) | No (rate limited) |
| POST | `/api/newsletter/unsubscribe` | Unsubscribe with `token` | No |
| GET | `/api/newsletter/subscribers?status=` | Subscriber list | Admin |
| DELETE | `/api/newsletter/subscribers/:id` | Remove subscriber | Admin |

### Events

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/events?when=upcoming\|past\|all` | Published events | No |
| GET | `/api/events/:slug` | Published event | No |
| GET | `/api/events/admin/all?status=` | All events incl. drafts | Admin |
| POST / PUT / DELETE | `/api/events`, `/api/events/:id` | Create, update (partial), delete | Admin |

### Media

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/media/upload` | Upload file (field `file`, max 5 MB) | Yes |
| GET | `/api/media` | List media | Yes |
| DELETE | `/api/media/:id` | Delete media | Uploader or admin |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users`, `/api/users/:id` | List / view users | Admin |
| PATCH | `/api/users/:id` | Change `role` (not your own) | Admin |
| DELETE | `/api/users/:id` | Delete user (not yourself; their posts are kept) | Admin |

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

### Running Tests

Tests use Jest + Supertest against a real PostgreSQL database named `blog_cms_test` (override with `TEST_DB_NAME`; the name must end in `_test`). It is created and migrated automatically using the `DB_*` credentials from `.env`, and wiped between tests.

```bash
npm test
```

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
