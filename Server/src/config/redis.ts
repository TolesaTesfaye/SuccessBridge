import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({
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
    await redisClient.connect()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️  Redis not available (optional):', (error as Error).message)
    }
  }
}

export default redisClient
