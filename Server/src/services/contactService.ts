import ContactMessage, { ContactStatus } from '../models/ContactMessage.js'
import User from '../models/User.js'
import { AppError } from '../middleware/errorHandler.js'
import { emitToUser } from '../socket/index.js'

const STATUSES: ContactStatus[] = ['new', 'read', 'archived']
const CATEGORIES = ['general', 'bug', 'feature', 'other']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_LENGTH = 5000

export interface ContactInput {
  name?: string
  email?: string
  subject?: string
  category?: string
  message?: string
}

const serializeContactMessage = (row: any) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  subject: row.subject,
  category: row.category,
  message: row.message,
  status: row.status,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
})

export class ContactService {
  static async create(data: ContactInput) {
    const name = (data.name || '').trim()
    const email = (data.email || '').trim().toLowerCase()
    const subject = (data.subject || '').trim()
    const message = (data.message || '').trim()
    const category =
      typeof data.category === 'string' && CATEGORIES.includes(data.category)
        ? data.category
        : 'general'

    if (!name) throw new AppError(400, 'Please enter your name')
    if (!email) throw new AppError(400, 'Please enter your email address')
    if (!EMAIL_PATTERN.test(email)) {
      throw new AppError(400, 'Please enter a valid email address')
    }
    if (!subject) throw new AppError(400, 'Please enter a subject')
    if (!message) throw new AppError(400, 'Please write your message')
    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new AppError(
        400,
        `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
      )
    }

    const row = await ContactMessage.create({
      name: name.slice(0, 120),
      email: email.slice(0, 200),
      subject: subject.slice(0, 200),
      category,
      message,
      status: 'new',
    })

    const serialized = serializeContactMessage(row)

    try {
      const superAdmins = await User.findAll({
        where: { role: 'super_admin' },
        attributes: ['id'],
        raw: true,
      })
      superAdmins.forEach((admin: any) =>
        emitToUser(admin.id, 'contact:new', serialized),
      )
    } catch (error) {
      console.error('Failed to notify super admins about contact message:', error)
    }

    return serialized
  }

  static async list(filters: { status?: string; limit?: number } = {}) {
    const where: any = {}
    if (
      typeof filters.status === 'string' &&
      STATUSES.includes(filters.status as ContactStatus)
    ) {
      where.status = filters.status
    }

    const rows = await ContactMessage.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: Math.min(200, Math.max(1, filters.limit || 100)),
    })

    return rows.map(serializeContactMessage)
  }

  static async updateStatus(id: string, status: string) {
    if (!STATUSES.includes(status as ContactStatus)) {
      throw new AppError(400, 'Invalid contact message status')
    }

    const row = await ContactMessage.findByPk(id)
    if (!row) throw new AppError(404, 'Contact message not found')

    await row.update({ status: status as ContactStatus })
    return serializeContactMessage(row)
  }
}

export default ContactService
