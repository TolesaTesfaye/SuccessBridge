import { Op } from 'sequelize'
import SupportTicket from '../models/SupportTicket.js'
import TicketMessage from '../models/TicketMessage.js'
import User from '../models/User.js'
import { AppError } from '../middleware/errorHandler.js'
import { NotificationService } from './notificationService.js'
import { emitToUser } from '../socket/index.js'

const STAFF_ROLES = ['admin', 'super_admin']
const STATUSES = ['open', 'in_progress', 'resolved', 'closed']
const PRIORITIES = ['low', 'medium', 'high']

const userAttributes = ['id', 'name', 'role']

const serializeUser = (user: any) =>
  user ? { id: user.id, name: user.name, role: user.role } : null

const serializeTicketMessage = (message: any) => ({
  id: message.id,
  ticketId: message.ticketId,
  senderId: message.senderId,
  content: message.content,
  isStaff: message.isStaff,
  createdAt: message.createdAt,
  sender: serializeUser(message.sender),
})

const serializeTicket = (ticket: any, messages?: any[]) => ({
  id: ticket.id,
  userId: ticket.userId,
  subject: ticket.subject,
  description: ticket.description,
  category: ticket.category,
  priority: ticket.priority,
  status: ticket.status,
  lastReplyAt: ticket.lastReplyAt,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
  user: serializeUser(ticket.user),
  messages: messages ? messages.map(serializeTicketMessage) : undefined,
})

const isStaff = (role: string) => STAFF_ROLES.includes(role)

export class TicketService {
  static async listStaffIds(): Promise<string[]> {
    const staff = await User.findAll({
      where: { role: { [Op.in]: STAFF_ROLES } },
      attributes: ['id'],
      raw: true,
    })
    return staff.map((user: any) => user.id)
  }

  static async create(
    actor: { id: string; role: string; name?: string },
    data: {
      subject?: string
      description?: string
      category?: string
      priority?: string
    },
  ) {
    const subject = (data.subject || '').trim()
    const description = (data.description || '').trim()
    if (!subject) throw new AppError(400, 'Subject is required')
    if (!description) throw new AppError(400, 'Description is required')

    const priority =
      typeof data.priority === 'string' && PRIORITIES.includes(data.priority)
        ? data.priority
        : 'medium'

    const ticket = await SupportTicket.create({
      userId: actor.id,
      subject,
      description,
      category: data.category?.trim() || null,
      priority: priority as any,
      status: 'open',
      lastReplyAt: new Date(),
    })

    await TicketMessage.create({
      ticketId: ticket.id,
      senderId: actor.id,
      content: description,
      isStaff: false,
    })

    const actorUser = await User.findByPk(actor.id, {
      attributes: ['id', 'name', 'role'],
    })
    const userName = actorUser?.name || 'A user'

    await NotificationService.notifySuperAdminsNewTicket(
      ticket.id,
      ticket.subject,
      userName,
    )

    const serialized = serializeTicket({ ...ticket.toJSON(), user: actorUser })

    const staffIds = await this.listStaffIds()
    staffIds
      .filter((id) => id !== actor.id)
      .forEach((id) => emitToUser(id, 'ticket:new', serialized))

    return serialized
  }

  static async list(
    actor: { id: string; role: string },
    filters: { status?: string; limit?: number } = {},
  ) {
    const where: any = {}
    if (!isStaff(actor.role)) where.userId = actor.id
    if (typeof filters.status === 'string' && STATUSES.includes(filters.status)) {
      where.status = filters.status
    }

    const tickets = await SupportTicket.findAll({
      where,
      include: [{ model: User, as: 'user', attributes: userAttributes }],
      order: [
        ['lastReplyAt', 'DESC'],
        ['createdAt', 'DESC'],
      ],
      limit: Math.min(100, Math.max(1, filters.limit || 50)),
    })

    return tickets.map((ticket) => serializeTicket(ticket))
  }

  static async get(
    id: string,
    actor: { id: string; role: string },
  ) {
    const ticket = await SupportTicket.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: userAttributes },
        {
          model: TicketMessage,
          as: 'messages',
          include: [{ model: User, as: 'sender', attributes: userAttributes }],
        },
      ],
      order: [[{ model: TicketMessage, as: 'messages' }, 'createdAt', 'ASC']],
    })

    if (!ticket) throw new AppError(404, 'Ticket not found')
    if (!isStaff(actor.role) && ticket.userId !== actor.id) {
      throw new AppError(403, 'You do not have access to this ticket')
    }

    return serializeTicket(ticket, (ticket as any).messages)
  }

  static async addMessage(
    id: string,
    actor: { id: string; role: string },
    content: string,
  ) {
    const text = typeof content === 'string' ? content.trim() : ''
    if (!text) throw new AppError(400, 'Message cannot be empty')

    const ticket = await SupportTicket.findByPk(id)
    if (!ticket) throw new AppError(404, 'Ticket not found')

    const staff = isStaff(actor.role)
    if (!staff && ticket.userId !== actor.id) {
      throw new AppError(403, 'You do not have access to this ticket')
    }
    if (ticket.status === 'closed') {
      throw new AppError(400, 'This ticket is closed')
    }

    const message = await TicketMessage.create({
      ticketId: ticket.id,
      senderId: actor.id,
      content: text,
      isStaff: staff,
    })

    const updates: Partial<{ status: any; lastReplyAt: Date }> = {
      lastReplyAt: new Date(),
    }
    if (staff && ticket.status === 'open') updates.status = 'in_progress'
    if (!staff && ticket.status === 'resolved') updates.status = 'open'

    await ticket.update(updates)

    const actorUser = await User.findByPk(actor.id, {
      attributes: userAttributes,
    })
    const actorName = actorUser?.name || 'A user'

    await NotificationService.notifyTicketReply(
      { id: ticket.id, subject: ticket.subject, userId: ticket.userId },
      actorName,
      staff,
    )

    const messageWithSender = await TicketMessage.findByPk(message.id, {
      include: [{ model: User, as: 'sender', attributes: userAttributes }],
    })
    const serialized = serializeTicketMessage(messageWithSender)

    const notifyIds = new Set<string>([ticket.userId, ...(await this.listStaffIds())])
    notifyIds.delete(actor.id)
    notifyIds.forEach((userId) =>
      emitToUser(userId, 'ticket:message', {
        ticketId: ticket.id,
        status: ticket.status,
        message: serialized,
      }),
    )

    return { message: serialized, status: ticket.status }
  }

  static async updateStatus(
    id: string,
    status: string,
    actor: { id: string; role: string },
  ) {
    if (!STATUSES.includes(status)) {
      throw new AppError(400, 'Invalid ticket status')
    }

    const ticket = await SupportTicket.findByPk(id)
    if (!ticket) throw new AppError(404, 'Ticket not found')

    await ticket.update({ status: status as any })

    const notifyIds = new Set<string>([ticket.userId, ...(await this.listStaffIds())])
    notifyIds.delete(actor.id)
    notifyIds.forEach((userId) =>
      emitToUser(userId, 'ticket:status', {
        ticketId: ticket.id,
        status: ticket.status,
      }),
    )

    return serializeTicket(ticket)
  }
}
