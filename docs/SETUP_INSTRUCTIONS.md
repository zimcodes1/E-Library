# Final Setup Steps

## 1. Update Frontend .env File

Edit `client/.env` and replace with your actual Cloudinary credentials:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=libronet_uploads
```

Get these from: https://cloudinary.com/console

## 2. Add Environment Variables to Vercel (Backend)

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these 3 variables:
- `CLOUDINARY_CLOUD_NAME` = your_cloud_name
- `CLOUDINARY_API_KEY` = your_api_key  
- `CLOUDINARY_API_SECRET` = your_api_secret

## 3. Deploy Backend

```bash
cd backend
git add .
git commit -m "Convert to URL-based uploads for Vercel"
git push
```

Wait for Vercel to deploy (1-2 minutes)

## 4. Deploy Frontend

```bash
cd client
git add .
git commit -m "Upload files to Cloudinary before backend"
git push
```

Or if using Vercel for frontend, it will auto-deploy.

## 5. Test

1. Go to your frontend URL
2. Try uploading a book
3. Try changing your avatar
4. Both should work now!

## What Changed

### Backend:
- Changed `cover_image` and `file` fields from FileField to URLField
- Now accepts URLs instead of files
- Fixed CORS settings

### Frontend:
- Files upload to Cloudinary first
- Only URLs sent to backend
- Bypasses Vercel's 4.5MB limit

## Troubleshooting

If upload still fails:
1. Check browser console for errors
2. Verify Cloudinary credentials in both .env files
3. Make sure upload preset is "unsigned" in Cloudinary
4. Check Vercel logs for backend errors
