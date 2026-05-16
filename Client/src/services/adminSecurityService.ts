import axios from 'axios'

const API_BASE_URL = '/api/admin/security'

export interface SecurityOverviewMetrics {
  totalEvents24h: number
  totalEventsAllTime: number
  failedLogins24h: number
  rateLimitViolations24h: number
  successfulLogins24h: number
}

export interface TimelineEvent {
  timestamp: string
  count: number
  failureCount: number
}

export interface FailedLogin {
  id: string
  userId: string
  action: string
  resource: string
  status: 'success' | 'failure'
  ipAddress: string
  userAgent: string
  timestamp: Date
  details?: Record<string, any>
  errorMessage?: string
}

export interface FailedLoginsByIP {
  ipAddress: string
  failureCount: number
  lastAttempt: Date
  targetUsers: string[]
}

export interface FailedLoginsByUser {
  email: string
  userId: string
  failureCount: number
  lastAttempt: Date
  sourceIPs: string[]
}

export interface SuspiciousPattern {
  type: 'brute_force_ip' | 'targeted_user' | 'distributed_attack'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  affectedCount: number
  timestamp: Date
}

class AdminSecurityService {
  /**
   * Get security dashboard overview metrics
   */
  async getOverview(): Promise<SecurityOverviewMetrics> {
    try {
      const response = await axios.get<{ success: boolean; data: SecurityOverviewMetrics }>(
        `${API_BASE_URL}/overview`,
      )
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch security overview:', error)
      throw error
    }
  }

  /**
   * Get security events timeline
   */
  async getEventsTimeline(hoursBack: number = 24): Promise<TimelineEvent[]> {
    try {
      const response = await axios.get<{ success: boolean; data: TimelineEvent[] }>(
        `${API_BASE_URL}/events/timeline`,
        { params: { hoursBack } },
      )
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch events timeline:', error)
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
        data: { logs: FailedLogin[]; total: number; page: number; pages: number }
      }>(`${API_BASE_URL}/failed-logins`, { params: { page, limit } })
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch failed logins:', error)
      throw error
    }
  }

  /**
   * Get failed logins grouped by IP address
   */
  async getFailedLoginsByIP(limit: number = 10): Promise<FailedLoginsByIP[]> {
    try {
      const response = await axios.get<{ success: boolean; data: FailedLoginsByIP[] }>(
        `${API_BASE_URL}/failed-logins/by-ip`,
        { params: { limit } },
      )
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch failed logins by IP:', error)
      throw error
    }
  }

  /**
   * Get failed logins grouped by user
   */
  async getFailedLoginsByUser(limit: number = 10): Promise<FailedLoginsByUser[]> {
    try {
      const response = await axios.get<{ success: boolean; data: FailedLoginsByUser[] }>(
        `${API_BASE_URL}/failed-logins/by-user`,
        { params: { limit } },
      )
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch failed logins by user:', error)
      throw error
    }
  }

  /**
   * Get suspicious patterns detected
   */
  async getSuspiciousPatterns(): Promise<SuspiciousPattern[]> {
    try {
      const response = await axios.get<{ success: boolean; data: SuspiciousPattern[] }>(
        `${API_BASE_URL}/suspicious-patterns`,
      )
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch suspicious patterns:', error)
      throw error
    }
  }

  /**
   * Get active sessions (placeholder)
   */
  async getSessions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/sessions`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
      throw error
    }
  }

  /**
   * Get file uploads (placeholder)
   */
  async getUploads(page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get(`${API_BASE_URL}/uploads`, {
        params: { page, limit },
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch uploads:', error)
      throw error
    }
  }

  /**
   * Get CSRF token metrics (placeholder)
   */
  async getCSRFMetrics() {
    try {
      const response = await axios.get(`${API_BASE_URL}/csrf`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch CSRF metrics:', error)
      throw error
    }
  }

  /**
   * Get security headers info (placeholder)
   */
  async getSecurityHeaders() {
    try {
      const response = await axios.get(`${API_BASE_URL}/headers`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch security headers:', error)
      throw error
    }
  }

  /**
   * Get security alerts (placeholder)
   */
  async getAlerts(page: number = 1, limit: number = 50) {
    try {
      const response = await axios.get(`${API_BASE_URL}/alerts`, {
        params: { page, limit },
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch alerts:', error)
      throw error
    }
  }
}

export const adminSecurityService = new AdminSecurityService()
