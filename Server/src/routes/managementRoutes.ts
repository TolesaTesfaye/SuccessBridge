import { Router, Request, Response } from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { AuditRequest } from "../middleware/auditLogger.js";
import managementService from "../services/managementService.js";
import User from "../models/User.js";
import Permission from "../models/Permission.js";
import { logger } from "../utils/logger.js";

const router = Router();

// All routes require super_admin role
router.use(authMiddleware, requireRole("super_admin"));

// ==================== PERMISSION ROUTES ====================

/**
 * GET /api/admin/management/permissions - Get all permissions grouped by category
 */
router.get("/permissions", async (req: AuditRequest, res: Response) => {
  try {
    const permissions = await managementService.getPermissionsByCategory();
    res.json({ success: true, data: permissions });
  } catch (error) {
    logger.error("Error fetching permissions:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch permissions" });
  }
});

/**
 * GET /api/admin/management/permissions/all - Get all permissions flat list
 */
router.get("/permissions/all", async (req: AuditRequest, res: Response) => {
  try {
    const permissions = await Permission.findAll({
      order: [
        ["category", "ASC"],
        ["name", "ASC"],
      ],
    });
    res.json({ success: true, data: permissions });
  } catch (error) {
    logger.error("Error fetching all permissions:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch permissions" });
  }
});

/**
 * GET /api/admin/management/permissions/user/:userId - Get user-specific permissions
 */
router.get(
  "/permissions/user/:userId",
  async (req: AuditRequest, res: Response) => {
    try {
      const data = await managementService.getUserPermissions(
        req.params.userId,
      );
      res.json({ success: true, data });
    } catch (error) {
      logger.error("Error fetching user permissions:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch user permissions" });
    }
  },
);

/**
 * POST /api/admin/management/permissions/grant - Grant permission to a user
 */
router.post("/permissions/grant", async (req: AuditRequest, res: Response) => {
  try {
    const { userId, permissionId } = req.body;
    if (!userId || !permissionId) {
      return res.status(400).json({
        success: false,
        error: "userId and permissionId are required",
      });
    }
    await managementService.grantUserPermission(
      userId,
      permissionId,
      req.audit?.userId!,
    );
    res.json({ success: true, message: "Permission granted successfully" });
  } catch (error) {
    logger.error("Error granting permission:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to grant permission" });
  }
});

/**
 * POST /api/admin/management/permissions/revoke - Revoke permission from a user
 */
router.post("/permissions/revoke", async (req: AuditRequest, res: Response) => {
  try {
    const { userId, permissionId } = req.body;
    if (!userId || !permissionId) {
      return res.status(400).json({
        success: false,
        error: "userId and permissionId are required",
      });
    }
    await managementService.revokeUserPermission(userId, permissionId);
    res.json({ success: true, message: "Permission revoked successfully" });
  } catch (error) {
    logger.error("Error revoking permission:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to revoke permission" });
  }
});

/**
 * PUT /api/admin/management/permissions/role/:role - Update role permissions
 */
router.put(
  "/permissions/role/:role",
  async (req: AuditRequest, res: Response) => {
    try {
      const { permissionIds } = req.body;
      await managementService.updateRolePermissions(
        req.params.role,
        permissionIds,
      );
      res.json({ success: true, message: "Role permissions updated" });
    } catch (error) {
      logger.error("Error updating role permissions:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to update role permissions" });
    }
  },
);

// ==================== SYSTEM SETTINGS ROUTES ====================

/**
 * GET /api/admin/management/settings - Get all system settings
 */
router.get("/settings", async (req: AuditRequest, res: Response) => {
  try {
    const settings = await managementService.getAllSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    logger.error("Error fetching settings:", error);
    res.status(500).json({ success: false, error: "Failed to fetch settings" });
  }
});

/**
 * GET /api/admin/management/settings/:key - Get specific setting
 */
router.get("/settings/:key", async (req: AuditRequest, res: Response) => {
  try {
    const setting = await managementService.getSetting(req.params.key);
    if (!setting) {
      return res
        .status(404)
        .json({ success: false, error: "Setting not found" });
    }
    res.json({ success: true, data: setting });
  } catch (error) {
    logger.error("Error fetching setting:", error);
    res.status(500).json({ success: false, error: "Failed to fetch setting" });
  }
});

/**
 * PUT /api/admin/management/settings/:key - Update a system setting
 */
router.put("/settings/:key", async (req: AuditRequest, res: Response) => {
  try {
    const { value } = req.body;
    const setting = await managementService.updateSetting(
      req.params.key,
      value,
      req.audit?.userId!,
    );
    res.json({ success: true, data: setting, message: "Setting updated" });
  } catch (error) {
    logger.error("Error updating setting:", error);
    res.status(500).json({ success: false, error: "Failed to update setting" });
  }
});

// ==================== ANNOUNCEMENT ROUTES ====================

/**
 * GET /api/admin/management/announcements - Get announcements
 */
