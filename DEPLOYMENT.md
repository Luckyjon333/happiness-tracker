# Deployment Guide

## GitHub Setup

1. **Verify Git Ignore Configuration**:
   The project includes a comprehensive `.gitignore` file that excludes:
   - `node_modules/` (dependencies)
   - `dist/` (build output)
   - `.env*` (environment variables)
   - `.vercel/` (Vercel deployment files)
   - IDE files and system files

2. **Initialize Git Repository**:
```bash
git init
git add .
git commit -m "Initial commit: Daily Happiness Tracker"
```

   **Note**: The `.gitignore` will automatically exclude build files and dependencies from being committed.

3. **Create GitHub Repository** (via GitHub website):
   - Go to [github.com/new](https://github.com/new)
   - Repository name: "happiness-tracker" or your preferred name
   - Description: "A minimal happiness tracking app for daily reflection"
   - Make it **Public** (recommended for Vercel free tier)
   - Don't initialize with README (we already have one)
   - Don't add .gitignore (we already have one)

4. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/happiness-tracker.git
git branch -M main
git push -u origin main
```

   **What gets uploaded**: Only source code, documentation, and configuration files. Build artifacts and dependencies are excluded by `.gitignore`.

## Vercel Deployment

### Option 1: Via Vercel Dashboard (Recommended)

1. **Connect GitHub**: 
   - Go to [vercel.com](https://vercel.com)
   - Sign up/in with your GitHub account
   - Click "New Project"
   - Import your happiness-tracker repository

2. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - You'll get a live URL like `happiness-tracker.vercel.app`

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Confirm settings
# - Deploy
```

## Git Repository Verification

Before pushing to GitHub, you can verify what files will be committed:

```bash
# Check current git status
git status

# See what files are tracked (should exclude build files and node_modules)
git ls-files

# Verify repository size (should be under 10MB)
du -sh .git
```

**Expected files in repository**:
- Source code (`client/`, `server/`, `shared/`)
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Documentation files (`README.md`, `DEPLOYMENT.md`, etc.)
- `.gitignore` (ensuring future exclusions)

**Files automatically excluded by .gitignore**:
- `node_modules/` (dependencies)
- `dist/` (build output)
- `.env*` (environment files)
- `.vercel/` (deployment artifacts)
- IDE and system files

## Build Process

The project uses these build steps:

1. **Frontend Build**: 
   - Vite builds the React app to `dist/public`
   - Includes bundling, minification, and asset optimization

2. **Backend Build**:
   - esbuild bundles the Express server to `dist/index.js`
   - Includes all dependencies and TypeScript compilation

3. **Static File Serving**:
   - Built frontend is served as static files
   - API routes are handled by the Express server

## Environment Variables

Currently, the app uses local storage and doesn't require environment variables. If you add database integration later, you'll need to set:

- `DATABASE_URL` (for PostgreSQL)
- Any API keys for external services

## Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Failures
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation passes (`npm run check`)
- Verify build command works locally (`npm run build`)

### Runtime Errors
- Check Vercel function logs in dashboard
- Ensure serverless function size is under limits
- Verify static files are being served correctly

### Performance
- Vercel automatically handles CDN and caching
- Static assets are optimized during build
- Consider enabling analytics in Vercel dashboard

## Development vs Production

- **Development**: Uses `npm run dev` with hot reloading
- **Production**: Uses built files with `npm run start`
- **Local Storage**: Works the same in both environments
- **API Routes**: Handled by Express server in both cases