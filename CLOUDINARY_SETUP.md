# Cloudinary Upload Preset Configuration

## Problem
- Files not getting renamed with unique names
- PDF viewer not loading files

## Solution: Update Cloudinary Upload Preset

### Steps:

1. Go to Cloudinary Console: https://cloudinary.com/console
2. Navigate to **Settings** → **Upload** → **Upload presets**
3. Find your preset `libronet_uploads` and click **Edit**
4. Configure these settings:

   **General:**
   - Signing Mode: **Unsigned**
   - Folder: Leave empty (we set it in code)
   - Use filename: **No** (uncheck)
   - Unique filename: **Yes** (check this)
   - Overwrite: **No** (uncheck)

   **Access Control:**
   - Delivery type: **Upload**
   - Access mode: **Public**

5. Click **Save**

## Test After Changes

1. Commit and push frontend changes:
   ```bash
   cd client
   git add .
   git commit -m "Add debug logging and fix Cloudinary upload"
   git push
   ```

2. Upload a new book
3. Check browser console for:
   - "Cloudinary upload success: [URL]"
   - "File URL for PDF: [URL]"
   - Any PDF load errors

4. Check Cloudinary dashboard to verify:
   - Files are in `libronet/` folder
   - Files have unique names like `libronet_book_1234567890_abc123`

## If PDF Still Doesn't Load

The issue might be CORS. Add this to your Cloudinary settings:
1. Settings → Security → Allowed fetch domains
2. Add: `*.vercel.app` and your frontend domain
