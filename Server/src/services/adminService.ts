import { Op, fn, col, QueryTypes } from "sequelize";
import User from "../models/User.js";
import Resource from "../models/Resource.js";
import Quiz from "../models/Quiz.js";
import Subject from "../models/Subject.js";
import Announcement from "../models/Announcement.js";
import AuditLog from "../models/AuditLog.js";
import SystemSetting from "../models/SystemSetting.js";
import Permission from "../models/Permission.js";
import UserPermission from "../models/UserPermission.js";
import RolePermission from "../models/RolePermission.js";
import UserRestriction from "../models/UserRestriction.js";
import Notification from "../models/Notification.js";
import Payment from "../models/Payment.js";
import StudentProgress from "../models/StudentProgress.js";
import QuizResult from "../models/QuizResult.js";
import sequelize from "../config/database.js";
import { logger } from "../utils/logger.js";

// ==================== DASHBOARD STATS ====================

const safeCount = async (
  model: { count: (options?: object) => Promise<number>; name?: string },
  options?: object,
  label?: string,
): Promise<number> => {
  try {
    return await model.count(options);
  } catch (error) {
    logger.warn(`Dashboard stat count failed (${label ?? model.name}):`, error);
    return 0;
  }
};

const safeSum = async (
  model: { sum: (field: string, options?: object) => Promise<number | null> },
  field: string,
  options?: object,
  label?: string,
): Promise<number> => {
  try {
    const value = await model.sum(field, options);
    return Number(value) || 0;
  } catch (error) {
    logger.warn(`Dashboard stat sum failed (${label ?? field}):`, error);
    return 0;
  }
};

const fetchUserGrowth = async (): Promise<{ month: string; count: number }[]> => {
  try {
    const rows = await sequelize.query<{ month: string; count: string }>(
      `
        SELECT
          TO_CHAR("createdAt", 'YYYY-MM') AS month,
          COUNT(*)::int AS count
        FROM users
        WHERE "createdAt" >= NOW() - INTERVAL '6 months'
        GROUP BY TO_CHAR("createdAt", 'YYYY-MM')
        ORDER BY month
        `,
      { type: QueryTypes.SELECT },
    );
    return rows.map((row) => ({
      month: row.month,
      count: Number(row.count) || 0,
    }));
  } catch (error) {
    logger.warn("Dashboard user growth query failed:", error);
    return [];
  }
};

export const getDashboardStats = async () => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalResources,
      totalQuizzes,
      totalAnnouncements,
      activeAnnouncements,
      totalPayments,
      totalRevenue,
      userGrowth,
    ] = await Promise.all([
      safeCount(User, undefined, "users.total"),
      safeCount(
        User,
        { where: { isApproved: true, role: "student" } },
        "users.active",
      ),
      safeCount(Resource, undefined, "resources"),
      safeCount(Quiz, undefined, "quizzes"),
      safeCount(Announcement, undefined, "announcements"),
      safeCount(
        Announcement,
        { where: { isActive: true } },
        "announcements.active",
      ),
      safeCount(Payment, undefined, "payments"),
      safeSum(
        Payment,
        "amount",
        { where: { status: "approved" } },
        "payments.revenue",
      ),
      fetchUserGrowth(),
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        growth: userGrowth,
      },
      resources: {
        total: totalResources,
      },
      quizzes: { total: totalQuizzes },
      announcements: {
        total: totalAnnouncements,
        active: activeAnnouncements,
      },
      payments: {
        total: totalPayments,
        revenue: totalRevenue,
      },
    };
  } catch (error) {
    logger.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// ==================== RECENT ACTIVITY ====================

export const getRecentActivity = async (limit = 20) => {
  try {
    const activities = await AuditLog.findAll({
      limit,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "role"],
          required: false,
        },
      ],
    });
    return activities;
  } catch (error) {
    logger.error("Error fetching recent activity:", error);
    throw error;
  }
};

// ==================== USER MANAGEMENT ====================

