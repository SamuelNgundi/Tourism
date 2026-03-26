# Blog CMS Test Script
# Tests all major API endpoints

$baseUrl = "http://localhost:3001/api"

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "  Blog CMS API Testing" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "📊 Test 1: Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/../health" -Method Get
    Write-Host "✅ Health check passed: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health check failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: Get Posts (Public)
Write-Host "📊 Test 2: Get Published Posts (Public)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/posts?page=1&limit=5" -Method Get
    Write-Host "✅ Retrieved posts successfully" -ForegroundColor Green
    Write-Host "   Total posts in response: $($response.data.posts.Count)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed to get posts: $_" -ForegroundColor Red
    Write-Host "   Note: This is expected if database is empty or backend not running" -ForegroundColor Gray
}

Write-Host ""

# Test 3: Login
Write-Host "📊 Test 3: Admin Login" -ForegroundColor Yellow
try {
    $body = @{
        email = "admin@tembeakenya.com"
        password = "admin123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $body -ContentType "application/json"
    $token = $response.data.token
    Write-Host "✅ Login successful" -ForegroundColor Green
    Write-Host "   Token received: $(if($token){'Yes'}else{'No'})" -ForegroundColor Gray
} catch {
    Write-Host "❌ Login failed: $_" -ForegroundColor Red
    Write-Host "   Make sure database is initialized and admin user exists" -ForegroundColor Gray
    $token = $null
}

Write-Host ""

# Test 4: Create Post (if logged in)
if ($token) {
    Write-Host "📊 Test 4: Create New Post (Authenticated)" -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }

        $postBody = @{
            title = "Test Post from PowerShell Script"
            body = "<p>This is a test post created via API testing.</p>"
            excerpt = "A test post to verify the API works correctly"
            status = "draft"
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "$baseUrl/posts" -Method Post -Body $postBody -ContentType "application/json" -Headers $headers
        Write-Host "✅ Post created successfully" -ForegroundColor Green
        Write-Host "   Post ID: $($response.data.id)" -ForegroundColor Gray
        Write-Host "   Post Title: $($response.data.title)" -ForegroundColor Gray
    } catch {
        Write-Host "❌ Failed to create post: $_" -ForegroundColor Red
    }
} else {
    Write-Host "⏭️  Skipping create post test (no token)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  Testing Complete!" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Notes:" -ForegroundColor Yellow
Write-Host "- If tests failed, ensure:" -ForegroundColor Gray
Write-Host "  1. PostgreSQL is running" -ForegroundColor Gray
Write-Host "  2. Backend server is running (npm run dev)" -ForegroundColor Gray
Write-Host "  3. Database is initialized (npm run db:init)" -ForegroundColor Gray
Write-Host ""
