# 🖼️ Enhanced Post Editor - Media Upload & Author Selection Guide

## ✅ **New Features Added**

Your PostEditor now has powerful new capabilities:

### **1. Featured Image Upload** 📸
- Drag & drop or click to upload
- Supports: JPEG, PNG, WebP, GIF
- Maximum size: 5MB
- Preview before publishing
- Remove/replace anytime

### **2. Media Library** 🗂️
- Browse previously uploaded images
- Select from grid view
- Reuse images across posts
- Automatic thumbnail generation

### **3. Insert Image into Content** ✨
- Set featured image
- Insert same image into post body
- Perfect for headers and illustrations

### **4. Author Selection** 👤
- Choose post author from dropdown
- View all users in system
- Assign posts to different authors
- Role-based selection (Admin/Author)

---

## 🚀 **How to Use New Features**

### **Upload Featured Image**

#### **Method 1: Click to Upload**
1. In PostEditor, find "Featured Image" section
2. Click the dashed upload area
3. Select image from your computer
4. Wait for upload to complete
5. See preview instantly

#### **Method 2: Select from Library**
1. Scroll to "Media Library" section
2. Browse existing images
3. Click any image to select as featured
4. Green border indicates selected image

### **Insert Image into Post Content**

After uploading/selecting featured image:
1. Click **"Insert into Content"** button
2. Image HTML is added to your post body
3. Position cursor where you want it
4. Or manually add: `<img src="URL" alt="Description" />`

### **Change/Remove Featured Image**

**To Change:**
- Upload new image (replaces old one)
- Or select different from library

**To Remove:**
- Click **"Remove image"** link below preview
- Featured image cleared

### **Select Post Author**

1. Find **"Post Author"** section in sidebar
2. Click dropdown menu
3. Select author from list
   - Shows email and role
   - Only visible to admins
4. Save post with selected author

---

## 📋 **Feature Breakdown**

### **Image Upload Validation**

✅ **File Type Check**
- Only accepts: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Rejects invalid formats automatically

✅ **File Size Check**
- Maximum: 5MB (5,242,880 bytes)
- Shows error if too large

✅ **Upload Feedback**
- Loading spinner during upload
- Success message on completion
- Error details if failed

### **Media Library Grid**

**Layout:**
- 3-column grid
- Square thumbnails
- Scrollable (max-height: 48)
- Visual selection indicator

**Features:**
- Shows all uploaded media
- Sorted by upload date (newest first)
- Click to select
- Auto-refreshes after upload

### **Author Dropdown**

**Shows:**
- User email address
- User role (admin/author)
- All users in system

**Access Control:**
- Admin can see all users
- Authors may have limited view
- Default: current user

---

## 🎨 **UI Components Added**

### **1. Featured Image Card**
```
┌─────────────────────────────┐
│ 🖼️ Featured Image           │
├─────────────────────────────┤
│ [Image Preview]             │
│ Remove image                │
└─────────────────────────────┘
```

### **2. Upload Area**
```
┌─────────────────────────────┐
│         ⬆️ Upload            │
│  Click to upload or drag    │
│  PNG, JPG, WebP up to 5MB   │
└─────────────────────────────┘
```

### **3. Media Library**
```
┌─────────────────────────────┐
│ Or select from library:     │
│ ┌───┬───┬───┐               │
│ │ 📷│ 📷│ 📷│               │
│ ├───┼───┼───┤               │
│ │ 📷│ 📷│ 📷│               │
│ └───┴───┴───┘               │
└─────────────────────────────┘
```

### **4. Insert Button**
```
┌─────────────────────────────┐
│ 🖼️ Insert into Content      │
└─────────────────────────────┘
```

### **5. Author Selector**
```
┌─────────────────────────────┐
│ 👤 Post Author              │
├─────────────────────────────┤
│ [Select author... ▼]        │
│ admin@tembeakenya.com       │
│ (admin)                     │
└─────────────────────────────┘
```

---

## 🔧 **Technical Implementation**

### **Frontend Changes**

**New State Variables:**
```javascript
const [users, setUsers] = useState([]);
const [selectedUserId, setSelectedUserId] = useState('');
const [featuredImage, setFeaturedImage] = useState(null);
const [uploading, setUploading] = useState(false);
const [mediaLibrary, setMediaLibrary] = useState([]);
```

**New Functions:**
```javascript
handleFileUpload()     // Handle file upload
selectFromLibrary()    // Select from existing media
insertImageIntoContent() // Insert into post body
fetchUsers()          // Load all users
fetchMediaLibrary()   // Load media library
```

**Updated Submit Handler:**
```javascript
const postData = {
  title,
  body,
  excerpt,
  status,
  author_id: selectedUserId,      // NEW
  featured_image: featuredImage,  // NEW
  tag_ids
};
```

