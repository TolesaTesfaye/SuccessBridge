import { Router, Request, Response } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { AuditRequest } from '../middleware/auditLogger.js'
import auditService from '../services/auditService.js'
import { logger } from '../utils/logger.js'

const router = Router()

/**
 * @swagger
 * /api/admin/security/overview:
 *   get:
 *     summary: Get security dashboard overview metrics
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security metrics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - super_admin role required
 */
router.get(
  '/overview',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const metrics = await auditService.getSecurityOverview()
      res.json({
        success: true,
        data: metrics,
      })
    } catch (error) {
      logger.error('Error getting security overview:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve security overview',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/events/timeline:
 *   get:
 *     summary: Get security events timeline
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hoursBack
 *         schema:
 *           type: integer
 *           default: 24
 *     responses:
 *       200:
 *         description: Timeline retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/events/timeline',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const hoursBack = parseInt(req.query.hoursBack as string) || 24
      const timeline = await auditService.getEventsTimeline(hoursBack)
      res.json({
        success: true,
        data: timeline,
      })
    } catch (error) {
      logger.error('Error getting events timeline:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve events timeline',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/failed-logins:
 *   get:
 *     summary: Get failed login attempts
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Failed logins retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/failed-logins',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50

      const result = await auditService.getFailedLogins(undefined, page, limit)
      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      logger.error('Error getting failed logins:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve failed logins',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/failed-logins/by-ip:
 *   get:
 *     summary: Get failed logins grouped by IP address
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/failed-logins/by-ip',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10
      const data = await auditService.getFailedLoginsByIP(limit)
      res.json({
        success: true,
        data,
      })
    } catch (error) {
      logger.error('Error getting failed logins by IP:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve failed logins by IP',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/failed-logins/by-user:
 *   get:
 *     summary: Get failed logins grouped by user
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/failed-logins/by-user',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10
      const data = await auditService.getFailedLoginsByUser(limit)
      res.json({
        success: true,
        data,
      })
    } catch (error) {
      logger.error('Error getting failed logins by user:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve failed logins by user',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/suspicious-patterns:
 *   get:
 *     summary: Get detected suspicious patterns
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patterns retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/suspicious-patterns',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const patterns = await auditService.getSuspiciousPatterns()
      res.json({
        success: true,
        data: patterns,
      })
    } catch (error) {
      logger.error('Error getting suspicious patterns:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve suspicious patterns',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/sessions:
 *   get:
 *     summary: Get active sessions (placeholder - future enhancement)
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sessions data (placeholder)
 */
router.get(
  '/sessions',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      // Placeholder for future session tracking implementation
      res.json({
        success: true,
        data: {
          activeSessions: [],
          totalSessions: 0,
          note: 'Session tracking coming soon',
        },
      })
    } catch (error) {
      logger.error('Error getting sessions:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve sessions',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/uploads:
 *   get:
 *     summary: Get file upload records (placeholder - future enhancement)
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Upload data (placeholder)
 */
router.get(
  '/uploads',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      // Placeholder for future file upload tracking
      res.json({
        success: true,
        data: {
          uploads: [],
          totalUploads: 0,
          blockedUploads: 0,
          note: 'File upload tracking coming soon',
        },
      })
    } catch (error) {
      logger.error('Error getting uploads:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve uploads',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/csrf:
 *   get:
 *     summary: Get CSRF token metrics (placeholder - future enhancement)
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSRF metrics (placeholder)
 */
router.get(
  '/csrf',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      // Placeholder for future CSRF tracking
      res.json({
        success: true,
        data: {
          tokensGenerated: 0,
          tokensInUse: 0,
          failedValidations: 0,
          note: 'CSRF tracking coming soon',
        },
      })
    } catch (error) {
      logger.error('Error getting CSRF metrics:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve CSRF metrics',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/headers:
 *   get:
 *     summary: Get security headers info (placeholder - future enhancement)
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security headers info (placeholder)
 */
router.get(
  '/headers',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      // Placeholder for future header verification
      res.json({
        success: true,
        data: {
          headers: {
            csp: 'default-src self',
            xFrameOptions: 'DENY',
            xContentTypeOptions: 'nosniff',
            hsts: 'max-age=31536000',
          },
          verified: true,
          note: 'Header verification coming soon',
        },
      })
    } catch (error) {
      logger.error('Error getting headers:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve headers',
      })
    }
  },
)

/**
 * @swagger
 * /api/admin/security/alerts:
 *   get:
 *     summary: Get security alerts (placeholder - future enhancement)
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security alerts (placeholder)
 */
router.get(
  '/alerts',
  authMiddleware,
  requireRole('super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      // Placeholder for future alerts
      res.json({
        success: true,
        data: {
          alerts: [],
          totalAlerts: 0,
          unresolvedAlerts: 0,
          note: 'Alert system coming soon',
        },
      })
    } catch (error) {
      logger.error('Error getting alerts:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve alerts',
      })
    }
  },
)

export default router
