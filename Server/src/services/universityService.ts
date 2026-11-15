import University from '../models/University.js'
import User from '../models/User.js'
import Payment from '../models/Payment.js'
import SubjectAccess from '../models/SubjectAccess.js'
import StudentCategoryAccess from '../models/StudentCategoryAccess.js'
import { Op, fn, col } from 'sequelize'
import { AppError } from '../middleware/errorHandler.js'

export class UniversityService {
  static async getAll() {
    return await University.findAll({ order: [['name', 'ASC']] })
  }

  static async create(data: any) {
    if (!data.name || !String(data.name).trim()) {
      throw new AppError(400, 'University name is required')
    }
    try {
      // Location is no longer collected in the admin UI — the column is
      // NOT NULL in the DB, so default it to an empty string.
      return await University.create({
        name: String(data.name).trim(),
        location: data.location ? String(data.location).trim() : '',
        email: data.email ? String(data.email).trim() : null,
      })
    } catch (error: any) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        throw new AppError(409, 'A university with this name already exists')
      }
      throw error
    }
  }

  static async update(id: string, data: any) {
    const university = await University.findByPk(id)
    if (!university) throw new AppError(404, 'University not found')

    if (data.name !== undefined && String(data.name).trim()) {
      university.name = String(data.name).trim()
    }
    if (data.email !== undefined) {
      university.email = data.email ? String(data.email).trim() : null
    }
    // Location is being phased out of the UI — only touch it if explicitly sent
    if (data.location !== undefined && String(data.location).trim()) {
      university.location = String(data.location).trim()
    }

    try {
      await university.save()
    } catch (error: any) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        throw new AppError(409, 'A university with this name already exists')
      }
      throw error
    }
    return university
  }

  static async remove(id: string) {
    const university = await University.findByPk(id)
    if (!university) throw new AppError(404, 'University not found')
    // Detach every record referencing this university so FK constraints
    // can never block the deletion.
    await User.update({ universityId: null }, { where: { universityId: id } })
    await Payment.update({ universityId: null }, { where: { universityId: id } })
    await SubjectAccess.update({ universityId: null }, { where: { universityId: id } })
    await StudentCategoryAccess.update({ universityId: null }, { where: { universityId: id } })
    await university.destroy()
  }

  static async getById(id: string) {
    const university = await University.findByPk(id)
    if (!university) throw new AppError(404, 'University not found')
    return university
  }

  /**
   * Students who selected a university — FK-linked rows plus legacy
   * rows that stored only the university name string (same merge
   * logic as getStudentCounts, so the list always matches the badge).
   */
  static async getStudents(id: string) {
    const university = await University.findByPk(id)
    if (!university) throw new AppError(404, 'University not found')
    return await User.findAll({
      where: {
        role: 'student',
        [Op.or]: [
          { universityId: id },
          { universityId: null, university: { [Op.iLike]: university.name } },
        ],
      },
      attributes: [
        'id', 'name', 'email', 'studentType',
        'highSchoolGrade', 'universityLevel', 'department', 'createdAt',
      ],
      order: [['name', 'ASC']],
      raw: true,
    })
  }

  /**
   * Number of students that selected each university.
   * Keyed by university id. Counts students linked through the
   * universityId foreign key, plus legacy rows that stored only
   * the university name string (matched back to the University table).
   */
  static async getStudentCounts(): Promise<Record<string, number>> {
    // Students linked by the universityId foreign key.
    // role='student' keeps the badge in sync with the per-university
    // student list (admins are not counted).
    const byId = (await User.findAll({
      attributes: ['universityId', [fn('COUNT', col('id')), 'count']],
      where: { role: 'student', universityId: { [Op.ne]: null } },
      group: ['universityId'],
      raw: true,
    })) as unknown as Array<{ universityId: string; count: number | string }>

    const result: Record<string, number> = {}
    for (const row of byId) {
      if (row.universityId) result[row.universityId] = Number(row.count)
    }

    // Legacy rows: university stored as a name string without the FK
    const byName = (await User.findAll({
      attributes: ['university', [fn('COUNT', col('id')), 'count']],
      where: { role: 'student', universityId: null, university: { [Op.ne]: null } },
      group: ['university'],
      raw: true,
    })) as unknown as Array<{ university: string; count: number | string }>

    if (byName.length > 0) {
      const unis = (await University.findAll({
        attributes: ['id', 'name'],
        raw: true,
      })) as Array<{ id: string; name: string }>
      const nameToId = new Map(unis.map((u) => [u.name.toLowerCase(), u.id]))
      for (const row of byName) {
        const id = nameToId.get(String(row.university).toLowerCase())
        if (id) result[id] = (result[id] || 0) + Number(row.count)
      }
    }

    return result
  }
}
