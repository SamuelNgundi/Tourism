# 🚨 Prerequisites Installation Guide

Before you can run the Blog CMS, you need to install these prerequisites:

## 1. PostgreSQL Database (REQUIRED)

### What is PostgreSQL?
PostgreSQL is a powerful, open-source relational database system that will store all your blog posts, users, tags, and media files.

### Installation Steps

#### Windows:

1. **Download PostgreSQL**
   - Visit: https://www.postgresql.org/download/windows/
   - Download the installer (version 12 or higher)
   - Recommended: Use the EnterpriseDB installer

2. **Run Installer**
   - Double-click the downloaded `.exe` file
   - Keep default installation directory
   - **Important**: Remember the password you set for the `postgres` user!

3. **Installation Options**
   - Components: Select all (PostgreSQL Server, pgAdmin, Command Line Tools)
   - Data Directory: Keep default
   - Port: `5432` (default)
   - Locale: Default

4. **Set Password**
   - You'll be prompted to set a password for the `postgres` superuser
   - **Use a strong password and remember it!**
   - Update this in `cms-backend/.env` as `DB_PASSWORD`

5. **Verify Installation**
   ```powershell
   # Check if PostgreSQL service is running
   Get-Service postgresql*
   
   # Should show status as "Running"
   ```

#### Alternative: Use Docker (Advanced)

If you prefer Docker:

```bash
docker run --name blog-cms-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=blog_cms \
  -p 5432:5432 \
  -d postgres:15
```

Then update `cms-backend/.env`:
```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_cms
DB_PORT=5432
```

### After Installing PostgreSQL

1. **Update Backend Configuration**
   
   Edit `cms-backend/.env`:
   ```env
   DB_USER=postgres              # Your PostgreSQL username
   DB_PASSWORD=your_password     # The password you set during installation
   DB_NAME=blog_cms             # Database name (will be created automatically)
   DB_HOST=localhost
   DB_PORT=5432
   ```

2. **Initialize Database**
   ```bash
   cd cms-backend
   npm run db:init
   ```

   This creates:
   - The `blog_cms` database
   - All required tables
   - Default admin user
   - Sample tags

---

## 2. Node.js 18+ (Already Installed ✓)

You already have Node.js installed since you're using pnpm and Vite.

**Verify Version:**
```bash
node --version
```

Should be v18 or higher. If not, download from: https://nodejs.org/

---

## 3. Verify All Prerequisites

Run this check:

```powershell
# Check Node.js
Write-Host "Node.js version:" (node --version)

# Check pnpm
Write-Host "pnpm version:" (pnpm --version)

# Check PostgreSQL
$pg = Get-Service postgresql* -ErrorAction SilentlyContinue
if ($pg) {
    Write-Host "PostgreSQL Status:" $pg.Status -ForegroundColor Green
} else {
    Write-Host "PostgreSQL: NOT INSTALLED" -ForegroundColor Red
    Write-Host "Please install PostgreSQL first!" -ForegroundColor Yellow
    Write-Host "Download: https://www.postgresql.org/download/" -ForegroundColor Cyan
}
```

---

## Quick Start After Prerequisites

Once PostgreSQL is installed and running:

```powershell
# Run the automated setup
.\START.ps1
```

Or manually:

```bash
# 1. Install backend dependencies
cd cms-backend
pnpm install

# 2. Initialize database (creates tables and default data)
npm run db:init

# 3. Start backend server
npm run dev

# 4. In another terminal, start frontend
cd ..
pnpm run dev
```

---

## Troubleshooting PostgreSQL

### Issue: Service Not Found

**Error**: `postgresql* service not found`

**Solution**: 
- PostgreSQL may not be installed as a Windows service
- Re-run the installer and select "Install as Service"
- Or use Docker alternative above

### Issue: Connection Refused

**Error**: `connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```powershell
# Start PostgreSQL service
Start-Service postgresql*

# Or restart it
Restart-Service postgresql*
```

### Issue: Authentication Failed

**Error**: `password authentication failed`

**Solution**:
- Check the password in `cms-backend/.env`
- Make sure it matches what you set during PostgreSQL installation
- Default on some installations: `postgres`

### Issue: Port Already in Use

**Error**: `port 5432 already in use`

**Solution**:
- Another PostgreSQL instance may be running
- Check: `netstat -ano | findstr :5432`
- Stop conflicting service or use different port in `.env`

---

## Testing Without PostgreSQL (Development Only)

If you want to test the frontend without setting up the database:

1. The BlogPage has fallback demo data
2. It will load hardcoded posts if API is unavailable
3. You can still see the UI and test navigation

**Note**: You won't be able to:
- Create/edit/delete posts
- Upload images
- Authenticate users
- Test the admin features

---

## Next Steps After Installing PostgreSQL

1. ✅ Install PostgreSQL
2. ✅ Update `cms-backend/.env` with correct credentials
3. ✅ Run `npm run db:init` in cms-backend folder
4. ✅ Run `.\START.ps1` or start servers manually
5. ✅ Navigate to http://localhost:5173/blog
6. ✅ Test the system with `.\TEST_API.ps1`

---

## Need Help?

If you encounter issues:

1. Check PostgreSQL logs: Usually in `C:\Program Files\PostgreSQL\<version>\data\log`
2. Verify service status: `Get-Service postgresql*`
3. Test connection: `psql -U postgres -h localhost`
4. Review error messages carefully

---

**Ready to build your blog CMS?** Install PostgreSQL first, then follow the SETUP_GUIDE.md! 🚀
