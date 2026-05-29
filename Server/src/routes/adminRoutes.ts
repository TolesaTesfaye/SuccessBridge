import { Router, Request, Response } from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { AuditRequest } from "../middleware/auditLogger.js";
import * as adminService from "../services/adminService.js";
import { logger } from "../utils/logger.js";

const router = Router();

// All routes require super_admin role
router.use(authMiddleware, requireRole("super_admin"));

// ==================== DASHBOARD ====================

router.get("/dashboard/stats", async (req: AuditRequest, res: Response) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    logger.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, error: "Failed to fetch stats" });
  }
});

router.get("/dashboard/activity", async (req: AuditRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const activity = await adminService.getRecentActivity(limit);
    res.json({ success: true, data: activity });
  } catch (error) {
    logger.error("Error fetching recent activity:", error);
    res.status(500).json({ success: false, error: "Failed to fetch activity" });
  }
});

// ==================== USER MANAGEMENT ====================

router.get("/users", async (req: AuditRequest, res: Response) => {
  try {
    const { role, search, status, page, limit } = req.query;
    const result = await adminService.getUsers({
      role: role as string,
      search: search as string,
      status: status as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
});

router.put("/users/:id", async (req: AuditRequest, res: Response) => {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user, message: "User updated" });
  } catch (error: any) {
    logger.error("Error updating user:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to update user",
    });
  }
});

router.delete("/users/:id", async (req: AuditRequest, res: Response) => {
  try {
    const deleted = await adminService.deleteUser(req.params.id);
    if (deleted) {
      res.json({ success: true, message: "User deleted" });
    } else {
      res.status(404).json({ success: false, error: "User not found" });
    }
  } catch (error) {
    logger.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Failed to delete user" });
  }
});

router.post("/users/bulk", async (req: AuditRequest, res: Response) => {
  try {
    const { userIds, data } = req.body;
    const updated = await adminService.bulkUpdateUsers(userIds, data);
    res.json({ success: true, data: { updated }, message: "Users updated" });
  } catch (error) {
    logger.error("Error bulk updating users:", error);
    res.status(500).json({ success: false, error: "Failed to update users" });
  }
});

// ==================== CONTENT MANAGEMENT ====================