export const getUsers = async (filters: {
  role?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;
    const where: any = {};

    if (filters.role) where.role = filters.role;
    if (filters.status) {
      if (filters.status === "approved") {
        where.approvalStatus = "approved";
      } else if (filters.status === "pending") {
        where.approvalStatus = "pending";
      } else if (filters.status === "rejected") {
        where.approvalStatus = "rejected";
      }
    }
    if (filters.search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${filters.search}%` } },
        { email: { [Op.iLike]: `%${filters.search}%` } },
      ];
    }

    const { rows, count } = await User.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      users: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    };
  } catch (error) {
    logger.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, data: any) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
    await user.update(data);
    return user;
  } catch (error) {
    logger.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const deleted = await User.destroy({ where: { id: userId } });
    return deleted > 0;
  } catch (error) {
    logger.error("Error deleting user:", error);
    throw error;
  }
};

export const bulkUpdateUsers = async (userIds: string[], data: any) => {
  try {
    const [updated] = await User.update(data, {
      where: { id: { [Op.in]: userIds } },
    });
    return updated;
  } catch (error) {
    logger.error("Error bulk updating users:", error);
    throw error;
  }
};

// ==================== CONTENT MANAGEMENT ====================

export const getAllResources = async (filters?: {
  page?: number;
  limit?: number;
}) => {
  try {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    const { rows, count } = await Resource.findAndCountAll({
      include: [
        {
          model: User,
          as: "uploader",
          attributes: ["id", "name", "email"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      resources: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    };
  } catch (error) {
    logger.error("Error fetching resources:", error);
    throw error;
  }
};

// ==================== QUIZ MANAGEMENT ====================

export const getAllQuizzes = async (filters?: {
  subjectId?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;
    const where: any = {};

    if (filters?.subjectId) where.subjectId = filters.subjectId;

    const { rows, count } = await Quiz.findAndCountAll({
      where,
      include: [
        {
          model: Subject,
          as: "subject",
          attributes: ["id", "name"],
          required: false,
        },
        {
          model: User,
          as: "creator",
          attributes: ["id", "name", "email"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      quizzes: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    };
  } catch (error) {
    logger.error("Error fetching quizzes:", error);
    throw error;
  }
};

// ==================== SUBJECT MANAGEMENT ====================

export const getAllSubjects = async () => {
  try {
    return await Subject.findAll({
      order: [["name", "ASC"]],
    });
  } catch (error) {
    logger.error("Error fetching subjects:", error);
    throw error;
  }
};

// ==================== ANNOUNCEMENT MANAGEMENT ====================

export const getAllAnnouncements = async (filters?: {
  isActive?: boolean;
  page?: number;
  limit?: number;
}) => {
  try {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;
    const where: any = {};

    if (filters?.isActive !== undefined) where.isActive = filters.isActive;

    const { rows, count } = await Announcement.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      announcements: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    };
  } catch (error) {
    logger.error("Error fetching announcements:", error);
    throw error;
  }
};

// ==================== AUDIT LOGS ====================

export const getAuditLogs = async (filters?: {
  action?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const offset = (page - 1) * limit;
    const where: any = {};

    if (filters?.action) where.action = filters.action;
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.startDate && filters?.endDate) {
      where.createdAt = {
        [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)],
      };
    }

    const { rows, count } = await AuditLog.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "role"],
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return {
      logs: rows,
      total: count,
      page,
      pages: Math.ceil(count / limit),
    };
  } catch (error) {
    logger.error("Error fetching audit logs:", error);
    throw error;
  }
};

// ==================== REPORTS ====================

export const getUserGrowthReport = async (months = 6) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    const growth = await User.findAll({
      attributes: [
        [sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`) as any, "month"],
        [
          fn(
            "COUNT",
            sequelize.literal("CASE WHEN role = 'student' THEN 1 END"),
          ) as any,
          "students",
        ],
        [
          fn(
            "COUNT",
            sequelize.literal(
              "CASE WHEN role IN ('admin', 'super_admin') THEN 1 END",
            ),
          ) as any,
          "admins",
        ],
      ],
      where: {
        createdAt: {
          [Op.gte]: cutoffDate,
        },
      },
      group: [sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`) as any],
      order: [
        [sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`) as any, "ASC"],
      ],
      raw: true,
    });
    return growth;
  } catch (error) {
    logger.error("Error fetching user growth report:", error);
    throw error;
  }
};

export const getResourceUsageReport = async () => {
  try {
    const byType = await Resource.findAll({
      attributes: ["type", [fn("COUNT", col("id")), "count"]],
      group: ["type"],
      raw: true,
    });

    // Use raw query for bySubject to avoid issues with NULL subjectIds
    const bySubject = await sequelize.query(
      `
      SELECT 
        r."subjectId",
        COUNT(r.id) as count,
        s.name as "subjectName"
      FROM resources r
      LEFT JOIN subjects s ON r."subjectId" = s.id
      GROUP BY r."subjectId", s.name
      `,
      { type: QueryTypes.SELECT as any },
    );

    return { byType, bySubject };
  } catch (error) {
    logger.error("Error fetching resource usage report:", error);
    throw error;
  }
};

