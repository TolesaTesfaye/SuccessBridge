import { Op } from "sequelize";
import User from "../models/User.js";
import Permission from "../models/Permission.js";
import SystemSetting from "../models/SystemSetting.js";
import Announcement from "../models/Announcement.js";
import AuditLog from "../models/AuditLog.js";
import UserPermission from "../models/UserPermission.js";
import RolePermission from "../models/RolePermission.js";
import UserRestriction from "../models/UserRestriction.js";
import { logger } from "../utils/logger.js";

class ManagementService {
  // ==================== PERMISSION MANAGEMENT ====================

  async getAllPermissions(): Promise<any[]> {
    try {
      const permissions = await Permission.findAll({
        order: [
          ["category", "ASC"],
          ["name", "ASC"],
        ],
      });
      return permissions;
    } catch (error) {
      logger.error("Error fetching permissions:", error);
      throw error;
    }
  }

  async getPermissionsByCategory(): Promise<Record<string, any[]>> {
    try {
      const permissions = await Permission.findAll({
        order: [
          ["category", "ASC"],
          ["name", "ASC"],
        ],
      });
      const grouped: Record<string, any[]> = {};
      permissions.forEach((p) => {
        if (!grouped[p.category]) grouped[p.category] = [];
        grouped[p.category].push(p);
      });
      return grouped;
    } catch (error) {
      logger.error("Error fetching permissions by category:", error);
      throw error;
    }
  }

  async getUserPermissions(userId: string): Promise<{
    role: string;
    permissions: string[];
    granted: string[];
    denied: string[];
  }> {
    try {
      const user = await User.findByPk(userId);
      if (!user) throw new Error("User not found");

      // Get all permissions matching the user's role
      const rolePerms = await Permission.findAll({
        include: [
          {
            association: "rolePermissions",
            where: { role: user.role, granted: true },
            required: false,
          },
        ],
      });

      const rolePermissions = rolePerms
        .filter((p: any) => p.rolePermissions?.length > 0)
        .map((p: any) => p.name);

      // Get individual user overrides
      const userPerms = await Permission.findAll({
        include: [
          {
            association: "userPermissions",
            where: { userId, granted: true },
            required: false,
          },
        ],
      });

      const grantedExtras = userPerms
        .filter(
          (p: any) =>
            p.userPermissions?.length > 0 && !rolePermissions.includes(p.name),
        )
        .map((p: any) => p.name);

      const deniedPerms = await Permission.findAll({
        include: [
          {
            association: "userPermissions",
            where: { userId, granted: false },
            required: true,
          },
        ],
      }).then((perms) => perms.map((p: any) => p.name));

      return {
        role: user.role,
        permissions: [...new Set([...rolePermissions, ...grantedExtras])],
        granted: grantedExtras,
        denied: deniedPerms,
      };
    } catch (error) {
      logger.error("Error getting user permissions:", error);
      throw error;
    }
  }

  async grantUserPermission(
    userId: string,
    permissionId: string,
    grantedBy: string,
  ): Promise<boolean> {
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
  }

  async revokeUserPermission(
    userId: string,
    permissionId: string,
  ): Promise<boolean> {
    try {
      await UserPermission.destroy({
        where: { userId, permissionId },
      });
      return true;
    } catch (error) {
      logger.error("Error revoking permission:", error);
      throw error;
    }
  }

