import api from "./api";

const API_BASE = "/admin/admin";

// ==================== INTERFACES ====================

export interface DashboardStats {
  users: { total: number; active: number; growth: any[] };
  resources: { total: number };
  quizzes: { total: number };
  announcements: { total: number; active: number };
  payments: { total: number; revenue: number };
}

export interface ActivityLog {
  id: string;
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  details?: any;
  status?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string; role: string };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  studentType?: string;
  university?: string;
  department?: string;
  isApproved?: boolean;
  approvalStatus?: string;
  isEmailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: string;
  fileUrl: string;
  educationLevel: string;
  subjectId: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  uploader?: { id: string; name: string; email: string };
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  createdBy?: string;
  timeLimit?: number;
  passingScore?: number;
  isPublished?: boolean;
  createdAt: string;
  updatedAt: string;
  subject?: { id: string; name: string };
  creator?: { id: string; name: string; email: string };
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
  departmentId?: string;
  gradeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  targetRoles?: string[];
  targetEducationLevels?: string[];
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  details?: any;
  status?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string; role: string };
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category: string;
}

export interface SystemSetting {
  id: string;
  settingKey: string;
  settingValue: any;
  description?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthStatus {
  status: string;
  uptime: string;
  memory: { heapUsed: string; heapTotal: string; rss: string };
  database: string;
  apiVersion: string;
  nodeVersion: string;
}

// ==================== ADMIN SERVICE ====================

class AdminService {
  // ==================== DASHBOARD ====================

  async getDashboardStats(): Promise<DashboardStats> {
    const res = await api.get(`${API_BASE}/dashboard/stats`);
    return res.data.data;
  }

  async getRecentActivity(limit = 20): Promise<ActivityLog[]> {
    const res = await api.get(`${API_BASE}/dashboard/activity`, {
      params: { limit },
    });
    return res.data.data;
  }

  // ==================== USER MANAGEMENT ====================

  async getUsers(filters?: {
    role?: string;
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number; page: number; pages: number }> {
    const res = await api.get(`${API_BASE}/users`, { params: filters });
    return res.data.data;
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const res = await api.put(`${API_BASE}/users/${userId}`, data);
    return res.data.data;
  }

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`${API_BASE}/users/${userId}`);
  }

  async bulkUpdateUsers(userIds: string[], data: any): Promise<void> {
    await api.post(`${API_BASE}/users/bulk`, { userIds, data });
  }

  // ==================== CONTENT MANAGEMENT ====================

  async getResources(filters?: {
    page?: number;
    limit?: number;
  }): Promise<{
    resources: Resource[];
    total: number;
    page: number;
    pages: number;
  }> {
    const res = await api.get(`${API_BASE}/resources`, { params: filters });
    return res.data.data;
  }

  // ==================== QUIZ MANAGEMENT ====================

  async getQuizzes(filters?: {
    subjectId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ quizzes: Quiz[]; total: number; page: number; pages: number }> {
    const res = await api.get(`${API_BASE}/quizzes`, { params: filters });
    return res.data.data;
  }

  // ==================== SUBJECT MANAGEMENT ====================

  async getSubjects(): Promise<Subject[]> {
    const res = await api.get(`${API_BASE}/subjects`);
    return res.data.data;
  }

  // ==================== ANNOUNCEMENT MANAGEMENT ====================

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

  // ==================== AUDIT LOGS ====================

  async getAuditLogs(filters?: {
    action?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    logs: AuditLog[];
    total: number;
    page: number;
    pages: number;
  }> {
    const res = await api.get(`${API_BASE}/audit-logs`, { params: filters });
    return res.data.data;
  }

  // ==================== REPORTS ====================

  async getUserGrowthReport(months = 6): Promise<any[]> {
    const res = await api.get(`${API_BASE}/reports/user-growth`, {
      params: { months },
    });
    return res.data.data;
  }

  async getResourceUsageReport(): Promise<{ byType: any[]; bySubject: any[] }> {
    const res = await api.get(`${API_BASE}/reports/resource-usage`);
    return res.data.data;
  }

  async getQuizPerformanceReport(): Promise<any[]> {
    const res = await api.get(`${API_BASE}/reports/quiz-performance`);
    return res.data.data;
  }

  // ==================== PERMISSIONS ====================

  async getPermissions(): Promise<{
    permissions: Permission[];
    rolePermissions: Record<string, string[]>;
  }> {
    const res = await api.get(`${API_BASE}/permissions`);
    return res.data.data;
  }

  async updateRolePermissions(
    role: string,
    permissionIds: string[],
  ): Promise<void> {
    await api.put(`${API_BASE}/permissions/role/${role}`, { permissionIds });
  }

  async grantPermission(userId: string, permissionId: string): Promise<void> {
    await api.post(`${API_BASE}/permissions/grant`, { userId, permissionId });
  }

  async revokePermission(userId: string, permissionId: string): Promise<void> {
    await api.post(`${API_BASE}/permissions/revoke`, { userId, permissionId });
  }

  // ==================== SETTINGS ====================

  async getAllSettings(): Promise<SystemSetting[]> {
    const res = await api.get(`${API_BASE}/settings`);
    return res.data.data;
  }

  async updateSetting(key: string, value: any): Promise<SystemSetting> {
    const res = await api.put(`${API_BASE}/settings/${key}`, { value });
    return res.data.data;
  }

  // ==================== NOTIFICATIONS ====================

  async sendBroadcastNotification(data: {
    title: string;
    message: string;
    targetRoles?: string[];
    type?: string;
  }): Promise<{ sent: number }> {
    const res = await api.post(`${API_BASE}/notifications/broadcast`, data);
    return res.data.data;
  }

  // ==================== SYSTEM HEALTH ====================

  async getSystemHealth(): Promise<HealthStatus> {
    const res = await api.get(`${API_BASE}/health`);
    return res.data.data;
  }
}

export const adminService = new AdminService();
