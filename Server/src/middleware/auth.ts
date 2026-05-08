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
    const authHeader = req.headers.authorization
    
    const token = authHeader?.split(' ')[1]

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
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as IAuthPayload
    
    // Map userId to id for consistency with req.user.id usage
    req.user = {
      ...decoded,
      id: decoded.userId, // Add id field from userId
    } as any
    
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
