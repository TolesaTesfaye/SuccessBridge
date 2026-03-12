import University from '../models/University'
import { AppError } from '../middleware/errorHandler'

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
}
