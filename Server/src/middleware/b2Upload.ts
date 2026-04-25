import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { b2Client, B2_BUCKET, B2_BUCKET_ID } from '../config/b2.js';
import path from 'path';
import { Request } from 'express';

// Get B2 public URL for a file
export function getB2PublicUrl(key: string): string {
  const bucketName = B2_BUCKET;
  
  // Extract bucket ID prefix (first 4 chars)
  const bucketIdPrefix = B2_BUCKET_ID.substring(0, 4);
  
  // B2 public URL format: https://f{bucket_id_prefix}.backblazeb2.com/file/{bucket_name}/{key}
  return `https://f${bucketIdPrefix}.backblazeb2.com/file/${bucketName}/${key}`;
}

// Use memory storage for multer, then manually upload to B2
const storage = multer.memoryStorage();

export const b2Upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow PDFs, images, videos, documents
    const allowedTypes = /pdf|jpg|jpeg|png|gif|mp4|mov|avi|doc|docx|ppt|pptx|xls|xlsx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDFs, images, videos, and documents are allowed.'));
    }
  },
});

// Middleware to upload file to B2 after multer processes it
export async function uploadToB2(req: Request, file: Express.Multer.File): Promise<string> {
  if (!file || !file.buffer) {
    throw new Error('No file buffer available');
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const key = `resources/${uniqueSuffix}${ext}`;

  console.log('Uploading to B2 with key:', key);
  console.log('File size:', file.buffer.length, 'bytes');
  console.log('Content type:', file.mimetype);

  const command = new PutObjectCommand({
    Bucket: B2_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // Make file publicly readable
    ACL: 'public-read',
  });

  try {
    await b2Client.send(command);
    const publicUrl = getB2PublicUrl(key);
    console.log('File uploaded successfully to B2:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('B2 upload error:', error);
    throw new Error(`Failed to upload file to B2: ${error}`);
  }
}
