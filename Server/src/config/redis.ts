import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

// Create Redis client only if REDIS_URL is provided
const redisClient = process.env.REDIS_URL 
  ? createClient({
      url: process.env.REDIS_URL
    })
  : createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    })

redisClient.on('error', (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️  Redis Client Error (optional):', err.message)
  }
})

redisClient.on('connect', () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔗 Redis Client Connected')
  }
})

export const connectRedis = async () => {
  try {
    if (process.env.REDIS_URL || process.env.REDIS_HOST) {
      await redisClient.connect()
      console.log('✅ Redis connected')
    } else {
      console.log('ℹ️  Redis not configured - token blacklist disabled')
    }
  } catch (error) {
    console.warn('⚠️  Redis not available (optional):', (error as Error).message)
  }
}

export default redisClient
