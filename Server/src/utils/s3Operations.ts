import { GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client, S3_BUCKET } from '../config/s3.js'

/**
 * Generate a presigned URL for downloading a file from S3
 * @param key - S3 object key
 * @param expiresIn - URL expiration time in seconds (default: 1 hour)
 */
export const getS3DownloadUrl = async (key: string, expiresIn: number = 3600): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}

/**
 * Delete a file from S3
 * @param key - S3 object key
 */
export const deleteS3File = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  })

  await s3Client.send(command)
}

/**
 * Check if a file exists in S3
 * @param key - S3 object key
 */
export const s3FileExists = async (key: string): Promise<boolean> => {
  try {
    const command = new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    })
    await s3Client.send(command)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Extract S3 key from full S3 URL
 * @param url - Full S3 URL
 */
export const extractS3Key = (url: string): string => {
  if (url.includes('amazonaws.com')) {
    // Format: https://bucket.s3.region.amazonaws.com/key
    const parts = url.split('.amazonaws.com/')
    return parts[1] || ''
  }
  return url
}
