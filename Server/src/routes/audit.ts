import { Router, Request, Response } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { AuditRequest } from '../middleware/auditLogger.js'
import auditService from '../services/auditService.js'
import { logger } from '../utils/logger.js'

const router = Router()

/**
 * @swagger
 * /admin/audit-logs:
 *   get:
 *     summary: Get audit logs (admin only)
 *     tags: [Audit]
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
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [success, failure]
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - admin role required
 */
router.get(
  '/audit-logs',
  authMiddleware,
  requireRole('admin', 'super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50
      const userId = req.query.userId as string
      const action = req.query.action as string
      const status = req.query.status as 'success' | 'failure'
      const startDate = req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined
      const endDate = req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined

      const result = await auditService.queryLogs({
        userId,
        action,
        status,
        startDate,
        endDate,
        page,
        limit,
      })

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      logger.error('Error retrieving audit logs:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve audit logs',
      })
    }
  },
)

/**
 * @swagger
 * /admin/audit-logs/user/{userId}:
 *   get:
 *     summary: Get audit trail for a specific user (admin only)
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
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
 *         description: User audit trail retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/audit-logs/user/:userId',
  authMiddleware,
  requireRole('admin', 'super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const userId = req.params.userId
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50

      const result = await auditService.getAuditTrail(userId, page, limit)

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      logger.error('Error retrieving user audit trail:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve user audit trail',
      })
    }
  },
)

/**
 * @swagger
 * /admin/audit-logs/action/{action}:
 *   get:
 *     summary: Get logs for a specific action (admin only)
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
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
 *         description: Action logs retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/audit-logs/action/:action',
  authMiddleware,
  requireRole('admin', 'super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const action = req.params.action
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50

      const result = await auditService.getActionLogs(action, page, limit)

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      logger.error('Error retrieving action logs:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve action logs',
      })
    }
  },
)

/**
 * @swagger
 * /admin/audit-logs/failed-logins:
 *   get:
 *     summary: Get failed login attempts (admin only)
 *     tags: [Audit]
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
 *         description: Failed login attempts retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/audit-logs/failed-logins',
  authMiddleware,
  requireRole('admin', 'super_admin'),
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
      logger.error('Error retrieving failed login logs:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve failed login logs',
      })
    }
  },
)

/**
 * @swagger
 * /admin/audit-logs/security-events:
 *   get:
 *     summary: Get security-relevant events (admin only)
 *     tags: [Audit]
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
 *         description: Security events retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  '/audit-logs/security-events',
  authMiddleware,
  requireRole('admin', 'super_admin'),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50

      const result = await auditService.getSecurityEvents(page, limit)

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      logger.error('Error retrieving security events:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve security events',
      })
    }
  },
)

/**
 * @swagger
 * /admin/audit-logs/user/{userId}/events:
 *   get:
 *     summary: Get my audit trail (authenticated user)
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
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
 *         description: User events retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - can only view own events unless admin
 */
router.get(
  '/audit-logs/user/:userId/events',
  authMiddleware,
  async (req: AuditRequest, res: Response) => {
    try {
      const requestedUserId = req.params.userId
      const currentUserId = (req.user as any)?.id

      // Users can only view their own events unless they're admin
      if (
        requestedUserId !== currentUserId &&
        (req.user as any)?.role !== 'admin' &&
        (req.user as any)?.role !== 'super_admin'
      ) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden - can only view own audit events',
        })
      }

      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 50

      const result = await auditService.getAuditTrail(
        requestedUserId,
        page,
        limit,
      )

      res.json({
        success: true,
        data: result,
      })
    } catch (error) {
      logger.error('Error retrieving user events:', error)
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve user events',
      })
    }
  },
)

export default router
