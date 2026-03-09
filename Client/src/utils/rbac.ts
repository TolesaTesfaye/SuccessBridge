import type { User } from '../types/index'

export type UserRole = 'student' | 'admin' | 'super_admin'

export interface Permission {
  action: string
  roles: UserRole[]
}

// Define all permissions in the system
export const PERMISSIONS: Record<string, Permission> = {
  // Resource permissions
  VIEW_RESOURCES: { action: 'view_resources', roles: ['student', 'admin', 'super_admin'] },
  UPLOAD_RESOURCES: { action: 'upload_resources', roles: ['admin', 'super_admin'] },
  DELETE_RESOURCES: { action: 'delete_resources', roles: ['admin', 'super_admin'] },
  APPROVE_RESOURCES: { action: 'approve_resources', roles: ['super_admin'] },

  // Quiz permissions
  VIEW_QUIZZES: { action: 'view_quizzes', roles: ['student', 'admin', 'super_admin'] },
  CREATE_QUIZZES: { action: 'create_quizzes', roles: ['admin', 'super_admin'] },
  EDIT_QUIZZES: { action: 'edit_quizzes', roles: ['admin', 'super_admin'] },
  DELETE_QUIZZES: { action: 'delete_quizzes', roles: ['admin', 'super_admin'] },
  SUBMIT_QUIZZES: { action: 'submit_quizzes', roles: ['student'] },

  // User management
  VIEW_USERS: { action: 'view_users', roles: ['admin', 'super_admin'] },
  CREATE_USERS: { action: 'create_users', roles: ['admin', 'super_admin'] },
  EDIT_USERS: { action: 'edit_users', roles: ['admin', 'super_admin'] },
  DELETE_USERS: { action: 'delete_users', roles: ['super_admin'] },

  // Admin management
  CREATE_ADMINS: { action: 'create_admins', roles: ['super_admin'] },
  DELETE_ADMINS: { action: 'delete_admins', roles: ['super_admin'] },
  ASSIGN_ADMIN_UNIVERSITY: { action: 'assign_admin_university', roles: ['super_admin'] },

  // Department management
  MANAGE_DEPARTMENTS: { action: 'manage_departments', roles: ['admin', 'super_admin'] },
  CREATE_DEPARTMENTS: { action: 'create_departments', roles: ['super_admin'] },
  DELETE_DEPARTMENTS: { action: 'delete_departments', roles: ['super_admin'] },

  // University management
  MANAGE_UNIVERSITIES: { action: 'manage_universities', roles: ['super_admin'] },
  CREATE_UNIVERSITIES: { action: 'create_universities', roles: ['super_admin'] },
  DELETE_UNIVERSITIES: { action: 'delete_universities', roles: ['super_admin'] },

  // Subject management
  MANAGE_SUBJECTS: { action: 'manage_subjects', roles: ['admin', 'super_admin'] },
  CREATE_SUBJECTS: { action: 'create_subjects', roles: ['admin', 'super_admin'] },
  DELETE_SUBJECTS: { action: 'delete_subjects', roles: ['admin', 'super_admin'] },

  // Analytics
  VIEW_ANALYTICS: { action: 'view_analytics', roles: ['admin', 'super_admin'] },
  VIEW_SYSTEM_ANALYTICS: { action: 'view_system_analytics', roles: ['super_admin'] },

  // System settings
  MANAGE_SYSTEM_SETTINGS: { action: 'manage_system_settings', roles: ['super_admin'] },
  VIEW_SECURITY_LOGS: { action: 'view_security_logs', roles: ['super_admin'] },
}

/**
 * Check if a user has permission to perform an action
 */
export const hasPermission = (user: User | null, permissionKey: string): boolean => {
  if (!user) return false

  const permission = PERMISSIONS[permissionKey]
  if (!permission) return false

  return permission.roles.includes(user.role as UserRole)
}

/**
 * Check if a user has any of the specified permissions
 */
export const hasAnyPermission = (user: User | null, permissionKeys: string[]): boolean => {
  return permissionKeys.some(key => hasPermission(user, key))
}

/**
 * Check if a user has all of the specified permissions
 */
export const hasAllPermissions = (user: User | null, permissionKeys: string[]): boolean => {
  return permissionKeys.every(key => hasPermission(user, key))
}

/**
 * Get all permissions for a user role
 */
export const getPermissionsForRole = (role: UserRole): string[] => {
  return Object.entries(PERMISSIONS)
    .filter(([_, permission]) => permission.roles.includes(role))
    .map(([key]) => key)
}

/**
 * Check if user can access a specific dashboard
 */
export const canAccessDashboard = (user: User | null, dashboard: 'student' | 'admin' | 'superadmin'): boolean => {
  if (!user) return false

  const dashboardRoles: Record<string, UserRole[]> = {
    student: ['student'],
    admin: ['admin'],
    superadmin: ['super_admin'],
  }

  return dashboardRoles[dashboard]?.includes(user.role as UserRole) ?? false
}
