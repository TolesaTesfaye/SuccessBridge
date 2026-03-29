import Department from '../models/Department.js'
import { AppError } from '../middleware/errorHandler.js'

export class DepartmentService {
  static async getByUniversity(universityId: string) {
    return await Department.findAll({
      where: universityId ? { universityId } : {},
      order: [['name', 'ASC']]
    })
  }

  static async create(data: any) {
    if (!data.name || !data.universityId) {
      throw new AppError(400, 'Department name and University ID are required')
    }
    return await Department.create(data)
  }
}
