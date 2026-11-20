import { Op } from 'sequelize'
import sequelize from '../config/database.js'
import Conversation from '../models/Conversation.js'
import ConversationParticipant from '../models/ConversationParticipant.js'
import Message from '../models/Message.js'
import User from '../models/User.js'
import { AppError } from '../middleware/errorHandler.js'
import { extractB2Key, getB2SignedUrl } from '../middleware/b2Upload.js'

const userAttributes = ['id', 'name', 'role']
const MAX_MESSAGE_LENGTH = 5000
const ATTACHMENT_URL_TTL_SECONDS = 24 * 60 * 60

const serializeUser = (user: any) =>
  user
    ? { id: user.id, name: user.name, role: user.role }
    : null

// The B2 bucket is private, so the stored public URL returns 401/403. Sign it
// on read (same pattern as resource previews and payment screenshots).
const signAttachmentUrl = async (url: string | null | undefined) => {
  if (!url) return null
  const key = extractB2Key(url)
  if (!key) return url
  try {
    return await getB2SignedUrl(key, ATTACHMENT_URL_TTL_SECONDS, false)
  } catch (error) {
    console.error('❌ Failed to sign attachment URL:', error)
    return url
  }
}

const serializeMessage = async (message: any) => ({
  id: message.id,
  conversationId: message.conversationId,
  senderId: message.senderId,
  content: message.content,
  messageType: message.messageType,
  attachmentUrl: await signAttachmentUrl(message.attachmentUrl),
  attachmentName: message.attachmentName ?? null,
  attachmentType: message.attachmentType ?? null,
  attachmentSize: message.attachmentSize ?? null,
  createdAt: message.createdAt,
  sender: serializeUser(message.sender),
})

export interface MessageAttachment {
  url: string
  name: string
  type?: string | null
  size?: number | null
}

const serializeConversation = async (
  conversation: any,
  unreadCount: number,
  lastMessage: any,
) => ({
  id: conversation.id,
  title: conversation.title,
  type: conversation.type,
  createdBy: conversation.createdBy,
  lastMessageAt: conversation.lastMessageAt,
  participants: (conversation.participants || []).map((participant: any) => ({
    id: participant.userId,
    role: participant.role,
    lastReadAt: participant.lastReadAt,
    user: serializeUser(participant.user),
  })),
  unreadCount,
  lastMessage: lastMessage ? await serializeMessage(lastMessage) : null,
})

export class ConversationService {
  static async assertMembership(conversationId: string, userId: string) {
    const participant = await ConversationParticipant.findOne({
      where: { conversationId, userId },
    })

    if (!participant) {
      const conversation = await Conversation.findByPk(conversationId)
      if (!conversation) throw new AppError(404, 'Conversation not found')
      throw new AppError(403, 'You are not a member of this conversation')
    }

    return participant
  }

