import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { NotificationService } from '../services/notificationService.js'
import { AppError } from '../middleware/errorHandler.js'

const router = express.Router()

/**
 * @route   GET /api/notifications
 * @desc    Get user's notifications
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user!.id
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20

    const notifications = await NotificationService.getUserNotifications(userId, limit)

    res.json({
      success: true,
      data: notifications,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/notifications/unread-count
 * @desc    Get unread notification count
 * @access  Private
 */
router.get('/unread-count', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user!.id
    const count = await NotificationService.getUnreadCount(userId)

    res.json({
      success: true,
      data: { count },
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put('/:id/read', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user!.id
    const notificationId = req.params.id

    const notification = await NotificationService.markAsRead(notificationId, userId)

    if (!notification) {
      throw new AppError(404, 'Notification not found')
    }

    res.json({
      success: true,
      data: notification,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PUT /api/notifications/mark-all-read
 * @desc    Mark all notifications as read
 * @access  Private
 */
router.put('/mark-all-read', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user!.id
    await NotificationService.markAllAsRead(userId)

    res.json({
      success: true,
      message: 'All notifications marked as read',
    })
  } catch (error) {
    next(error)
  }
})

export default router
