# Switch to Vercel Blob for PDF Storage

## Problem
Cloudinary marks new accounts as "untrusted" and blocks raw file (PDF) delivery.

## Solution
Use Vercel Blob for PDFs, keep Cloudinary for images (avatars/covers).

## Setup Steps

### 1. Install Vercel Blob SDK (Frontend)
```bash
cd client
npm install @vercel/blob
```

### 2. Create Vercel Blob Store
1. Go to https://vercel.com/dashboard
2. Select your project → Storage → Create Database
3. Choose **Blob** → Create
4. Copy the `BLOB_READ_WRITE_TOKEN`

### 3. Add to Vercel Environment Variables (Frontend)
- Go to your frontend Vercel project → Settings → Environment Variables
- Add: `VITE_BLOB_READ_WRITE_TOKEN` = (your token)

### 4. Update Frontend Code
The code will be updated to:
- Upload PDFs to Vercel Blob
- Upload images (avatars/covers) to Cloudinary
- Store blob URLs in database

## Benefits
- No "untrusted" account issues
- Direct integration with Vercel
- Free tier: 500GB bandwidth/month
- Public URLs work immediately
