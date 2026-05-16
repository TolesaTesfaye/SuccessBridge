import AuditLog from '../models/AuditLog.js'
import { logger } from '../utils/logger.js'
import { Op } from 'sequelize'

interface LogActionParams {
  userId?: string
  action: string
  resource: string
  resourceId?: string
  details?: Record<string, any>
  ipAddress?: string
  userAgent?: string
  status: 'success' | 'failure'
  errorMessage?: string
}

interface QueryOptions {
  userId?: string
  action?: string
  resource?: string
  startDate?: Date
  endDate?: Date
  status?: 'success' | 'failure'
  page?: number
  limit?: number
}

class AuditService {
  /**
   * Log an action to the audit trail
   */
  async logAction(params: LogActionParams): Promise<void> {
    try {
      // Don't block the request - log asynchronously
      setImmediate(async () => {
        try {
          await AuditLog.create({
            userId: params.userId,
            action: params.action,
            resource: params.resource,
            resourceId: params.resourceId,
            details: params.details,
            ipAddress: params.ipAddress,
            userAgent: params.userAgent,
            timestamp: new Date(),
            status: params.status,
            errorMessage: params.errorMessage,
          })
        } catch (error) {
          logger.error('Failed to write audit log:', error)
        }
      })
    } catch (error) {
      logger.error('Error initiating audit log:', error)
    }
  }

  /**
   * Get audit trail for a specific user
   */
  async getAuditTrail(
    userId: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<{ logs: AuditLog[]; total: number; page: number; pages: number }> {
    try {
      const offset = (page - 1) * limit
      const { rows, count } = await AuditLog.findAndCountAll({
        where: { userId },
        order: [['timestamp', 'DESC']],
        limit,
        offset,
      })

      return {
        logs: rows,
        total: count,
        page,
        pages: Math.ceil(count / limit),
      }
    } catch (error) {
      logger.error('Error retrieving audit trail:', error)
      throw error
    }
  }

  /**
   * Query logs with advanced filters
   */
  async queryLogs(
    options: QueryOptions,
  ): Promise<{ logs: AuditLog[]; total: number; page: number; pages: number }> {
    try {
      const page = options.page || 1
      const limit = options.limit || 50
      const offset = (page - 1) * limit

      const where: Record<string, any> = {}

      if (options.userId) {
        where.userId = options.userId
      }
      if (options.action) {
        where.action = options.action
      }
      if (options.resource) {
        where.resource = options.resource
      }
      if (options.status) {
        where.status = options.status
      }

      if (options.startDate || options.endDate) {
        where.timestamp = {}
        if (options.startDate) {
          where.timestamp[Op.gte] = options.startDate
        }
        if (options.endDate) {
          where.timestamp[Op.lte] = options.endDate
        }
      }

      const { rows, count } = await AuditLog.findAndCountAll({
        where,
        order: [['timestamp', 'DESC']],
        limit,
        offset,
      })

      return {
        logs: rows,
        total: count,
        page,
        pages: Math.ceil(count / limit),
      }
    } catch (error) {
      logger.error('Error querying audit logs:', error)
      throw error
    }
  }

  /**
   * Get logs for a specific action
   */
  async getActionLogs(
    action: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<{ logs: AuditLog[]; total: number; page: number; pages: number }> {
    return this.queryLogs({ action, page, limit })
  }

  /**
   * Get failed login attempts
   */
  async getFailedLogins(
    startDate?: Date,
    page: number = 1,
    limit: number = 50,
  ): Promise<{ logs: AuditLog[]; total: number; page: number; pages: number }> {
    return this.queryLogs({
      action: 'login',
      status: 'failure',
      startDate,
      page,
      limit,
    })
  }

  /**
   * Get security-relevant events
   */
  async getSecurityEvents(
    page: number = 1,
    limit: number = 50,
  ): Promise<{ logs: AuditLog[]; total: number; page: number; pages: number }> {
    try {
      const securityActions = [
        'login',
        'logout',
        'password_change',
        'password_reset',
        'permission_change',
        'user_create',
        'user_delete',
        'user_approve',
        'user_reject',
      ]

      const page_num = page || 1
      const limit_num = limit || 50
      const offset = (page_num - 1) * limit_num

      const { rows, count } = await AuditLog.findAndCountAll({
        where: {
          action: {
            [Op.in]: securityActions,
          },
        },
        order: [['timestamp', 'DESC']],
        limit: limit_num,
        offset,
      })

      return {
        logs: rows,
        total: count,
        page: page_num,
        pages: Math.ceil(count / limit_num),
      }
    } catch (error) {
      logger.error('Error retrieving security events:', error)
      throw error
    }
  }

  /**
   * Clear old audit logs (older than specified days)
   */
  async clearOldLogs(daysOld: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysOld)

      const deleted = await AuditLog.destroy({
        where: {
          timestamp: {
            [Op.lt]: cutoffDate,
          },
        },
      })

      logger.info(`Cleared ${deleted} audit logs older than ${daysOld} days`)
      return deleted
    } catch (error) {
      logger.error('Error clearing old audit logs:', error)
      throw error
    }
  }

