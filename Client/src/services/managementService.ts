import api from "./api";

const API_BASE = "/admin/management";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  targetRoles?: string[];
  targetEducationLevels?: string[];
  isActive: boolean;
  createdBy?: string;
  scheduledAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemSetting {
  id: string;
  settingKey: string;
  settingValue: any;
  description?: string;
  category: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category: string;
}

export interface UserRestriction {
  id: string;
  userId: string;
  restrictionType: string;
  reason: string;
  durationHours?: number;
  appliedBy?: string;
  appliedAt: string;
  expiresAt?: string;
  isActive: boolean;
  user?: { id: string; name: string; email: string; role: string };
}

class ManagementService {
  // ==================== PERMISSIONS ====================

  async getPermissionsByCategory(): Promise<Record<string, Permission[]>> {
    const res = await api.get(`${API_BASE}/permissions`);
    return res.data.data;
  }

  async getAllPermissions(): Promise<Permission[]> {
    const res = await api.get(`${API_BASE}/permissions/all`);
    return res.data.data;
  }

  async getUserPermissions(userId: string): Promise<any> {
    const res = await api.get(`${API_BASE}/permissions/user/${userId}`);
    return res.data.data;
  }

  async grantPermission(userId: string, permissionId: string): Promise<void> {
    await api.post(`${API_BASE}/permissions/grant`, { userId, permissionId });
  }

  async revokePermission(userId: string, permissionId: string): Promise<void> {
    await api.post(`${API_BASE}/permissions/revoke`, { userId, permissionId });
  }

  async updateRolePermissions(
    role: string,
    permissionIds: string[],
  ): Promise<void> {
    await api.put(`${API_BASE}/permissions/role/${role}`, { permissionIds });
  }

  // ==================== SYSTEM SETTINGS ====================

  async getAllSettings(): Promise<SystemSetting[]> {
    const res = await api.get(`${API_BASE}/settings`);
    return res.data.data;
  }

  async getSetting(key: string): Promise<SystemSetting> {
    const res = await api.get(`${API_BASE}/settings/${key}`);
    return res.data.data;
  }

  async updateSetting(key: string, value: any): Promise<SystemSetting> {
    const res = await api.put(`${API_BASE}/settings/${key}`, { value });
    return res.data.data;
  }

  // ==================== ANNOUNCEMENTS ====================

  async getAnnouncements(filters?: {
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    announcements: Announcement[];
    total: number;
    page: number;
    pages: number;
  }> {
    const res = await api.get(`${API_BASE}/announcements`, { params: filters });
    return res.data.data;
  }

  async createAnnouncement(data: Partial<Announcement>): Promise<Announcement> {
    const res = await api.post(`${API_BASE}/announcements`, data);
    return res.data.data;
  }

  async updateAnnouncement(
    id: string,
    data: Partial<Announcement>,
  ): Promise<Announcement> {
    const res = await api.put(`${API_BASE}/announcements/${id}`, data);
    return res.data.data;
  }

  async deleteAnnouncement(id: string): Promise<void> {
    await api.delete(`${API_BASE}/announcements/${id}`);
  }

  async toggleAnnouncement(id: string): Promise<Announcement> {
    const res = await api.post(`${API_BASE}/announcements/${id}/toggle`);
    return res.data.data;
  }

  // ==================== USER RESTRICTIONS ====================

  async restrictUser(data: {
    userId: string;
    restrictionType: string;
    reason: string;
    durationHours?: number;
  }): Promise<any> {
    const res = await api.post(`${API_BASE}/restrict`, data);
    return res.data.data;
  }

  async liftRestriction(restrictionId: string): Promise<any> {
    const res = await api.post(`${API_BASE}/restrict/${restrictionId}/lift`);
    return res.data.data;
  }

  async getActiveRestrictions(): Promise<UserRestriction[]> {
    const res = await api.get(`${API_BASE}/restrictions`);
    return res.data.data;
  }

  // ==================== SYSTEM HEALTH ====================

  async getSystemHealth(): Promise<any> {
    const res = await api.get(`${API_BASE}/health`);
    return res.data.data;
  }

  // ==================== USERS (for dropdowns) ====================

  async getUsers(filters?: {
    role?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<any> {
    const res = await api.get(`${API_BASE}/users`, { params: filters });
    return res.data.data;
  }
}

export const managementService = new ManagementService();
