import express from 'express'
import rateLimit from 'express-rate-limit'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { ContactService } from '../services/contactService.js'

const router = express.Router()

// Public form: cap per IP so the endpoint can't be used to flood the inbox.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many messages sent. Please try again later.' },
})

/**
 * @route   POST /api/contact
 * @desc    Submit a contact message from the public contact page
 * @access  Public
 */
router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const message = await ContactService.create(req.body || {})
    res.status(201).json({ success: true, data: message })
  } catch (error) {
    next(error)
  }
})

router.use(authMiddleware)

/**
 * @route   GET /api/contact
 * @desc    List contact messages
 * @access  Private (super_admin)
 */
router.get('/', requireRole('super_admin'), async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    const limit = Number(req.query.limit) || 100
    const messages = await ContactService.list({ status, limit })
    res.json({ success: true, data: messages })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PATCH /api/contact/:id/status
 * @desc    Update a contact message's status (read / archived)
 * @access  Private (super_admin)
 */
router.patch(
  '/:id/status',
  requireRole('super_admin'),
  async (req, res, next) => {
    try {
      const message = await ContactService.updateStatus(
        req.params.id,
        req.body?.status,
      )
      res.json({ success: true, data: message })
    } catch (error) {
      next(error)
    }
  },
)

export default router