  static async getConversation(conversationId: string, userId: string) {
    await this.assertMembership(conversationId, userId)

    const conversation = await Conversation.findByPk(conversationId, {
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          include: [{ model: User, as: 'user', attributes: userAttributes }],
        },
      ],
    })

    if (!conversation) throw new AppError(404, 'Conversation not found')

    const participant = await ConversationParticipant.findOne({
      where: { conversationId, userId },
    })
    const unreadCount = await Message.count({
      where: {
        conversationId,
        senderId: { [Op.ne]: userId },
        ...(participant?.lastReadAt
          ? { createdAt: { [Op.gt]: participant.lastReadAt } }
          : {}),
      },
    })
    const lastMessage = await Message.findOne({
      where: { conversationId },
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'sender', attributes: userAttributes }],
    })

    return serializeConversation(conversation, unreadCount, lastMessage)
  }

  static async listConversations(userId: string) {
    const memberships = await ConversationParticipant.findAll({
      where: { userId },
      attributes: ['conversationId', 'lastReadAt'],
      raw: true,
    })

    const conversationIds = memberships.map((m: any) => m.conversationId)
    if (conversationIds.length === 0) return []

    const lastReadByConversation = new Map<string, Date | null>(
      memberships.map((m: any) => [m.conversationId, m.lastReadAt ?? null]),
    )

    const conversations = await Conversation.findAll({
      where: { id: { [Op.in]: conversationIds } },
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          include: [{ model: User, as: 'user', attributes: userAttributes }],
        },
        {
          model: Message,
          as: 'messages',
          separate: true,
          limit: 1,
          order: [['createdAt', 'DESC']],
          include: [{ model: User, as: 'sender', attributes: userAttributes }],
        },
      ],
      order: [
        ['lastMessageAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    })

    const unreadCounts = await Promise.all(
      conversations.map((conversation) => {
        const lastReadAt = lastReadByConversation.get(conversation.id) ?? null
        return Message.count({
          where: {
            conversationId: conversation.id,
            senderId: { [Op.ne]: userId },
            ...(lastReadAt ? { createdAt: { [Op.gt]: lastReadAt } } : {}),
          },
        })
      }),
    )

    return Promise.all(
      conversations.map((conversation, index) =>
        serializeConversation(
          conversation,
          unreadCounts[index],
          (conversation as any).messages?.[0],
        ),
      ),
    )
  }

  static async findDirectConversation(userId: string, otherUserId: string) {
    const mine = await ConversationParticipant.findAll({
      where: { userId },
      attributes: ['conversationId'],
      raw: true,
    })
    const ids = mine.map((m: any) => m.conversationId)
    if (ids.length === 0) return null

    const shared = await ConversationParticipant.findOne({
      where: {
        conversationId: { [Op.in]: ids },
        userId: otherUserId,
      },
      attributes: ['conversationId'],
      raw: true,
    })
    if (!shared) return null

    return Conversation.findOne({
      where: { id: (shared as any).conversationId, type: 'direct' },
    })
  }

  static async getOrCreateOwnerConversation(userId: string) {
    const owner = await User.findOne({
      where: { role: 'super_admin', id: { [Op.ne]: userId } },
      order: [['createdAt', 'ASC']],
      attributes: ['id'],
    })
    if (!owner) {
      throw new AppError(404, 'No system owner is available right now')
    }

    return this.createConversation(userId, [owner.id])
  }

  static async createConversation(
    creatorId: string,
    participantIds: string[] = [],
    title?: string,
  ) {
    const uniqueIds = Array.from(
      new Set(Array.isArray(participantIds) ? participantIds : []),
    ).filter(
      (id): id is string =>
        typeof id === 'string' && id !== '' && id !== creatorId,
    )

    if (uniqueIds.length === 0) {
      throw new AppError(400, 'Select at least one participant')
    }

    const users = await User.findAll({
      where: { id: { [Op.in]: uniqueIds } },
      attributes: ['id'],
    })
    if (users.length !== uniqueIds.length) {
      throw new AppError(400, 'One or more participants do not exist')
    }

    const type = uniqueIds.length === 1 ? 'direct' : 'group'

    if (type === 'direct') {
      const existing = await this.findDirectConversation(
        creatorId,
        uniqueIds[0],
      )
      if (existing) {
        return this.getConversation(existing.id, creatorId)
      }
    }

    const conversation = await sequelize.transaction(async (transaction) => {
      const created = await Conversation.create(
        {
          title: title?.trim() || null,
          type,
          createdBy: creatorId,
          lastMessageAt: null,
        },
        { transaction },
      )

      await ConversationParticipant.bulkCreate(
        [
          { conversationId: created.id, userId: creatorId, role: 'admin' },
          ...uniqueIds.map((userId) => ({
            conversationId: created.id,
            userId,
            role: 'member' as const,
          })),
        ],
        { transaction },
      )

      return created
    })

    return this.getConversation(conversation.id, creatorId)
  }

  static async listMessages(
    conversationId: string,
    userId: string,
    page = 1,
    limit = 50,
    aroundId?: string,
  ) {
    await this.assertMembership(conversationId, userId)

    const safePage = Math.max(1, page)
    const safeLimit = Math.min(100, Math.max(1, limit))

    if (aroundId) {
      const anchor = await Message.findOne({
        where: { id: aroundId, conversationId },
        attributes: ['id', 'createdAt'],
      })
      if (anchor) {
        const rows = await Message.findAll({
          where: {
            conversationId,
            createdAt: { [Op.lte]: anchor.createdAt },
          },
          include: [{ model: User, as: 'sender', attributes: userAttributes }],
          order: [['createdAt', 'DESC']],
          limit: safeLimit,
        })
        const total = await Message.count({ where: { conversationId } })
        return {
          messages: await Promise.all(rows.reverse().map(serializeMessage)),
          total,
          page: 1,
          limit: safeLimit,
          aroundId: anchor.id,
        }
      }
    }

    const { rows, count } = await Message.findAndCountAll({
      where: { conversationId },
      include: [{ model: User, as: 'sender', attributes: userAttributes }],
      order: [['createdAt', 'DESC']],
      offset: (safePage - 1) * safeLimit,
      limit: safeLimit,
    })

    return {
      messages: await Promise.all(rows.reverse().map(serializeMessage)),
      total: count,
      page: safePage,
      limit: safeLimit,
    }
  }

  static async searchMessages(userId: string, query: string, limit = 25) {
    const text = (query || '').trim()
    if (text.length < 2) {
      throw new AppError(400, 'Search text must be at least 2 characters')
    }

    const memberships = await ConversationParticipant.findAll({
      where: { userId },
      attributes: ['conversationId'],
      raw: true,
    })
    const conversationIds = memberships.map((m: any) => m.conversationId)
    if (conversationIds.length === 0) return []

    const escaped = text.replace(/[\\%_]/g, '\\$&')

    const messages = await Message.findAll({
      where: {
        conversationId: { [Op.in]: conversationIds },
        content: { [Op.iLike]: `%${escaped}%` },
      },
      include: [
        { model: User, as: 'sender', attributes: userAttributes },
        {
          model: Conversation,
          as: 'conversation',
          attributes: ['id', 'title', 'type'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: Math.min(100, Math.max(1, limit)),
    })

    return Promise.all(
      messages.map(async (message: any) => ({
        ...(await serializeMessage(message)),
        conversation: message.conversation
          ? {
              id: message.conversation.id,
              title: message.conversation.title,
              type: message.conversation.type,
            }
          : null,
      })),
    )
  }

  static async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    attachment?: MessageAttachment,
  ) {
    if (typeof content !== 'string' && !attachment) {
      throw new AppError(400, 'Message content is required')
    }
    const text = typeof content === 'string' ? content.trim() : ''
    if (!text && !attachment) throw new AppError(400, 'Message cannot be empty')
    if (text.length > MAX_MESSAGE_LENGTH) {
      throw new AppError(400, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`)
    }

    await this.assertMembership(conversationId, senderId)

    const message = await sequelize.transaction(async (transaction) => {
      const created = await Message.create(
        {
          conversationId,
          senderId,
          content: text,
          messageType: 'text',
          attachmentUrl: attachment?.url ?? null,
          attachmentName: attachment?.name ?? null,
          attachmentType: attachment?.type ?? null,
          attachmentSize: attachment?.size ?? null,
        },
        { transaction },
      )

      await Conversation.update(
        { lastMessageAt: created.createdAt },
        { where: { id: conversationId }, transaction },
      )

      return created
    })

    const messageWithSender = await Message.findByPk(message.id, {
      include: [{ model: User, as: 'sender', attributes: userAttributes }],
    })

    return serializeMessage(messageWithSender)
  }

  static async markRead(conversationId: string, userId: string) {
    await this.assertMembership(conversationId, userId)

    const lastReadAt = new Date()
    await ConversationParticipant.update(
      { lastReadAt },
      { where: { conversationId, userId } },
    )

    return lastReadAt
  }

  static async listParticipantIds(conversationId: string): Promise<string[]> {
    const participants = await ConversationParticipant.findAll({
      where: { conversationId },
      attributes: ['userId'],
      raw: true,
    })
    return participants.map((participant: any) => participant.userId)
  }
}
