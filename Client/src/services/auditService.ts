import axios from 'axios'

export interface IAuditLog {
  id: string
  userId?: string
  action: string
  resource: string
  resourceId?: string
  details?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  timestamp: Date
  status: 'success' | 'failure'
  errorMessage?: string
}

class AuditService {
  /**
   * Query audit logs with filters
   */
  async queryLogs(options: {
    page?: number
    limit?: number
    userId?: string
    action?: string
    status?: 'success' | 'failure'
    startDate?: Date
    endDate?: Date
  }) {
    try {
      const response = await axios.get<{
        success: boolean
        data: { logs: IAuditLog[]; total: number; page: number; pages: number }
      }>('/api/admin/audit-logs', { params: options })

      return response.data.data
    } catch (error) {
      console.error('Failed to query audit logs:', error)
      throw error
    }
  }

  /**
   * Get audit trail for a specific user
   */
  async getAuditTrail(userId: string, page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get<{
        success: boolean
        data: { logs: IAuditLog[]; total: number; page: number; pages: number }
      }>(`/api/admin/audit-logs/user/${userId}`, { params: { page, limit } })

      return response.data.data
    } catch (error) {
      console.error('Failed to get audit trail:', error)
      throw error
    }
  }

  /**
   * Get logs for a specific action
   */
  async getActionLogs(action: string, page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get<{
        success: boolean
        data: { logs: IAuditLog[]; total: number; page: number; pages: number }
      }>(`/api/admin/audit-logs/action/${action}`, { params: { page, limit } })

      return response.data.data
    } catch (error) {
      console.error('Failed to get action logs:', error)
      throw error
    }
  }

  /**
   * Get failed login attempts
   */
  async getFailedLogins(page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get<{
        success: boolean
        data: { logs: IAuditLog[]; total: number; page: number; pages: number }
      }>('/api/admin/audit-logs/failed-logins', { params: { page, limit } })

      return response.data.data
    } catch (error) {
      console.error('Failed to get failed logins:', error)
      throw error
    }
  }

  /**
   * Get security-relevant events
   */
  async getSecurityEvents(page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get<{
        success: boolean
        data: { logs: IAuditLog[]; total: number; page: number; pages: number }
      }>('/api/admin/audit-logs/security-events', { params: { page, limit } })

      return response.data.data
    } catch (error) {
      console.error('Failed to get security events:', error)
      throw error
    }
  }

  /**
   * Get audit trail for current user
   */
  async getMyAuditTrail(userId: string, page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get<{
        success: boolean
        data: { logs: IAuditLog[]; total: number; page: number; pages: number }
      }>(`/api/admin/audit-logs/user/${userId}/events`, { params: { page, limit } })

      return response.data.data
    } catch (error) {
      console.error('Failed to get my audit trail:', error)
      throw error
    }
  }
}

export const auditService = new AuditService()