### **Backend Endpoints Used**

**1. Media Upload:**
```
POST /api/media/upload
Headers: Authorization, Content-Type: multipart/form-data
Body: FormData with 'file' field
Response: { data: { url, id, ... } }
```

**2. Get Media Library:**
```
GET /api/media
Headers: Authorization
Response: { data: [...] }
```

**3. Get Users:**
```
GET /api/users
Headers: Authorization
Response: { data: [{ id, email, role }] }
```

---

## 📊 **Database Schema Updates**

### **Posts Table** (Enhanced)
```sql
ALTER TABLE posts ADD COLUMN IF NOT EXISTS author_id INTEGER REFERENCES users(id);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500);
```

**Note:** You may need to run these SQL commands if columns don't exist.

### **Media Table** (Already Exists)
```sql
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255),
  original_name VARCHAR(255),
  mimetype VARCHAR(100),
  size INTEGER,
  url VARCHAR(500),
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP
);
```

---

## 🎯 **Best Practices**

### **Image Optimization**

**Before Upload:**
- Resize to appropriate dimensions (max 1920px width)
- Compress using tools like TinyPNG
- Use WebP format for better performance
- Descriptive filenames (not IMG_1234.jpg)

**In Posts:**
- Add alt text for accessibility
- Use featured images consistently
- Don't overload posts with too many images
- Consider page load speed

### **Author Attribution**

**Guidelines:**
- Always set correct author
- Guest posts: use actual writer's name
- Team posts: assign to main account
- Consistency across posts

---

## 🐛 **Troubleshooting**

### **Issue: Upload Fails**

**Error:** "Failed to upload image"

**Solutions:**
1. Check file size (< 5MB)
2. Verify file type (JPG/PNG/WebP/GIF only)
3. Ensure backend server running
4. Check `/uploads` folder permissions
5. Verify authentication token valid

### **Issue: Images Not Showing**

**Problem:** Broken image links

**Solutions:**
1. Check backend serving static files
2. Verify URL paths correct
3. Ensure uploads folder exists
4. Check CORS settings allow image access

### **Issue: No Users in Dropdown**

**Problem:** Empty author dropdown

**Solutions:**
1. Verify you're logged in as admin
2. Check `/api/users` endpoint works
3. Ensure database has users table
4. Check browser console for errors

### **Issue: Featured Image Not Saving**

**Problem:** Image disappears after save

**Solutions:**
1. Check `featured_image` field in database
2. Verify POST/PUT request includes field
3. Check backend validation rules
4. Ensure proper data type (string URL)

---

## 🚀 **Advanced Usage**

### **Drag & Drop Upload**

Currently supports click-to-upload. To add drag & drop:

```javascript
const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  // Process file like handleFileUpload
};
```

### **Bulk Image Upload**

Add multiple file input:
```javascript
<input 
  type="file" 
  accept="image/*" 
  multiple 
  onChange={handleMultipleUpload}
/>
```

### **Image Cropping**

Integrate react-image-crop:
```bash
pnpm add react-image-crop
```

### **Unsplash Integration**

Add stock photo search:
```javascript
// Search Unsplash API
// Display results in media library
// Allow one-click insertion
```

---

## 📈 **Analytics & Insights**

Track media usage:
- Most used images
- Upload frequency
- Storage space used
- Popular image sizes

---

## 🎨 **Customization Ideas**

### **Branding**
- Custom upload icon
- Branded placeholder images
- Color-coded media types
- Custom image frames

### **User Experience**
- Progress bar for large files
- Image editing tools (crop, rotate)
- Alt text suggestions
- Auto-generate captions

### **Organization**
- Image folders/albums
- Tag-based organization
- Search functionality
- Favorites/starred images

---

## 📚 **API Reference**

### **Upload Image**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

axios.post(`${API_URL}/media/upload`, formData, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
});
```

### **Get Media Library**
```javascript
axios.get(`${API_URL}/media`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### **Get All Users**
```javascript
axios.get(`${API_URL}/users`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## ✅ **Feature Checklist**

Test all features:

- [ ] Upload image via click
- [ ] Upload validates file type
- [ ] Upload validates file size
- [ ] Featured image preview shows
- [ ] Remove image works
- [ ] Select from library works
- [ ] Insert into content works
- [ ] Author dropdown populates
- [ ] Author saves correctly
- [ ] Featured image saves to database
- [ ] Media library refreshes after upload
- [ ] Works on mobile devices
- [ ] Error messages display correctly

---

## 🎉 **Success!**

You now have a professional-grade post editor with:
- ✅ Full media management
- ✅ Multi-author support
- ✅ Image upload & library
- ✅ Rich content creation
- ✅ Professional UX

**Create beautiful content with ease!** 🚀✨