  async updateRolePermissions(
    role: string,
    permissionIds: string[],
  ): Promise<boolean> {
    try {
      // Remove existing
      await RolePermission.destroy({ where: { role } });
      // Add new
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
  }

  // ==================== SYSTEM SETTINGS ====================

  async getAllSettings(): Promise<SystemSetting[]> {
    try {
      return await SystemSetting.findAll({ order: [["category", "ASC"]] });
    } catch (error) {
      logger.error("Error fetching settings:", error);
      throw error;
    }
  }

  async getSetting(key: string): Promise<SystemSetting | null> {
    try {
      return await SystemSetting.findOne({ where: { settingKey: key } });
    } catch (error) {
      logger.error("Error fetching setting:", error);
      throw error;
    }
  }

  async updateSetting(
    key: string,
    value: any,
    updatedBy: string,
  ): Promise<SystemSetting> {
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
  }

  // ==================== ANNOUNCEMENT MANAGEMENT ====================

  async getAnnouncements(filters: {
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    announcements: any[];
    total: number;
    page: number;
    pages: number;
  }> {
    try {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      const where: any = {};
      if (filters.isActive !== undefined) where.isActive = filters.isActive;

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
  }

  async createAnnouncement(data: {
    title: string;
    content: string;
    type?: string;
    targetRoles?: string[];
    targetEducationLevels?: string[];
    createdBy?: string;
    scheduledAt?: Date;
    expiresAt?: Date;
  }): Promise<Announcement> {
    try {
      return await Announcement.create(data);
    } catch (error) {
      logger.error("Error creating announcement:", error);
      throw error;
    }
  }

  async updateAnnouncement(
    id: string,
    data: Partial<{
      title: string;
      content: string;
      type: string;
      targetRoles: string[];
      targetEducationLevels: string[];
      isActive: boolean;
      scheduledAt: Date;
      expiresAt: Date;
    }>,
  ): Promise<Announcement> {
    try {
      const announcement = await Announcement.findByPk(id);
      if (!announcement) throw new Error("Announcement not found");
      await announcement.update(data);
      return announcement;
    } catch (error) {
      logger.error("Error updating announcement:", error);
      throw error;
    }
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    try {
      const deleted = await Announcement.destroy({ where: { id } });
      return deleted > 0;
    } catch (error) {
      logger.error("Error deleting announcement:", error);
      throw error;
    }
  }

  async toggleAnnouncement(id: string): Promise<Announcement> {
    try {
      const announcement = await Announcement.findByPk(id);
      if (!announcement) throw new Error("Announcement not found");
      await announcement.update({ isActive: !announcement.isActive });
      return announcement;
    } catch (error) {
      logger.error("Error toggling announcement:", error);
      throw error;
    }
  }

  // ==================== USER MANAGEMENT (BAN/SUSPEND) ====================

  async restrictUser(data: {
    userId: string;
    restrictionType: "ban" | "suspend" | "read_only";
    reason: string;
    durationHours?: number;
    appliedBy: string;
  }): Promise<any> {
    try {
      // Deactivate any existing active restrictions
      await UserRestriction.update(
        { isActive: false },
        { where: { userId: data.userId, isActive: true } },
      );

      const expiresAt = data.durationHours
        ? new Date(Date.now() + data.durationHours * 60 * 60 * 1000)
        : undefined;

      const restriction = await UserRestriction.create({
        userId: data.userId,
        restrictionType: data.restrictionType,
        reason: data.reason,
        durationHours: data.durationHours,
        appliedBy: data.appliedBy,
        expiresAt,
        isActive: true,
      });

      // Log the action in audit
      const auditService = (await import("./auditService.js")).default;
      auditService.logAction({
        userId: data.appliedBy,
        action: "user_restricted",
        resource: "user",
        resourceId: data.userId,
        details: {
          restrictionType: data.restrictionType,
          reason: data.reason,
          durationHours: data.durationHours,
        },
        status: "success",
      });

      return restriction;
    } catch (error) {
      logger.error("Error restricting user:", error);
      throw error;
    }
  }

  async liftRestriction(restrictionId: string, liftedBy: string): Promise<any> {
    try {
      const restriction = await UserRestriction.findByPk(restrictionId);
      if (!restriction) throw new Error("Restriction not found");

      await restriction.update({
        isActive: false,
        liftedBy,
        liftedAt: new Date(),
      });

      return restriction;
    } catch (error) {
      logger.error("Error lifting restriction:", error);
      throw error;
    }
  }

  async getActiveRestrictions(): Promise<any[]> {
    try {
      return await UserRestriction.findAll({
        where: { isActive: true },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name", "email", "role"],
          },
          {
            model: User,
            as: "appliedByUser",
            attributes: ["id", "name"],
          },
        ],
        order: [["appliedAt", "DESC"]],
      });
    } catch (error) {
      logger.error("Error fetching restrictions:", error);
      throw error;
    }
  }

  // ==================== SYSTEM HEALTH & LOGS ====================

  async getSystemHealth(): Promise<{
    status: string;
    uptime: string;
    memory: any;
    database: string;
    apiVersion: string;
  }> {
    try {
      // Check database connectivity
      const sequelize = (await import("../config/database.js")).default;
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
      };
    } catch (error) {
      logger.error("Error getting system health:", error);
      throw error;
    }
  }
}

export default new ManagementService();
