import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

// Only create Redis client if configured
const shouldUseRedis = !!(process.env.REDIS_URL || process.env.REDIS_HOST)

const redisClient = shouldUseRedis
  ? process.env.REDIS_URL 
    ? createClient({
        url: process.env.REDIS_URL
      })
    : createClient({
        socket: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      })
  : null as any // Mock client when Redis is not configured

// Only set up event handlers if Redis is configured
if (shouldUseRedis && redisClient) {
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
}

export const connectRedis = async () => {
  try {
    if (shouldUseRedis && redisClient) {
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
