# How to Download This Project

## Method 1: Copy Files Manually (Recommended)

1. **Create a new folder** on your computer called `tourism-ambassadors-kenya`

2. **Copy each file** from the webcontainer to your local machine:
   - Right-click and "Save As" or copy the content from each file
   - Maintain the exact folder structure shown in the file explorer

3. **Required folder structure:**
   ```
   tourism-ambassadors-kenya/
   ├── package.json
   ├── vite.config.js
   ├── tailwind.config.js
   ├── postcss.config.js
   ├── vercel.json
   ├── index.html
   ├── README.md
   ├── biela/
   │   └── config.json
   └── src/
       ├── main.jsx
       ├── App.jsx
       ├── index.css
       ├── components/
       │   ├── Header.jsx
       │   ├── Footer.jsx
       │   ├── HeroSection.jsx
       │   ├── StorySection.jsx
       │   ├── BookingSection.jsx
       │   ├── AdventureSection.jsx
       │   ├── ActivitiesSection.jsx
       │   ├── AmenitiesSection.jsx
       │   ├── SerenitySection.jsx
       │   ├── TestimonialsSection.jsx
       │   └── PartnersSection.jsx
       └── pages/
           ├── HomePage.jsx
           ├── ToursPage.jsx
           ├── EngagementsPage.jsx
           ├── EventsPage.jsx
           ├── InfoPage.jsx
           ├── CompetitionPage.jsx
           └── BlogPage.jsx
   ```

## Method 2: If Git is Available

If you have access to Git commands in your environment:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Tourism Ambassadors Kenya website"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/tourism-ambassadors-kenya.git

# Push to remote
git push -u origin main
```

## Method 3: Use Download Feature

If your development environment has a download feature:
- Look for "Download" or "Export" buttons in your interface
- Download as ZIP file
- Extract to your desired location

## After Downloading

1. **Install dependencies:**
   ```bash
   cd tourism-ambassadors-kenya
   npm install
   # or
   pnpm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment Options

- **Vercel**: Connect your GitHub repo to Vercel for automatic deployment
- **Netlify**: Drag and drop the build folder or connect repository
- **GitHub Pages**: Push to GitHub and enable Pages in repository settings
- **Local hosting**: Use the build output with any web server

## Important Files

- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Styling configuration
- `vite.config.js` - Build tool configuration
- `vercel.json` - Deployment routing configuration
- `src/` folder - All React components and pages

The website is fully functional and production-ready!