router.get("/announcements", async (req: AuditRequest, res: Response) => {
  try {
    const isActive = req.query.isActive;
    const result = await managementService.getAnnouncements({
      isActive: isActive !== undefined ? isActive === "true" : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching announcements:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch announcements" });
  }
});

/**
 * POST /api/admin/management/announcements - Create announcement
 */
router.post("/announcements", async (req: AuditRequest, res: Response) => {
  try {
    const announcement = await managementService.createAnnouncement({
      ...req.body,
      createdBy: req.audit?.userId,
    });
    res.json({
      success: true,
      data: announcement,
      message: "Announcement created",
    });
  } catch (error) {
    logger.error("Error creating announcement:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to create announcement" });
  }
});

/**
 * PUT /api/admin/management/announcements/:id - Update announcement
 */
router.put("/announcements/:id", async (req: AuditRequest, res: Response) => {
  try {
    const announcement = await managementService.updateAnnouncement(
      req.params.id,
      req.body,
    );
    res.json({
      success: true,
      data: announcement,
      message: "Announcement updated",
    });
  } catch (error) {
    logger.error("Error updating announcement:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update announcement" });
  }
});

/**
 * DELETE /api/admin/management/announcements/:id - Delete announcement
 */
router.delete(
  "/announcements/:id",
  async (req: AuditRequest, res: Response) => {
    try {
      await managementService.deleteAnnouncement(req.params.id);
      res.json({ success: true, message: "Announcement deleted" });
    } catch (error) {
      logger.error("Error deleting announcement:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to delete announcement" });
    }
  },
);

/**
 * POST /api/admin/management/announcements/:id/toggle - Toggle announcement active status
 */
router.post(
  "/announcements/:id/toggle",
  async (req: AuditRequest, res: Response) => {
    try {
      const announcement = await managementService.toggleAnnouncement(
        req.params.id,
      );
      res.json({
        success: true,
        data: announcement,
        message: "Announcement toggled",
      });
    } catch (error) {
      logger.error("Error toggling announcement:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to toggle announcement" });
    }
  },
);

// ==================== USER RESTRICTION ROUTES ====================

/**
 * POST /api/admin/management/restrict - Restrict a user (ban/suspend/read-only)
 */
router.post("/restrict", async (req: AuditRequest, res: Response) => {
  try {
    const { userId, restrictionType, reason, durationHours } = req.body;
    if (!userId || !restrictionType || !reason) {
      return res.status(400).json({
        success: false,
        error: "userId, restrictionType, and reason are required",
      });
    }
    const restriction = await managementService.restrictUser({
      userId,
      restrictionType,
      reason,
      durationHours,
      appliedBy: req.audit?.userId!,
    });
    res.json({ success: true, data: restriction, message: "User restricted" });
  } catch (error) {
    logger.error("Error restricting user:", error);
    res.status(500).json({ success: false, error: "Failed to restrict user" });
  }
});

/**
 * POST /api/admin/management/restrict/:id/lift - Lift a restriction
 */
router.post("/restrict/:id/lift", async (req: AuditRequest, res: Response) => {
  try {
    const restriction = await managementService.liftRestriction(
      req.params.id,
      req.audit?.userId!,
    );
    res.json({
      success: true,
      data: restriction,
      message: "Restriction lifted",
    });
  } catch (error) {
    logger.error("Error lifting restriction:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to lift restriction" });
  }
});

/**
 * GET /api/admin/management/restrictions - Get active restrictions
 */
router.get("/restrictions", async (req: AuditRequest, res: Response) => {
  try {
    const restrictions = await managementService.getActiveRestrictions();
    res.json({ success: true, data: restrictions });
  } catch (error) {
    logger.error("Error fetching restrictions:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch restrictions" });
  }
});

// ==================== SYSTEM HEALTH ====================

/**
 * GET /api/admin/management/health - Get system health status
 */
router.get("/health", async (req: AuditRequest, res: Response) => {
  try {
    const health = await managementService.getSystemHealth();
    res.json({ success: true, data: health });
  } catch (error) {
    logger.error("Error getting system health:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to get system health" });
  }
});

/**
 * GET /api/admin/management/users - Get all users (for management dropdowns)
 */
router.get("/users", async (req: AuditRequest, res: Response) => {
  try {
    const { role, search, page, limit } = req.query;
    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where[require("sequelize").Op.or] = [
        { name: { [require("sequelize").Op.iLike]: `%${search}%` } },
        { email: { [require("sequelize").Op.iLike]: `%${search}%` } },
      ];
    }
    const pageNum = page ? parseInt(page as string) : 1;
    const limitNum = limit ? parseInt(limit as string) : 50;
    const offset = (pageNum - 1) * limitNum;

    const { rows, count } = await User.findAndCountAll({
      where,
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "studentType",
        "isEmailVerified",
        "isApproved",
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
      limit: limitNum,
      offset,
    });

    res.json({
      success: true,
      data: {
        users: rows,
        total: count,
        page: pageNum,
        pages: Math.ceil(count / limitNum),
      },
    });
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

export default router;
