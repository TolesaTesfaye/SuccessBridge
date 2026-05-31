import Subject from '../models/Subject.js'
import { AppError } from '../middleware/errorHandler.js'

export class SubjectService {
  static async getSubjects(filters: any) {
    const { gradeId, departmentId, streamId } = filters
    const where: any = {}
    if (gradeId) where.gradeId = gradeId
    if (departmentId) where.departmentId = departmentId
    if (streamId) where.streamId = streamId
    return await Subject.findAll({ where, order: [['name', 'ASC']] })
  }

  static async getById(id: string) {
    const subject = await Subject.findByPk(id)
    if (!subject) throw new AppError(404, 'Subject not found')
    return subject
  }

  static async create(data: any) {
    if (!data.name) throw new AppError(400, 'Subject name is required')
    if (!data.code) throw new AppError(400, 'Subject code is required')
    return await Subject.create(data)
  }

  static async update(id: string, data: any) {
    const subject = await this.getById(id)
    return await subject.update(data)
  }

  static async delete(id: string) {
    const subject = await this.getById(id)
    await subject.destroy()
    return { message: 'Subject deleted successfully' }
  }
}
