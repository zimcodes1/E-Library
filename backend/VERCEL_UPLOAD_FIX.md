# Fix for Book Upload on Vercel

## Problem
Vercel's serverless environment has a **read-only filesystem**, so file uploads to `/media/` fail with 500 errors.

## Solution
Use **Cloudinary** for cloud-based file storage.

## Setup Steps

### 1. Create Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account
3. After login, go to Dashboard
4. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

### 2. Add Environment Variables to Vercel
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these three variables:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

### 3. Deploy
1. Commit and push changes:
   ```bash
   git add .
   git commit -m "Add Cloudinary for file uploads"
   git push
   ```
2. Vercel will auto-deploy
3. Or manually redeploy from Vercel dashboard

### 4. Test
- Try uploading a book from your frontend
- Files will now be stored on Cloudinary instead of local filesystem

## What Changed
- Added `cloudinary` and `django-cloudinary-storage` to requirements.txt
- Configured Cloudinary in settings.py
- Files automatically upload to Cloudinary when environment variables are set
- Local development still uses `/media/` folder (no Cloudinary needed locally)

## Verification
After deployment, check:
1. Upload a book from frontend
2. Check Cloudinary dashboard → Media Library
3. Uploaded files should appear there
