import express from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import SystemSetting from '../models/SystemSetting.js'
import { logger } from '../utils/logger.js'

const router = express.Router()

const DEFAULT_SETTINGS: Record<string, any> = {
  platformName: 'SuccessBridge',
  platformEmail: 'support@successbridge.com',
  maintenanceMode: false,
  maxUploadSize: 100,
  sessionTimeout: 30,
  enableNotifications: true,
  enableAnalytics: true,
  enableRecommendations: true,
  maxLoginAttempts: 5,
  passwordMinLength: 8,
  requireEmailVerification: true,
  enableEmailVerification: true,
  autoApproveResources: false,
  defaultLanguage: 'en',
  timezone: 'UTC',
}

// Maps frontend camelCase property names to DB SystemSetting setting_key
const FIELD_TO_DB_KEY: Record<string, string> = {
  platformName: 'platform_name',
  platformEmail: 'platform_email',
  maintenanceMode: 'maintenance_mode',
  maxUploadSize: 'max_upload_size',
  sessionTimeout: 'session_timeout_minutes',
  enableNotifications: 'enable_notifications',
  enableAnalytics: 'enable_analytics',
  enableRecommendations: 'enable_recommendations',
  maxLoginAttempts: 'max_login_attempts',
  passwordMinLength: 'password_min_length',
  requireEmailVerification: 'require_email_verification',
  enableEmailVerification: 'require_email_verification',
  autoApproveResources: 'auto_approve_resources',
  defaultLanguage: 'platform_language',
  timezone: 'platform_timezone',
}

// Maps DB setting_key to frontend camelCase keys
const DB_KEY_TO_FIELDS: Record<string, string[]> = {
  platform_name: ['platformName'],
  platform_email: ['platformEmail'],
  maintenance_mode: ['maintenanceMode'],
  max_upload_size: ['maxUploadSize'],
  session_timeout_minutes: ['sessionTimeout'],
  enable_notifications: ['enableNotifications'],
  enable_analytics: ['enableAnalytics'],
  enable_recommendations: ['enableRecommendations'],
  max_login_attempts: ['maxLoginAttempts'],
  password_min_length: ['passwordMinLength'],
  require_email_verification: ['requireEmailVerification', 'enableEmailVerification'],
  auto_approve_resources: ['autoApproveResources'],
  platform_language: ['defaultLanguage'],
  platform_timezone: ['timezone'],
}

const ADMIN_ALLOWED_FIELDS = [
  'enableNotifications',
  'enableRecommendations',
  'defaultLanguage',
  'timezone',
  'enableEmailVerification',
  'requireEmailVerification',
] as const

/**
 * Retrieve merged settings from Database (falling back to DEFAULT_SETTINGS)
 */
async function getMergedSettings(): Promise<Record<string, any>> {
  const merged = { ...DEFAULT_SETTINGS }
  try {
    const dbSettings = await SystemSetting.findAll()
    for (const record of dbSettings) {
      const dbKey = record.settingKey
      const val = record.settingValue

      if (dbKey in merged) {
        merged[dbKey] = val
      }

      const mappedFields = DB_KEY_TO_FIELDS[dbKey]
      if (mappedFields) {
        for (const field of mappedFields) {
          merged[field] = val
        }
      }
    }

    const emailVerification = Boolean(
      merged.requireEmailVerification ?? merged.enableEmailVerification ?? true
    )
    merged.requireEmailVerification = emailVerification
    merged.enableEmailVerification = emailVerification
  } catch (error) {
    logger.error('Error fetching settings from database:', error)
  }
  return merged
}

/**
 * Persist setting to SystemSetting table
 */
async function persistSetting(key: string, value: any, userId?: string) {
  const dbKey = FIELD_TO_DB_KEY[key] || key
  try {
    await SystemSetting.upsert({
      settingKey: dbKey,
      settingValue: value,
      updatedBy: userId,
    })
  } catch (err) {
    logger.error(`Error saving setting ${key} (${dbKey}) to database:`, err)
  }
}

// Public settings route (No auth required)
router.get('/public', async (_req, res) => {
  try {
    const settings = await getMergedSettings()
    res.json({
      success: true,
      data: {
        platformName: settings.platformName,
        requireEmailVerification: settings.requireEmailVerification,
        enableEmailVerification: settings.enableEmailVerification,
        maintenanceMode: settings.maintenanceMode,
        defaultLanguage: settings.defaultLanguage,
      },
    })
  } catch (error: any) {
    res.json({
      success: true,
      data: {
        platformName: 'SuccessBridge',
        requireEmailVerification: true,
        enableEmailVerification: true,
        maintenanceMode: false,
        defaultLanguage: 'en',
      },
    })
  }
})

// System settings (Admin limited, Super Admin full)
router.get('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const isSuperAdmin = req.user?.role === 'super_admin'
    const settings = await getMergedSettings()

    if (isSuperAdmin) {
      return res.json({
        success: true,
        data: settings,
      })
    }

    res.json({
      success: true,
      data: ADMIN_ALLOWED_FIELDS.reduce((acc, key) => {
        acc[key] = settings[key]
        return acc
      }, {} as Record<string, any>),
      meta: {
        role: 'admin',
        editableFields: ADMIN_ALLOWED_FIELDS,
      },
    })
  } catch (error: any) {
    logger.error('Settings fetch error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch system settings',
      error: error.message,
    })
  }
})

// Update system settings (Admin limited, Super Admin full)
router.put('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const isSuperAdmin = req.user?.role === 'super_admin'
    const payload = req.body || {}
    const userId = req.user?.id

    const updatesToApply: Record<string, any> = {}

    if (isSuperAdmin) {
      for (const [key, value] of Object.entries(payload)) {
        updatesToApply[key] = value
        await persistSetting(key, value, userId)
      }
    } else {
      for (const key of ADMIN_ALLOWED_FIELDS) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          updatesToApply[key] = payload[key]
          await persistSetting(key, payload[key], userId)
        }
      }

      if (Object.keys(updatesToApply).length === 0) {
        return res.status(403).json({
          success: false,
          message: 'No permitted settings in request for admin role',
        })
      }
    }

    // If email verification was set using either key, persist to require_email_verification
    if ('requireEmailVerification' in updatesToApply || 'enableEmailVerification' in updatesToApply) {
      const isEnabled = Boolean(
        updatesToApply.requireEmailVerification ?? updatesToApply.enableEmailVerification
      )
      await persistSetting('require_email_verification', isEnabled, userId)
    }

    const updatedSettings = await getMergedSettings()

    if (isSuperAdmin) {
      return res.json({
        success: true,
        message: 'Settings updated successfully',
        data: updatedSettings,
      })
    }

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: ADMIN_ALLOWED_FIELDS.reduce((acc, key) => {
        acc[key] = updatedSettings[key]
        return acc
      }, {} as Record<string, any>),
      meta: {
        role: 'admin',
        editableFields: ADMIN_ALLOWED_FIELDS,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    logger.error('Settings update error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update system settings',
      error: error.message,
    })
  }
})

export default router