  /**
   * Get security overview metrics
   */
  async getSecurityOverview(): Promise<{
    totalEvents24h: number
    totalEventsAllTime: number
    failedLogins24h: number
    rateLimitViolations24h: number
    successfulLogins24h: number
  }> {
    try {
      const now = new Date()
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      // Get stats for last 24 hours
      const events24h = await AuditLog.count({
        where: {
          timestamp: {
            [Op.gte]: yesterday,
          },
        },
      })

      const failedLogins24h = await AuditLog.count({
        where: {
          action: 'login',
          status: 'failure',
          timestamp: {
            [Op.gte]: yesterday,
          },
        },
      })

      const successfulLogins24h = await AuditLog.count({
        where: {
          action: 'login',
          status: 'success',
          timestamp: {
            [Op.gte]: yesterday,
          },
        },
      })

      // Count rate limit violations (stored as action: rate_limit_violation)
      const rateLimitViolations24h = await AuditLog.count({
        where: {
          action: 'rate_limit_violation',
          timestamp: {
            [Op.gte]: yesterday,
          },
        },
      })

      // Get all-time event count
      const totalEventsAllTime = await AuditLog.count()

      return {
        totalEvents24h: events24h,
        totalEventsAllTime,
        failedLogins24h,
        rateLimitViolations24h,
        successfulLogins24h,
      }
    } catch (error) {
      logger.error('Error getting security overview:', error)
      throw error
    }
  }

  /**
   * Get security events timeline for the last N hours
   */
  async getEventsTimeline(hoursBack: number = 24): Promise<Array<{
    timestamp: string
    count: number
    failureCount: number
  }>> {
    try {
      const now = new Date()
      const startTime = new Date(now.getTime() - hoursBack * 60 * 60 * 1000)

      const logs = await AuditLog.findAll({
        where: {
          timestamp: {
            [Op.gte]: startTime,
          },
        },
        order: [['timestamp', 'ASC']],
      })

      // Group by hour
      const timeline: Record<string, { count: number; failureCount: number }> = {}

      logs.forEach((log: any) => {
        // Round timestamp to nearest hour
        const date = new Date(log.timestamp)
        date.setMinutes(0, 0, 0)
        const key = date.toISOString()

        if (!timeline[key]) {
          timeline[key] = { count: 0, failureCount: 0 }
        }

        timeline[key].count++
        if (log.status === 'failure') {
          timeline[key].failureCount++
        }
      })

      return Object.entries(timeline).map(([timestamp, data]) => ({
        timestamp,
        count: data.count,
        failureCount: data.failureCount,
      }))
    } catch (error) {
      logger.error('Error getting events timeline:', error)
      throw error
    }
  }

  /**
   * Get failed login attempts grouped by IP
   */
  async getFailedLoginsByIP(limit: number = 10): Promise<Array<{
    ipAddress: string
    failureCount: number
    lastAttempt: Date
    targetUsers: string[]
  }>> {
    try {
      const now = new Date()
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      const logs = await AuditLog.findAll({
        where: {
          action: 'login',
          status: 'failure',
          timestamp: {
            [Op.gte]: yesterday,
          },
        },
        order: [['timestamp', 'DESC']],
      })

      // Group by IP address
      const ipMap: Record<string, {
        failureCount: number
        lastAttempt: Date
        targetUsers: Set<string>
      }> = {}

      logs.forEach((log: any) => {
        const ip = log.ipAddress || 'unknown'

        if (!ipMap[ip]) {
          ipMap[ip] = {
            failureCount: 0,
            lastAttempt: log.timestamp,
            targetUsers: new Set(),
          }
        }

        ipMap[ip].failureCount++
        if (log.userId) {
          ipMap[ip].targetUsers.add(log.userId)
        }
      })

      // Convert to array and sort by failure count
      return Object.entries(ipMap)
        .map(([ip, data]) => ({
          ipAddress: ip,
          failureCount: data.failureCount,
          lastAttempt: data.lastAttempt,
          targetUsers: Array.from(data.targetUsers),
        }))
        .sort((a, b) => b.failureCount - a.failureCount)
        .slice(0, limit)
    } catch (error) {
      logger.error('Error getting failed logins by IP:', error)
      throw error
    }
  }

