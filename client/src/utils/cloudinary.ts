const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'libronet_uploads';

const generateUniqueFilename = (prefix: string, extension: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}.${extension}`;
};

export const uploadToCloudinary = async (file: File, type: 'avatar' | 'cover' | 'book' = 'book'): Promise<string> => {
  const extension = file.name.split('.').pop() || 'jpg';
  const prefix = type === 'avatar' ? 'libronet_ava' : type === 'cover' ? 'libronet_cover' : 'libronet_book';
  const uniqueFilename = generateUniqueFilename(prefix, extension);
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('public_id', uniqueFilename.split('.')[0]); // Remove extension for public_id
  formData.append('folder', 'libronet');
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to upload file to Cloudinary');
  }
  
  const data = await response.json();
  return data.secure_url;
};
