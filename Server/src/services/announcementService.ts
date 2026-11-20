import { Op } from 'sequelize'
import Announcement from '../models/Announcement.js'
import User from '../models/User.js'
import { AppError } from '../middleware/errorHandler.js'
import { NotificationService } from './notificationService.js'
import { emitToUser } from '../socket/index.js'

const ROLES = ['student', 'admin', 'super_admin']
const creatorAttributes = ['id', 'name', 'role']

const serializeAnnouncement = (announcement: any) => ({
  id: announcement.id,
  title: announcement.title,
  content: announcement.content,
  type: announcement.type,
  targetRoles: announcement.targetRoles ?? null,
  targetEducationLevels: announcement.targetEducationLevels ?? null,
  isActive: announcement.isActive,
  createdBy: announcement.createdBy,
  scheduledAt: announcement.scheduledAt,
  expiresAt: announcement.expiresAt,
  createdAt: announcement.createdAt,
  creator: announcement.creator
    ? {
        id: announcement.creator.id,
        name: announcement.creator.name,
        role: announcement.creator.role,
      }
    : null,
})

export class AnnouncementService {
  static async listForUser(user: { id: string; role: string }, limit = 50) {
    const now = new Date()

    const announcements = await Announcement.findAll({
      where: {
        isActive: true,
        [Op.and]: [
          { [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: now } }] },
          {
            [Op.or]: [
              { scheduledAt: null },
              { scheduledAt: { [Op.lte]: now } },
            ],
          },
          {
            [Op.or]: [
              { targetRoles: null },
              { targetRoles: { [Op.contains]: [user.role] } },
            ],
          },
        ],
      },
      include: [
        { model: User, as: 'creator', attributes: creatorAttributes },
      ],
      order: [['createdAt', 'DESC']],
      limit: Math.min(100, Math.max(1, limit)),
    })

    return announcements.map(serializeAnnouncement)
  }

  static async resolveAudience(targetRoles?: string[] | null) {
    const roles =
      Array.isArray(targetRoles) && targetRoles.length > 0
        ? targetRoles.filter((role) => ROLES.includes(role))
        : ROLES

    const users = await User.findAll({
      where: { role: { [Op.in]: roles } },
      attributes: ['id'],
      raw: true,
    })

    return users.map((user: any) => user.id)
  }

  static async create(
    actorId: string,
    data: {
      title?: string
      content?: string
      type?: string
      targetRoles?: string[]
      targetEducationLevels?: string[]
      scheduledAt?: string | Date | null
      expiresAt?: string | Date | null
    },
  ) {
    const title = (data.title || '').trim()
    const content = (data.content || '').trim()
    if (!title) throw new AppError(400, 'Title is required')
    if (!content) throw new AppError(400, 'Content is required')

    const targetRoles =
      Array.isArray(data.targetRoles) && data.targetRoles.length > 0
        ? data.targetRoles.filter((role) => ROLES.includes(role))
        : null

    const announcement = await Announcement.create({
      title,
      content,
      type: data.type || 'info',
      targetRoles,
      targetEducationLevels:
        Array.isArray(data.targetEducationLevels) &&
        data.targetEducationLevels.length > 0
          ? data.targetEducationLevels
          : undefined,
      isActive: true,
      createdBy: actorId,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
    })

    const withCreator = await Announcement.findByPk(announcement.id, {
      include: [
        { model: User, as: 'creator', attributes: creatorAttributes },
      ],
    })
    const serialized = serializeAnnouncement(withCreator)

    // Only push/notify once the announcement is actually live.
    const isLive =
      serialized.isActive &&
      (!serialized.scheduledAt ||
        new Date(serialized.scheduledAt).getTime() <= Date.now())

    if (isLive) {
      const audience = await this.resolveAudience(targetRoles)
      audience.forEach((userId) =>
        emitToUser(userId, 'announcement:new', serialized),
      )
      await NotificationService.notifyAnnouncement(audience, {
        id: serialized.id,
        title: serialized.title,
        content: serialized.content,
      })
    }

    return serialized
  }

  static async remove(id: string, actor: { id: string; role: string }) {
    const announcement = await Announcement.findByPk(id)
    if (!announcement) throw new AppError(404, 'Announcement not found')

    if (actor.role !== 'super_admin' && announcement.createdBy !== actor.id) {
      throw new AppError(403, 'You can only delete your own announcements')
    }

    await announcement.destroy()
    return true
  }
}