router.get("/resources", async (req: AuditRequest, res: Response) => {
  try {
    const { page, limit } = req.query;
    const result = await adminService.getAllResources({
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching resources:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch resources" });
  }
});

// ==================== QUIZ MANAGEMENT ====================

router.get("/quizzes", async (req: AuditRequest, res: Response) => {
  try {
    const { subjectId, page, limit } = req.query;
    const result = await adminService.getAllQuizzes({
      subjectId: subjectId as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching quizzes:", error);
    res.status(500).json({ success: false, error: "Failed to fetch quizzes" });
  }
});

// ==================== SUBJECT MANAGEMENT ====================

router.get("/subjects", async (req: AuditRequest, res: Response) => {
  try {
    const subjects = await adminService.getAllSubjects();
    res.json({ success: true, data: subjects });
  } catch (error) {
    logger.error("Error fetching subjects:", error);
    res.status(500).json({ success: false, error: "Failed to fetch subjects" });
  }
});

// ==================== ANNOUNCEMENT MANAGEMENT ====================

router.get("/announcements", async (req: AuditRequest, res: Response) => {
  try {
    const { isActive, page, limit } = req.query;
    const result = await adminService.getAllAnnouncements({
      isActive: isActive !== undefined ? isActive === "true" : undefined,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 20,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching announcements:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch announcements" });
  }
});

// ==================== AUDIT LOGS ====================

router.get("/audit-logs", async (req: AuditRequest, res: Response) => {
  try {
    const { action, userId, startDate, endDate, page, limit } = req.query;
    const result = await adminService.getAuditLogs({
      action: action as string,
      userId: userId as string,
      startDate: startDate as string,
      endDate: endDate as string,
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 50,
    });
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching audit logs:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch audit logs" });
  }
});

// ==================== REPORTS ====================

router.get("/reports/user-growth", async (req: AuditRequest, res: Response) => {
  try {
    const months = parseInt(req.query.months as string) || 6;
    const report = await adminService.getUserGrowthReport(months);
    res.json({ success: true, data: report });
  } catch (error) {
    logger.error("Error fetching user growth report:", error);
    res.status(500).json({ success: false, error: "Failed to fetch report" });
  }
});

router.get(
  "/reports/resource-usage",
  async (req: AuditRequest, res: Response) => {
    try {
      const report = await adminService.getResourceUsageReport();
      res.json({ success: true, data: report });
    } catch (error) {
      logger.error("Error fetching resource usage report:", error);
      res.status(500).json({ success: false, error: "Failed to fetch report" });
    }
  },
);

router.get(
  "/reports/quiz-performance",
  async (req: AuditRequest, res: Response) => {
    try {
      const report = await adminService.getQuizPerformanceReport();
      res.json({ success: true, data: report });
    } catch (error) {
      logger.error("Error fetching quiz performance report:", error);
      res.status(500).json({ success: false, error: "Failed to fetch report" });
    }
  },
);

// ==================== PERMISSIONS ====================

router.get("/permissions", async (req: AuditRequest, res: Response) => {
  try {
    const result = await adminService.getRolePermissions();
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error fetching permissions:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch permissions" });
  }
});

router.put(
  "/permissions/role/:role",
  async (req: AuditRequest, res: Response) => {
    try {
      const { permissionIds } = req.body;
      await adminService.updateRolePermissions(req.params.role, permissionIds);
      res.json({ success: true, message: "Role permissions updated" });
    } catch (error) {
      logger.error("Error updating role permissions:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to update permissions" });
    }
  },
);

router.post("/permissions/grant", async (req: AuditRequest, res: Response) => {
  try {
    const { userId, permissionId } = req.body;
    await adminService.grantUserPermission(
      userId,
      permissionId,
      req.audit?.userId!,
    );
    res.json({ success: true, message: "Permission granted" });
  } catch (error) {
    logger.error("Error granting permission:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to grant permission" });
  }
});

router.post("/permissions/revoke", async (req: AuditRequest, res: Response) => {
  try {
    const { userId, permissionId } = req.body;
    await adminService.revokeUserPermission(userId, permissionId);
    res.json({ success: true, message: "Permission revoked" });
  } catch (error) {
    logger.error("Error revoking permission:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to revoke permission" });
  }
});

// ==================== SETTINGS ====================

router.get("/settings", async (req: AuditRequest, res: Response) => {
  try {
    const settings = await adminService.getAllSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    logger.error("Error fetching settings:", error);
    res.status(500).json({ success: false, error: "Failed to fetch settings" });
  }
});

router.put("/settings/:key", async (req: AuditRequest, res: Response) => {
  try {
    const { value } = req.body;
    const setting = await adminService.updateSetting(
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

// ==================== NOTIFICATIONS ====================

router.post(
  "/notifications/broadcast",
  async (req: AuditRequest, res: Response) => {
    try {
      const { title, message, targetRoles, type } = req.body;
      const result = await adminService.sendBroadcastNotification({
        title,
        message,
        targetRoles,
        type,
      });
      res.json({ success: true, data: result, message: "Broadcast sent" });
    } catch (error) {
      logger.error("Error sending broadcast:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send broadcast" });
    }
  },
);

// ==================== SYSTEM HEALTH ====================

router.get("/health", async (req: AuditRequest, res: Response) => {
  try {
    const health = await adminService.getSystemHealth();
    res.json({ success: true, data: health });
  } catch (error) {
    logger.error("Error fetching system health:", error);
    res.status(500).json({ success: false, error: "Failed to fetch health" });
  }
});

export default router;
