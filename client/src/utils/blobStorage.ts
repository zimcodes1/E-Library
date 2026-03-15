import { put } from '@vercel/blob';

const BLOB_TOKEN = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;

const generateUniqueFilename = (prefix: string): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${random}.pdf`;
};

export const uploadPDFToBlob = async (file: File): Promise<string> => {
  const uniqueFilename = generateUniqueFilename('libronet_book');
  
  try {
    const blob = await put(uniqueFilename, file, {
      access: 'public',
      token: BLOB_TOKEN,
    });
    
    console.log('Vercel Blob upload success:', blob.url);
    return blob.url;
  } catch (error) {
    console.error('Vercel Blob upload error:', error);
    throw new Error('Failed to upload PDF to Vercel Blob');
  }
};
