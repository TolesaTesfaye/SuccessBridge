import express from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { ConversationService } from '../services/conversationService.js'
import { emitToConversation, emitToUser } from '../socket/index.js'
import { chatUpload, uploadToB2 } from '../middleware/b2Upload.js'

const router = express.Router()

router.use(authMiddleware)

const broadcastMessage = async (
  conversationId: string,
  message: any,
  senderId: string,
) => {
  emitToConversation(conversationId, 'message:new', message)

  // Participants who have not opened this thread still need to update their
  // conversation list (last message + unread badge).
  const participantIds = await ConversationService.listParticipantIds(
    conversationId,
  )
  participantIds
    .filter((userId) => userId !== senderId)
    .forEach((userId) =>
      emitToUser(userId, 'message:notify', {
        conversationId,
        messageId: message.id,
      }),
    )
}

/**
 * @route   GET /api/conversations
 * @desc    List conversations for the current user
 * @access  Private
 */
router.get('/', async (req, res, next) => {
  try {
    const conversations = await ConversationService.listConversations(
      req.user!.id,
    )
    res.json({ success: true, data: conversations })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/conversations
 * @desc    Create a direct or group conversation
 * @access  Private (admin, super_admin) — participants of any role may reply in
 *          conversations they belong to, but only admins start new ones.
 */
router.post('/', requireRole('admin', 'super_admin'), async (req, res, next) => {
  try {
    const { participantIds, title } = req.body || {}
    const conversation = await ConversationService.createConversation(
      req.user!.id,
      participantIds,
      title,
    )

    conversation.participants
      .map((participant) => participant.id)
      .filter((userId) => userId !== req.user!.id)
      .forEach((userId) =>
        emitToUser(userId, 'conversation:new', conversation),
      )

    res.status(201).json({ success: true, data: conversation })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/conversations/owner
 * @desc    Open (or reuse) a direct conversation with the system owner
 * @access  Private
 */
router.post('/owner', async (req, res, next) => {
  try {
    const conversation = await ConversationService.getOrCreateOwnerConversation(
      req.user!.id,
    )

    conversation.participants
      .map((participant) => participant.id)
      .filter((userId) => userId !== req.user!.id)
      .forEach((userId) =>
        emitToUser(userId, 'conversation:new', conversation),
      )

    res.status(201).json({ success: true, data: conversation })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/conversations/search
 * @desc    Search messages across the current user's conversations
 * @access  Private
 */
router.get('/search', async (req, res, next) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q : ''
    const limit = Number(req.query.limit) || 25
    const results = await ConversationService.searchMessages(
      req.user!.id,
      q,
      limit,
    )
    res.json({ success: true, data: results })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/conversations/:id
 * @desc    Get a single conversation
 * @access  Private
 */
router.get('/:id', async (req, res, next) => {
  try {
    const conversation = await ConversationService.getConversation(
      req.params.id,
      req.user!.id,
    )
    res.json({ success: true, data: conversation })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/conversations/:id/messages
 * @desc    List messages in a conversation (newest page, returned oldest-first)
 * @access  Private
 */
router.get('/:id/messages', async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 50
    const aroundId =
      typeof req.query.aroundId === 'string' ? req.query.aroundId : undefined

    const result = await ConversationService.listMessages(
      req.params.id,
      req.user!.id,
      page,
      limit,
      aroundId,
    )
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/conversations/:id/messages
 * @desc    Send a message
 * @access  Private
 */
router.post('/:id/messages', async (req, res, next) => {
  try {
    const message = await ConversationService.sendMessage(
      req.params.id,
      req.user!.id,
      req.body?.content,
    )

    await broadcastMessage(req.params.id, message, req.user!.id)

    res.status(201).json({ success: true, data: message })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   POST /api/conversations/:id/attachments
 * @desc    Upload a file and send it as a message attachment
 * @access  Private
 */
router.post(
  '/:id/attachments',
  chatUpload.single('file'),
  async (req, res, next) => {
    try {
      const file = req.file
      if (!file) {
        res.status(400).json({ success: false, error: 'No file uploaded' })
        return
      }

      const url = await uploadToB2(req, file, 'communication')
      const message = await ConversationService.sendMessage(
        req.params.id,
        req.user!.id,
        typeof req.body?.content === 'string' ? req.body.content : '',
        {
          url,
          name: file.originalname,
          type: file.mimetype,
          size: file.size,
        },
      )

      await broadcastMessage(req.params.id, message, req.user!.id)

      res.status(201).json({ success: true, data: message })
    } catch (error) {
      next(error)
    }
  },
)

/**
 * @route   POST /api/conversations/:id/read
 * @desc    Mark a conversation as read
 * @access  Private
 */
router.post('/:id/read', async (req, res, next) => {
  try {
    const lastReadAt = await ConversationService.markRead(
      req.params.id,
      req.user!.id,
    )
    emitToConversation(req.params.id, 'read:update', {
      conversationId: req.params.id,
      userId: req.user!.id,
      lastReadAt: lastReadAt.toISOString(),
    })
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export default router
