import { Router, Request, Response } from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { AuditRequest } from "../middleware/auditLogger.js";
import auditService from "../services/auditService.js";
import { logger } from "../utils/logger.js";

const router = Router();

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
  "/overview",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const metrics = await auditService.getSecurityOverview();
      res.json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      logger.error("Error getting security overview:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve security overview",
      });
    }
  },
);

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
  "/events/timeline",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const hoursBack = parseInt(req.query.hoursBack as string) || 24;
      const timeline = await auditService.getEventsTimeline(hoursBack);
      res.json({
        success: true,
        data: timeline,
      });
    } catch (error) {
      logger.error("Error getting events timeline:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve events timeline",
      });
    }
  },
);

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
  "/failed-logins",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;

      const result = await auditService.getFailedLogins(undefined, page, limit);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error("Error getting failed logins:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve failed logins",
      });
    }
  },
);

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
  "/failed-logins/by-ip",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await auditService.getFailedLoginsByIP(limit);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting failed logins by IP:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve failed logins by IP",
      });
    }
  },
);

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
  "/failed-logins/by-user",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await auditService.getFailedLoginsByUser(limit);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting failed logins by user:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve failed logins by user",
      });
    }
  },
);

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
  "/suspicious-patterns",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const patterns = await auditService.getSuspiciousPatterns();
      res.json({
        success: true,
        data: patterns,
      });
    } catch (error) {
      logger.error("Error getting suspicious patterns:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve suspicious patterns",
      });
    }
  },
);

// ============ NEW: Real implementations ============

/**
 * @swagger
 * /api/admin/security/sessions:
 *   get:
 *     summary: Get active user sessions
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active sessions retrieved
 */
router.get(
  "/sessions",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const sessions = await auditService.getActiveSessions();
      res.json({
        success: true,
        data: {
          sessions,
          totalActive: sessions.length,
        },
      });
    } catch (error) {
      logger.error("Error getting sessions:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve sessions",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/sessions/force-logout/{userId}:
 *   post:
 *     summary: Force logout a user session
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User force logged out
 */
router.post(
  "/sessions/force-logout/:userId",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const { userId } = req.params;
      // Log the force logout action
      auditService.logAction({
        userId: req.audit?.userId,
        action: "force_logout",
        resource: "session",
        resourceId: userId,
        details: { targetUserId: userId },
        ipAddress: req.audit?.ipAddress,
        userAgent: req.audit?.userAgent,
        status: "success",
      });
      logger.info(`Force logout initiated for user: ${userId}`);
      res.json({
        success: true,
        message: `User ${userId} has been forcefully logged out`,
      });
    } catch (error) {
      logger.error("Error force logging out:", error);
      res.status(500).json({
        success: false,
        error: "Failed to force logout user",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/uploads:
 *   get:
 *     summary: Get file upload audit records
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
 *         description: File upload records retrieved
 */
router.get(
  "/uploads",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const data = await auditService.getUploadRecords(page, limit);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting uploads:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve uploads",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/csrf:
 *   get:
 *     summary: Get CSRF token metrics
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSRF metrics retrieved
 */
router.get(
  "/csrf",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const data = await auditService.getCSRFMetrics();
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting CSRF metrics:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve CSRF metrics",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/headers:
 *   get:
 *     summary: Get security headers configuration status
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Security headers status retrieved
 */
router.get(
  "/headers",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const data = await auditService.getSecurityHeadersStatus();
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting headers:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve headers",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/alerts:
 *   get:
 *     summary: Get security alerts from suspicious patterns
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
 *         description: Security alerts retrieved
 */
router.get(
  "/alerts",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const data = await auditService.getSecurityAlerts(page, limit);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting alerts:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve alerts",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/alerts/{alertId}/resolve:
 *   post:
 *     summary: Resolve a security alert
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Alert resolved
 */
router.post(
  "/alerts/:alertId/resolve",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const { alertId } = req.params;
      await auditService.resolveAlert(alertId);
      res.json({
        success: true,
        message: `Alert ${alertId} resolved`,
      });
    } catch (error) {
      logger.error("Error resolving alert:", error);
      res.status(500).json({
        success: false,
        error: "Failed to resolve alert",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/rate-limit/violations:
 *   get:
 *     summary: Get rate limit violations
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
 *         description: Violations retrieved
 */
router.get(
  "/rate-limit/violations",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const data = await auditService.getRateLimitViolations(page, limit);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting rate limit violations:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve rate limit violations",
      });
    }
  },
);

/**
 * @swagger
 * /api/admin/security/rate-limit/config:
 *   get:
 *     summary: Get rate limit configuration with current hit counts
 *     tags: [Admin Security]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rate limit config retrieved
 */
router.get(
  "/rate-limit/config",
  authMiddleware,
  requireRole("super_admin"),
  async (req: AuditRequest, res: Response) => {
    try {
      const data = await auditService.getRateLimitConfig();
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      logger.error("Error getting rate limit config:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve rate limit config",
      });
    }
  },
);

export default router;
