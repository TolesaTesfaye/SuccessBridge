import express from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'

const router = express.Router()

const DEFAULT_SETTINGS = {
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
  autoApproveResources: false,
  defaultLanguage: 'en',
  timezone: 'UTC',
}

const ADMIN_ALLOWED_FIELDS = [
  'enableNotifications',
  'enableRecommendations',
  'defaultLanguage',
  'timezone',
] as const

const settingsStore: Record<string, any> = { ...DEFAULT_SETTINGS }

// System settings (Admin limited, Super Admin full)
router.get('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const isSuperAdmin = req.user?.role === 'super_admin'

    if (isSuperAdmin) {
      return res.json({
        success: true,
        data: settingsStore,
      })
    }

    res.json({
      success: true,
      data: ADMIN_ALLOWED_FIELDS.reduce((acc, key) => {
        acc[key] = settingsStore[key]
        return acc
      }, {} as Record<string, any>),
      meta: {
        role: 'admin',
        editableFields: ADMIN_ALLOWED_FIELDS,
      },
    })
  } catch (error: any) {
    console.error('Settings fetch error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch system settings',
      error: error.message
    })
  }
})

// Update system settings (Admin limited, Super Admin full)
router.put('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const isSuperAdmin = req.user?.role === 'super_admin'
    const payload = req.body || {}

    if (isSuperAdmin) {
      Object.assign(settingsStore, payload)
      return res.json({
        success: true,
        message: 'Settings updated successfully',
        data: settingsStore,
      })
    }

    const allowedUpdates: Record<string, any> = {}
    for (const key of ADMIN_ALLOWED_FIELDS) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        allowedUpdates[key] = payload[key]
      }
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return res.status(403).json({
        success: false,
        message: 'No permitted settings in request for admin role',
      })
    }

    Object.assign(settingsStore, allowedUpdates)

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: ADMIN_ALLOWED_FIELDS.reduce((acc, key) => {
        acc[key] = settingsStore[key]
        return acc
      }, {} as Record<string, any>),
      meta: {
        role: 'admin',
        editableFields: ADMIN_ALLOWED_FIELDS,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error('Settings update error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update system settings',
      error: error.message
    })
  }
})

export default router
