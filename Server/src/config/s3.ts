import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

// Initialize S3 client (works with both AWS S3 and Cloudflare R2)
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'auto',
  endpoint: process.env.AWS_ENDPOINT, // For Cloudflare R2 or other S3-compatible services
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: process.env.AWS_ENDPOINT ? true : false, // Required for R2
})

export const S3_BUCKET = process.env.AWS_S3_BUCKET || 'successbridge-resources'
