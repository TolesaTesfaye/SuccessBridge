import { S3Client } from '@aws-sdk/client-s3';

// Backblaze B2 Configuration (S3-compatible)
export const b2Client = new S3Client({
  region: process.env.B2_REGION || 'us-west-004',
  endpoint: `https://${process.env.B2_ENDPOINT || 's3.us-west-004.backblazeb2.com'}`,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID || '',
    secretAccessKey: process.env.B2_APPLICATION_KEY || '',
  },
});

export const B2_BUCKET = process.env.B2_BUCKET_NAME || 'successbridge-resources';
export const B2_BUCKET_ID = process.env.B2_BUCKET_ID || '';

// Get public URL for files
// B2 friendly URL: https://f{regionCode}.backblazeb2.com/file/{bucket}/{filename}
// Region code comes from B2_REGION/B2_ENDPOINT (NOT the bucket ID).
export function getB2PublicUrl(filename: string): string {
  const bucketName = B2_BUCKET;
  const region = process.env.B2_REGION || '';
  const endpoint = process.env.B2_ENDPOINT || 's3.us-west-004.backblazeb2.com';
  const regionMatch = (region || endpoint).match(/(\d{3})/);
  const regionCode = regionMatch ? regionMatch[1] : '004';
  return `https://f${regionCode}.backblazeb2.com/file/${bucketName}/${filename}`;
}
