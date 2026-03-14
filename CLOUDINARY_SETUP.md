# Cloudinary Upload Preset Configuration

## Problem
- PDF files getting 401 Unauthorized error
- PDFs uploaded as images instead of raw files

## Solution: Create TWO Upload Presets

### Preset 1: For Images (avatars and covers)

1. Go to Cloudinary Console: https://cloudinary.com/console
2. Navigate to **Settings** → **Upload** → **Upload presets**
3. Click **Add upload preset**
4. Configure:

   **Name:** `libronet_uploads`
   **Signing Mode:** Unsigned
   **Folder:** Leave empty
   **Use filename:** No
   **Unique filename:** Yes
   **Overwrite:** No
   **Resource type:** Image
   **Access mode:** Public

5. Click **Save**

### Preset 2: For PDFs (books)

1. Click **Add upload preset** again
2. Configure:

   **Name:** `libronet_raw_uploads`
   **Signing Mode:** Unsigned
   **Folder:** Leave empty
   **Use filename:** No
   **Unique filename:** Yes
   **Overwrite:** No
   **Resource type:** Raw
   **Access mode:** Public

3. Click **Save**

## Update Frontend Environment Variables

Add to `client/.env`:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=libronet_uploads
VITE_CLOUDINARY_RAW_PRESET=libronet_raw_uploads
```

## Test After Changes

1. Commit and push:
   ```bash
   git add .
   git commit -m "Use raw resource type for PDF uploads"
   git push
   ```

2. Upload a new book
3. Check URL should be: `https://res.cloudinary.com/.../raw/upload/...` (not image/upload)
4. PDF should load without 401 error
