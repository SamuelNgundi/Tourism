# Quick Start Script for Blog CMS
# This script helps you set up and run the complete Blog CMS

Write-Host "==============================================
" -ForegroundColor Cyan
Write-Host "  Blog CMS - Quick Start Setup" -ForegroundColor Cyan
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
try {
    $pgStatus = Get-Service -Name "postgresql*" -ErrorAction SilentlyContinue
    if ($pgStatus -and $pgStatus.Status -eq "Running") {
        Write-Host "✅ PostgreSQL is running" -ForegroundColor Green
    } elseif ($pgStatus) {
        Write-Host "⚠️  PostgreSQL is installed but not running. Starting..." -ForegroundColor Yellow
        Start-Service -Name "postgresql*"
        Write-Host "✅ PostgreSQL started" -ForegroundColor Green
    } else {
        Write-Host "❌ PostgreSQL service not found. Please install PostgreSQL first." -ForegroundColor Red
        Write-Host "Download from: https://www.postgresql.org/download/" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Error checking PostgreSQL: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host "  Step 1: Backend Setup" -ForegroundColor Cyan
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location -Path ".\cms-backend"

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
} else {
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host "  Step 2: Database Initialization" -ForegroundColor Cyan
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host ""

# Initialize database
Write-Host "Initializing database..." -ForegroundColor Yellow
npm run db:init
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Database initialization may have warnings (this is OK if tables exist)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Database initialized successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host "  Step 3: Starting Backend Server" -ForegroundColor Cyan
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host ""

# Start backend server in background
Write-Host "Starting backend server on http://localhost:3001..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"
Start-Sleep -Seconds 3
Write-Host "✅ Backend server starting..." -ForegroundColor Green

Write-Host ""
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host "  Step 4: Frontend Setup" -ForegroundColor Cyan
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host ""

# Go back to project root
Set-Location -Path ".."

# Check if axios is installed
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.dependencies.axios) {
    Write-Host "✅ Axios is installed" -ForegroundColor Green
} else {
    Write-Host "Installing axios..." -ForegroundColor Yellow
    pnpm add axios
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install axios" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Axios installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host "  Step 5: Starting Frontend" -ForegroundColor Cyan
Write-Host "=============================================="  -ForegroundColor Cyan
Write-Host ""

# Start frontend
Write-Host "Starting frontend on http://localhost:5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; pnpm run dev"
Start-Sleep -Seconds 2
Write-Host "✅ Frontend starting..." -ForegroundColor Green

Write-Host ""
Write-Host "=============================================="  -ForegroundColor Green
Write-Host "  🎉 Setup Complete!" -ForegroundColor Green
Write-Host "=============================================="  -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Default Admin Credentials:" -ForegroundColor Yellow
Write-Host "   Email: admin@tembeakenya.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: Change the default password immediately!" -ForegroundColor Red
Write-Host ""
Write-Host "📝 Test the API:" -ForegroundColor Cyan
Write-Host "   curl http://localhost:3001/health" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
