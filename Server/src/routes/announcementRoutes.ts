import express from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { AnnouncementService } from '../services/announcementService.js'

const router = express.Router()

router.use(authMiddleware)

/**
 * @route   GET /api/announcements
 * @desc    List announcements visible to the current user
 * @access  Private
 */
router.get('/', async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 50
    const announcements = await AnnouncementService.listForUser(
      req.user!,
      limit,
    )
    res.json({ success: true, data: announcements })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/announcements
 * @desc    Publish an announcement and notify its audience
 * @access  Private (admin, super_admin)
 */
router.post('/', requireRole('admin', 'super_admin'), async (req, res, next) => {
  try {
    const announcement = await AnnouncementService.create(
      req.user!.id,
      req.body || {},
    )
    res.status(201).json({ success: true, data: announcement })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PUT /api/announcements/:id
 * @desc    Edit an announcement (creator or super admin)
 * @access  Private (admin, super_admin)
 */
router.put(
  '/:id',
  requireRole('admin', 'super_admin'),
  async (req, res, next) => {
    try {
      const announcement = await AnnouncementService.update(
        req.params.id,
        req.user!,
        req.body || {},
      )
      res.json({ success: true, data: announcement })
    } catch (error) {
      next(error)
    }
  },
)

/**
 * @route   DELETE /api/announcements/:id
 * @desc    Delete an announcement (creator or super admin)
 * @access  Private (admin, super_admin)
 */
router.delete(
  '/:id',
  requireRole('admin', 'super_admin'),
  async (req, res, next) => {
    try {
      await AnnouncementService.remove(req.params.id, req.user!)
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  },
)

export default router