export const getQuizPerformanceReport = async () => {
  try {
    const results = await QuizResult.findAll({
      attributes: [
        "quizId",
        [fn("AVG", col("score")), "avgScore"],
        [fn("COUNT", col("id")), "attempts"],
        [fn("MAX", col("score")), "highScore"],
        [fn("MIN", col("score")), "lowScore"],
      ],
      group: ["quizId"],
      include: [
        {
          model: Quiz,
          as: "quiz",
          attributes: ["id", "title", "subjectId"],
          include: [
            {
              model: Subject,
              as: "subject",
              attributes: ["id", "name"],
              required: false,
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    return results;
  } catch (error) {
    logger.error("Error fetching quiz performance report:", error);
    throw error;
  }
};

// ==================== PERMISSIONS ====================

export const getRolePermissions = async () => {
  try {
    const permissions = await Permission.findAll({
      order: [
        ["category", "ASC"],
        ["name", "ASC"],
      ],
    });

    const rolePerms = await RolePermission.findAll();
    const permsByRole: Record<string, string[]> = {};

    rolePerms.forEach((rp: any) => {
      if (!permsByRole[rp.role]) permsByRole[rp.role] = [];
      permsByRole[rp.role].push(rp.permissionId);
    });

    return {
      permissions,
      rolePermissions: permsByRole,
    };
  } catch (error) {
    logger.error("Error fetching role permissions:", error);
    throw error;
  }
};

export const updateRolePermissions = async (
  role: string,
  permissionIds: string[],
) => {
  try {
    await RolePermission.destroy({ where: { role } });
    const entries = permissionIds.map((permId) => ({
      role,
      permissionId: permId,
      granted: true,
    }));
    await RolePermission.bulkCreate(entries);
    return true;
  } catch (error) {
    logger.error("Error updating role permissions:", error);
    throw error;
  }
};

export const grantUserPermission = async (
  userId: string,
  permissionId: string,
  grantedBy: string,
) => {
  try {
    await UserPermission.upsert({
      userId,
      permissionId,
      granted: true,
      grantedBy,
    });
    return true;
  } catch (error) {
    logger.error("Error granting permission:", error);
    throw error;
  }
};

export const revokeUserPermission = async (
  userId: string,
  permissionId: string,
) => {
  try {
    await UserPermission.destroy({ where: { userId, permissionId } });
    return true;
  } catch (error) {
    logger.error("Error revoking permission:", error);
    throw error;
  }
};

// ==================== SETTINGS ====================

export const getAllSettings = async () => {
  try {
    return await SystemSetting.findAll({ order: [["category", "ASC"]] });
  } catch (error) {
    logger.error("Error fetching settings:", error);
    throw error;
  }
};

export const updateSetting = async (
  key: string,
  value: any,
  updatedBy: string,
) => {
  try {
    const [setting] = await SystemSetting.upsert({
      settingKey: key,
      settingValue: value,
      updatedBy,
    });
    return setting;
  } catch (error) {
    logger.error("Error updating setting:", error);
    throw error;
  }
};

// ==================== NOTIFICATIONS ====================

export const sendBroadcastNotification = async (data: {
  title: string;
  message: string;
  targetRoles?: string[];
  type?: string;
}) => {
  try {
    const notifications: any[] = [];

    if (data.targetRoles && data.targetRoles.length > 0) {
      const users = await User.findAll({
        where: { role: { [Op.in]: data.targetRoles } },
        attributes: ["id"],
      });

      users.forEach((user) => {
        notifications.push({
          userId: user.id,
          title: data.title,
          message: data.message,
          type: data.type || "broadcast",
          isRead: false,
        });
      });
    }

    if (notifications.length > 0) {
      await Notification.bulkCreate(notifications);
    }

    return { sent: notifications.length };
  } catch (error) {
    logger.error("Error sending broadcast notification:", error);
    throw error;
  }
};

// ==================== SYSTEM HEALTH ====================

export const getSystemHealth = async () => {
  try {
    let dbStatus = "connected";
    try {
      await sequelize.authenticate();
    } catch {
      dbStatus = "disconnected";
    }

    const memoryUsage = process.memoryUsage();

    return {
      status: dbStatus === "connected" ? "healthy" : "degraded",
      uptime: Math.floor(process.uptime()) + "s",
      memory: {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + "MB",
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + "MB",
        rss: Math.round(memoryUsage.rss / 1024 / 1024) + "MB",
      },
      database: dbStatus,
      apiVersion: "1.0.0",
      nodeVersion: process.version,
    };
  } catch (error) {
    logger.error("Error getting system health:", error);
    throw error;
  }
};
