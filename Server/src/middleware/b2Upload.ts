import multer from 'multer';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { b2Client, B2_BUCKET, B2_BUCKET_ID } from '../config/b2.js';
import path from 'path';
import { Request } from 'express';

// Get B2 public URL for a file (for public buckets)
// B2 friendly URL format: https://f{regionCode}.backblazeb2.com/file/{bucket}/{key}
// The region code (e.g. "005" for us-east-005) comes from B2_REGION / B2_ENDPOINT.
// NOTE: it is NOT derived from the bucket ID — that produced dead hosts like
// ff833.backblazeb2.com which silently broke every stored public URL.
export function getB2PublicUrl(key: string): string {
  const bucketName = B2_BUCKET;

  const region = process.env.B2_REGION || '';
  const endpoint = process.env.B2_ENDPOINT || 's3.us-west-004.backblazeb2.com';
  const regionMatch = (region || endpoint).match(/(\d{3})/);
  const regionCode = regionMatch ? regionMatch[1] : '004';

  return `https://f${regionCode}.backblazeb2.com/file/${bucketName}/${key}`;
}

/**
 * Extract the object key from any B2 URL variant (friendly or S3-style).
 * Returns '' when the URL is not a B2 URL or has no key.
 */
export function extractB2Key(url: string): string {
  if (!url) return '';

  // Friendly format: https://f005.backblazeb2.com/file/{bucket}/{key}
  const friendly = url.split('/file/');
  if (friendly.length > 1) {
    const parts = friendly[1].split('/');
    parts.shift(); // remove bucket name
    return parts.join('/');
  }

  // S3-style: https://{bucket}.s3.{region}.backblazeb2.com/{key}
  try {
    const u = new URL(url);
    if (u.hostname.endsWith('backblazeb2.com')) {
      const parts = u.pathname.split('/').filter(Boolean);
      if (parts.length > 1) {
        parts.shift(); // bucket name in path
        return parts.join('/');
      }
      return parts.join('/');
    }
  } catch {
    // not a valid URL
  }
  return '';
}

// Get B2 signed URL for a file (for private buckets)
// Signed URLs work with private buckets and expire after a set time
export async function getB2SignedUrl(key: string, expiresIn: number = 3600, forceDownload: boolean = false): Promise<string> {
  const commandParams: any = {
    Bucket: B2_BUCKET,
    Key: key,
  };

  // Add Content-Disposition header to force download
  if (forceDownload) {
    // Extract filename from key
    const filename = key.split('/').pop() || 'download';
    
    // Encode filename for mobile compatibility (handle special characters)
    const encodedFilename = encodeURIComponent(filename);
    
    // Use both filename and filename* for better mobile browser support
    // filename* is RFC 5987 encoding for international characters
    commandParams.ResponseContentDisposition = `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`;
  } else {
    // For preview/open: use inline disposition
    const filename = key.split('/').pop() || 'file';
    const encodedFilename = encodeURIComponent(filename);
    commandParams.ResponseContentDisposition = `inline; filename="${filename}"; filename*=UTF-8''${encodedFilename}`;
  }

  const command = new GetObjectCommand(commandParams);

  try {
    // Generate signed URL that expires in 'expiresIn' seconds (default 1 hour)
    const signedUrl = await getSignedUrl(b2Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('❌ Failed to generate signed URL:', error);
    throw new Error(`Failed to generate signed URL: ${error}`);
  }
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
    const allowedTypes = /pdf|jpg|jpeg|png|gif|webp|bmp|mp4|mov|avi|doc|docx|ppt|pptx|xls|xlsx/;
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
// Supports two signatures for backward compatibility:
// 1. uploadToB2(req, file) - for routes with multer
// 2. uploadToB2(data, file) - for services (data is ignored, kept for compatibility)
export async function uploadToB2(reqOrData: Request | any, file: Express.Multer.File, folder: string = 'resources'): Promise<string> {
  if (!file) {
    console.error('❌ No file provided to uploadToB2');
    throw new Error('No file provided');
  }

  if (!file.buffer) {
    console.error('❌ File has no buffer:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
    throw new Error('No file buffer available');
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.originalname);
  const key = `${folder}/${uniqueSuffix}${ext}`;

  console.log('📤 Uploading to B2 with key:', key);
  console.log('📊 File size:', file.buffer.length, 'bytes');
  console.log('📄 Content type:', file.mimetype);

  const command = new PutObjectCommand({
    Bucket: B2_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    // Note: B2 doesn't support ACL parameter like AWS S3
    // Files are public based on bucket settings
  });

  try {
    await b2Client.send(command);
    const publicUrl = getB2PublicUrl(key);
    console.log('✅ File uploaded successfully to B2:', publicUrl);
    console.log('🔑 B2 Key:', key);
    return publicUrl;
  } catch (error) {
    console.error('❌ B2 upload error:', error);
    throw new Error(`Failed to upload file to B2: ${error}`);
  }
}
