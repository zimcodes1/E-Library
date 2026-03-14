# Vercel File Upload Solution

## The Problem
Vercel serverless functions have a **4.5MB payload limit**. You cannot upload large files (books, images) through your API.

## The Solution
Upload files **directly from frontend to Cloudinary**, then send only the URL to your backend.

## Implementation Steps

### Backend Changes (Already Done)
- Cloudinary is configured
- Models support both file uploads and URLs

### Frontend Changes (You Need to Do This)

#### 1. Install Cloudinary SDK in your frontend:
```bash
cd client
npm install cloudinary-react
```

#### 2. Get Cloudinary Upload Preset:
1. Go to Cloudinary Console: https://cloudinary.com/console
2. Settings → Upload → Upload presets
3. Click "Add upload preset"
4. Set:
   - Preset name: `libronet_uploads`
   - Signing Mode: **Unsigned**
   - Folder: `libronet`
5. Save

#### 3. Update your frontend upload code:

**For Book Upload:**
```typescript
// Instead of sending file to your backend, upload to Cloudinary first
const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'libronet_uploads'); // Your preset name
  formData.append('cloud_name', 'YOUR_CLOUD_NAME'); // Your cloud name

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  const data = await response.json();
  return data.secure_url; // This is the URL you send to your backend
};

// Then in your book upload function:
const handleBookUpload = async (bookData) => {
  // Upload cover image to Cloudinary
  const coverUrl = await uploadToCloudinary(bookData.coverImage);
  
  // Upload PDF to Cloudinary
  const pdfUrl = await uploadToCloudinary(bookData.pdfFile);
  
  // Now send to your backend with URLs instead of files
  const response = await fetch('https://libronet-backend.vercel.app/api/books/', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      category: bookData.category,
      cover_image: coverUrl,  // URL instead of file
      file_url: pdfUrl,       // URL instead of file
      file_type: 'url',       // Important!
      publication_year: bookData.year,
      language: bookData.language,
    }),
  });
};
```

**For Avatar Upload:**
```typescript
const handleAvatarUpload = async (file: File) => {
  // Upload to Cloudinary first
  const avatarUrl = await uploadToCloudinary(file);
  
  // Send URL to backend
  const response = await fetch('https://libronet-backend.vercel.app/api/auth/profile/', {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarUrl,  // URL instead of file
    }),
  });
};
```

## Environment Variables Needed

### In Vercel (Backend):
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### In Frontend (.env):
```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=libronet_uploads
```

## Why This Works
1. Files upload directly from browser to Cloudinary (no size limit)
2. Cloudinary returns a URL
3. Your backend only receives the URL (tiny payload)
4. Vercel's 4.5MB limit is never hit

## Alternative: Use Vercel Blob Storage
If you don't want to use Cloudinary, you can use Vercel Blob:
- https://vercel.com/docs/storage/vercel-blob
- Costs money after free tier
- Similar implementation (upload from frontend, get URL, send to backend)
