import { Op } from 'sequelize'
import Announcement from '../models/Announcement.js'
import User from '../models/User.js'
import StudentCategoryAccess from '../models/StudentCategoryAccess.js'
import { AppError } from '../middleware/errorHandler.js'
import { NotificationService } from './notificationService.js'
import { emitToUser } from '../socket/index.js'

const ROLES = ['student', 'admin', 'super_admin']
const LEVELS = [
  'grade_9',
  'grade_10',
  'grade_11',
  'grade_12',
  'freshman',
  'remedial',
]
const creatorAttributes = ['id', 'name', 'role']

const serializeAnnouncement = (announcement: any) => ({
  id: announcement.id,
  title: announcement.title,
  content: announcement.content,
  type: announcement.type,
  targetRoles: announcement.targetRoles ?? null,
  targetEducationLevels: announcement.targetEducationLevels ?? null,
  targetPaymentStatus: announcement.targetPaymentStatus ?? null,
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

const normalizePaymentStatus = (value?: string | null) =>
  value === 'paid' || value === 'unpaid' ? value : null

const normalizeLevels = (value?: string[] | null) =>
  Array.isArray(value) && value.length > 0
    ? value.filter((level) => LEVELS.includes(level))
    : null

const studentLevel = (user: any) =>
  user?.studentType === 'university'
    ? user?.universityLevel
    : user?.highSchoolGrade

export class AnnouncementService {
  /**
   * Students with an active, unexpired category access count as "paid".
   * Admins/super admins are not subject to the payment filter.
   */
  static async hasPaidAccess(userId: string) {
    const access = await StudentCategoryAccess.findOne({
      where: {
        userId,
        status: 'active',
        [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: new Date() } }],
      },
      attributes: ['id'],
    })
    return Boolean(access)
  }

  static async listPaidStudentIds() {
    const rows = await StudentCategoryAccess.findAll({
      where: {
        status: 'active',
        [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: new Date() } }],
      },
      attributes: ['userId'],
      group: ['userId'],
      raw: true,
    })
    return new Set(rows.map((row: any) => row.userId))
  }

  static async listForUser(user: { id: string; role: string }, limit = 50) {
    const now = new Date()
    const isManager = user.role === 'admin' || user.role === 'super_admin'

    const studentFilters: any[] = [
      { [Op.or]: [{ expiresAt: null }, { expiresAt: { [Op.gt]: now } }] },
      { [Op.or]: [{ scheduledAt: null }, { scheduledAt: { [Op.lte]: now } }] },
      {
        // No audience (null or empty array) means everyone.
        [Op.or]: [
          { targetRoles: null },
          { targetRoles: { [Op.eq]: [] } },
          { targetRoles: { [Op.contains]: [user.role] } },
        ],
      },
    ]

    if (user.role === 'student') {
      const [paid, profile] = await Promise.all([
        this.hasPaidAccess(user.id),
        User.findByPk(user.id, {
          attributes: ['studentType', 'highSchoolGrade', 'universityLevel'],
        }),
      ])

      studentFilters.push({
        [Op.or]: [
          { targetPaymentStatus: null },
          { targetPaymentStatus: paid ? 'paid' : 'unpaid' },
        ],
      })

      // No level audience means all grades/levels.
      const level = studentLevel(profile)
      studentFilters.push({
        [Op.or]: [
          { targetEducationLevels: null },
          { targetEducationLevels: { [Op.eq]: [] } },
          ...(level
            ? [{ targetEducationLevels: { [Op.contains]: [level] } }]
            : []),
        ],
      })
    }

    const announcements = await Announcement.findAll({
      // Managers see every announcement (including inactive/scheduled ones)
      // so they can edit or re-activate them; students only see live
      // announcements addressed to their role and payment status.
      where: isManager
        ? {}
        : {
            isActive: true,
            [Op.and]: studentFilters,
          },
      include: [
        { model: User, as: 'creator', attributes: creatorAttributes },
      ],
      order: [['createdAt', 'DESC']],
      limit: Math.min(100, Math.max(1, limit)),
    })

    return announcements.map(serializeAnnouncement)
  }

  static async resolveAudience(
    targetRoles?: string[] | null,
    targetPaymentStatus?: string | null,
    targetEducationLevels?: string[] | null,
  ) {
    const roles =
      Array.isArray(targetRoles) && targetRoles.length > 0
        ? targetRoles.filter((role) => ROLES.includes(role))
        : ROLES

    const users = await User.findAll({
      where: { role: { [Op.in]: roles } },
      attributes: [
        'id',
        'role',
        'studentType',
        'highSchoolGrade',
        'universityLevel',
      ],
      raw: true,
    })

    const levels = normalizeLevels(targetEducationLevels)
    const studentsFiltered =
      levels && roles.includes('student')
        ? users.filter((user: any) => {
            if (user.role !== 'student') return true
            const level = studentLevel(user)
            return Boolean(level) && levels.includes(level)
          })
        : users

    const paymentStatus = normalizePaymentStatus(targetPaymentStatus)
    if (!paymentStatus || !roles.includes('student')) {
      return studentsFiltered.map((user: any) => user.id)
    }

    const paidIds = await this.listPaidStudentIds()
    return studentsFiltered
      .filter((user: any) => {
        if (user.role !== 'student') return true
        return paymentStatus === 'paid'
          ? paidIds.has(user.id)
          : !paidIds.has(user.id)
      })
      .map((user: any) => user.id)
  }

  static async create(
    actorId: string | null | undefined,
    data: {
      title?: string
      content?: string
      type?: string
      targetRoles?: string[]
      targetEducationLevels?: string[]
      targetPaymentStatus?: string | null
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

    const targetPaymentStatus = normalizePaymentStatus(data.targetPaymentStatus)
    const targetEducationLevels = normalizeLevels(data.targetEducationLevels)

    const announcement = await Announcement.create({
      title,
      content,
      type: data.type || 'info',
      targetRoles,
      targetEducationLevels,
      targetPaymentStatus,
      isActive: true,
      createdBy: actorId || undefined,
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
      const audience = await this.resolveAudience(
        targetRoles,
        targetPaymentStatus,
        targetEducationLevels,
      )
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

  static async update(
    id: string,
    actor: { id: string; role: string },
    data: {
      title?: string
      content?: string
      type?: string
      targetRoles?: string[] | null
      targetEducationLevels?: string[] | null
      targetPaymentStatus?: string | null
      isActive?: boolean
      scheduledAt?: string | Date | null
      expiresAt?: string | Date | null
    },
  ) {
    const announcement = await Announcement.findByPk(id)
    if (!announcement) throw new AppError(404, 'Announcement not found')

    if (actor.role !== 'super_admin' && announcement.createdBy !== actor.id) {
      throw new AppError(403, 'You can only edit your own announcements')
    }

    const patch: Record<string, any> = {}

    if (data.title !== undefined) {
      const title = (data.title || '').trim()
      if (!title) throw new AppError(400, 'Title is required')
      patch.title = title
    }
    if (data.content !== undefined) {
      const content = (data.content || '').trim()
      if (!content) throw new AppError(400, 'Content is required')
      patch.content = content
    }
    if (data.type !== undefined) {
      patch.type = data.type || 'info'
    }
    if (data.targetRoles !== undefined) {
      patch.targetRoles =
        Array.isArray(data.targetRoles) && data.targetRoles.length > 0
          ? data.targetRoles.filter((role) => ROLES.includes(role))
          : null
    }
    if (data.targetEducationLevels !== undefined) {
      patch.targetEducationLevels = normalizeLevels(data.targetEducationLevels)
    }
    if (data.targetPaymentStatus !== undefined) {
      patch.targetPaymentStatus = normalizePaymentStatus(
        data.targetPaymentStatus,
      )
    }
    if (data.isActive !== undefined) {
      patch.isActive = Boolean(data.isActive)
    }
    if (data.scheduledAt !== undefined) {
      patch.scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null
    }
    if (data.expiresAt !== undefined) {
      patch.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null
    }

    const previousAudience = await this.resolveAudience(
      announcement.targetRoles,
      announcement.targetPaymentStatus,
      announcement.targetEducationLevels,
    )

    await announcement.update(patch)

    const withCreator = await Announcement.findByPk(id, {
      include: [
        { model: User, as: 'creator', attributes: creatorAttributes },
      ],
    })
    const serialized = serializeAnnouncement(withCreator)

    // Everyone who could see it before or now needs a refresh; the client
    // re-fetches, so losing visibility also removes it from their list.
    const audience = new Set([
      ...previousAudience,
      ...(await this.resolveAudience(
        serialized.targetRoles,
        serialized.targetPaymentStatus,
        serialized.targetEducationLevels,
      )),
    ])
    audience.forEach((userId) =>
      emitToUser(userId, 'announcement:update', serialized),
    )

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
