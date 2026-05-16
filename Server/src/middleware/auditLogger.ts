import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { IAuthPayload } from '../types/index.js'

/**
 * Middleware to extract and attach audit information to request
 * This extracts: userId, IP address, and user agent
 */
export interface AuditRequest extends Request {
  audit?: {
    userId?: string
    ipAddress: string
    userAgent: string
  }
}

export const auditMiddleware = (
  req: AuditRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Extract IP address
    const ipAddress = extractIpAddress(req)

    // Extract user agent
    const userAgent = req.headers['user-agent'] || 'Unknown'

    // Extract userId from JWT token if present
    let userId: string | undefined

    const authHeader = req.headers.authorization
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1]
        if (token) {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'secret',
          ) as IAuthPayload
          userId = decoded.userId
        }
      } catch {
        // Token parsing failed, continue without userId
      }
    }

    // Also get userId from req.user if already authenticated
    if (req.user && !userId) {
      userId = (req.user as any).id || (req.user as any).userId
    }

    // Attach audit info to request
    req.audit = {
      userId,
      ipAddress,
      userAgent: String(userAgent).substring(0, 255),
    }

    next()
  } catch (error) {
    // Don't block request on audit middleware error
    next()
  }
}

/**
 * Extract IP address from request
 * Handles both direct IP and proxy headers
 */
function extractIpAddress(req: Request): string {
  // Try X-Forwarded-For first (for proxies)
  const xForwardedFor = req.headers['x-forwarded-for']
  if (xForwardedFor) {
    const ips = Array.isArray(xForwardedFor)
      ? xForwardedFor
      : xForwardedFor.split(',')
    return ips[0].trim()
  }

  // Fallback to req.ip (Express with trust proxy)
  if (req.ip) {
    return req.ip
  }

  // Fallback to socket address
  if (req.socket.remoteAddress) {
    return req.socket.remoteAddress
  }

  return 'Unknown'
}
