import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IAuthPayload } from '../types/index.js'
import redisClient from '../config/redis.js'

declare global {
  namespace Express {
    interface User extends IAuthPayload {}
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' })
    }

    // Check if token is blacklisted (only if Redis is connected)
    try {
      if (redisClient && redisClient.isOpen) {
        const isBlacklisted = await redisClient.get(`blacklist_${token}`)
        if (isBlacklisted) {
          return res.status(401).json({ success: false, error: 'Token has been invalidated' })
        }
      }
    } catch (redisError) {
      // Silently continue without blacklist check if Redis is not available
      // Only log in development mode
      if (process.env.NODE_ENV === 'development') {
        console.warn('Redis not available for blacklist checking')
      }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as IAuthPayload
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' })
  }
}

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' })
    }

    next()
  }
}
