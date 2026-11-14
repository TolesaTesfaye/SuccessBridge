import University from '../models/University.js'
import User from '../models/User.js'
import { Op, fn, col } from 'sequelize'
import { AppError } from '../middleware/errorHandler.js'

export class UniversityService {
  static async getAll() {
    return await University.findAll({ order: [['name', 'ASC']] })
  }

  static async create(data: any) {
    if (!data.name) throw new AppError(400, 'University name is required')
    return await University.create(data)
  }

  static async getById(id: string) {
    const university = await University.findByPk(id)
    if (!university) throw new AppError(404, 'University not found')
    return university
  }

  /**
   * Number of students that selected each university.
   * Keyed by university id. Counts students linked through the
   * universityId foreign key, plus legacy rows that stored only
   * the university name string (matched back to the University table).
   */
  static async getStudentCounts(): Promise<Record<string, number>> {
    // Students linked by the universityId foreign key
    const byId = (await User.findAll({
      attributes: ['universityId', [fn('COUNT', col('id')), 'count']],
      where: { universityId: { [Op.ne]: null } },
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
      where: { universityId: null, university: { [Op.ne]: null } },
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