  /**
   * Get failed login attempts grouped by user email
   */
  async getFailedLoginsByUser(limit: number = 10): Promise<Array<{
    email: string
    userId: string
    failureCount: number
    lastAttempt: Date
    sourceIPs: string[]
  }>> {
    try {
      const now = new Date()
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      const logs = await AuditLog.findAll({
        where: {
          action: 'login',
          status: 'failure',
          userId: {
            [Op.not]: null,
          },
          timestamp: {
            [Op.gte]: yesterday,
          },
        },
        order: [['timestamp', 'DESC']],
      })

      // Group by user
      const userMap: Record<string, {
        email?: string
        failureCount: number
        lastAttempt: Date
        sourceIPs: Set<string>
      }> = {}

      logs.forEach((log: any) => {
        if (!log.userId) return

        if (!userMap[log.userId]) {
          userMap[log.userId] = {
            email: log.details?.email || 'unknown',
            failureCount: 0,
            lastAttempt: log.timestamp,
            sourceIPs: new Set(),
          }
        }

        userMap[log.userId].failureCount++
        if (log.ipAddress) {
          userMap[log.userId].sourceIPs.add(log.ipAddress)
        }
      })

      // Convert to array and sort by failure count
      return Object.entries(userMap)
        .map(([userId, data]) => ({
          email: data.email || 'unknown',
          userId,
          failureCount: data.failureCount,
          lastAttempt: data.lastAttempt,
          sourceIPs: Array.from(data.sourceIPs),
        }))
        .sort((a, b) => b.failureCount - a.failureCount)
        .slice(0, limit)
    } catch (error) {
      logger.error('Error getting failed logins by user:', error)
      throw error
    }
  }

  /**
   * Get suspicious patterns (multiple failed attempts)
   */
  async getSuspiciousPatterns(): Promise<Array<{
    type: 'brute_force_ip' | 'targeted_user' | 'distributed_attack'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    affectedCount: number
    timestamp: Date
  }>> {
    try {
      const now = new Date()
      const lastHour = new Date(now.getTime() - 60 * 60 * 1000)

      const patterns: Array<{
        type: 'brute_force_ip' | 'targeted_user' | 'distributed_attack'
        severity: 'low' | 'medium' | 'high' | 'critical'
        description: string
        affectedCount: number
        timestamp: Date
      }> = []

      // Pattern 1: Brute force from single IP (>10 failed attempts in 1 hour)
      const ipFailures = await AuditLog.findAll({
        where: {
          action: 'login',
          status: 'failure',
          timestamp: {
            [Op.gte]: lastHour,
          },
        },
      })

      const ipMap: Record<string, number> = {}
      ipFailures.forEach((log: any) => {
        const ip = log.ipAddress || 'unknown'
        ipMap[ip] = (ipMap[ip] || 0) + 1
      })

      Object.entries(ipMap).forEach(([ip, count]) => {
        if (count > 10) {
          patterns.push({
            type: 'brute_force_ip',
            severity: count > 50 ? 'critical' : count > 20 ? 'high' : 'medium',
            description: `Brute force attack from IP ${ip}`,
            affectedCount: count,
            timestamp: now,
          })
        }
      })

      // Pattern 2: Targeted user (>5 failed attempts in 1 hour from different IPs)
      const userFailures = await AuditLog.findAll({
        where: {
          action: 'login',
          status: 'failure',
          userId: { [Op.not]: null },
          timestamp: {
            [Op.gte]: lastHour,
          },
        },
      })

      const userMap: Record<string, Set<string>> = {}
      userFailures.forEach((log: any) => {
        if (!log.userId) return
        if (!userMap[log.userId]) {
          userMap[log.userId] = new Set()
        }
        if (log.ipAddress) {
          userMap[log.userId].add(log.ipAddress)
        }
      })

      Object.entries(userMap).forEach(([userId, ips]) => {
        if (ips.size > 5) {
          patterns.push({
            type: 'distributed_attack',
            severity: ips.size > 20 ? 'critical' : 'high',
            description: `Distributed attack on user account from ${ips.size} different IPs`,
            affectedCount: ips.size,
            timestamp: now,
          })
        }
      })

      return patterns.sort((a, b) => {
        const severityMap = { critical: 4, high: 3, medium: 2, low: 1 }
        return severityMap[b.severity] - severityMap[a.severity]
      })
    } catch (error) {
      logger.error('Error getting suspicious patterns:', error)
      throw error
    }
  }
}

export default new AuditService()
