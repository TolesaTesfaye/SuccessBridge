import express from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { TicketService } from '../services/ticketService.js'

const router = express.Router()

router.use(authMiddleware)

/**
 * @route   GET /api/tickets
 * @desc    List support tickets (all for staff, own for students)
 * @access  Private
 */
router.get('/', async (req, res, next) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    const limit = Number(req.query.limit) || 50
    const tickets = await TicketService.list(req.user!, { status, limit })
    res.json({ success: true, data: tickets })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/tickets
 * @desc    Open a support ticket
 * @access  Private
 */
router.post('/', async (req, res, next) => {
  try {
    const ticket = await TicketService.create(req.user!, req.body || {})
    res.status(201).json({ success: true, data: ticket })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/tickets/:id
 * @desc    Get a ticket with its full message thread
 * @access  Private
 */
router.get('/:id', async (req, res, next) => {
  try {
    const ticket = await TicketService.get(req.params.id, req.user!)
    res.json({ success: true, data: ticket })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/tickets/:id/messages
 * @desc    Reply to a ticket
 * @access  Private
 */
router.post('/:id/messages', async (req, res, next) => {
  try {
    const result = await TicketService.addMessage(
      req.params.id,
      req.user!,
      req.body?.content,
    )
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PATCH /api/tickets/:id/status
 * @desc    Change a ticket's status
 * @access  Private (admin, super_admin)
 */
router.patch(
  '/:id/status',
  requireRole('admin', 'super_admin'),
  async (req, res, next) => {
    try {
      const ticket = await TicketService.updateStatus(
        req.params.id,
        req.body?.status,
        req.user!,
      )
      res.json({ success: true, data: ticket })
    } catch (error) {
      next(error)
    }
  },
)

export default router
