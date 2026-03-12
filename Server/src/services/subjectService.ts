import Subject from '../models/Subject'
import { AppError } from '../middleware/errorHandler'

export class SubjectService {
  static async getSubjects(filters: any) {
    const { gradeId, departmentId } = filters
    const where: any = {}
    if (gradeId) where.gradeId = gradeId
    if (departmentId) where.departmentId = departmentId
    
    return await Subject.findAll({
      where,
      order: [['name', 'ASC']]
    })
  }

  static async create(data: any) {
    if (!data.name) throw new AppError(400, 'Subject name is required')
    return await Subject.create(data)
  }
}
