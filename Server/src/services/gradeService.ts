import Grade from '../models/Grade.js'
import { AppError } from '../middleware/errorHandler.js'

export class GradeService {
  static async getAll() {
    return await Grade.findAll({ order: [['level', 'ASC']] })
  }

  static async getById(id: string) {
    const grade = await Grade.findByPk(id)
    if (!grade) throw new AppError(404, 'Grade not found')
    return grade
  }

  static async getByEducationLevel(educationLevel: 'high_school' | 'university') {
    return await Grade.findAll({
      where: { educationLevel },
      order: [['level', 'ASC']]
    })
  }

  static async create(data: { name: string; level: number; educationLevel: 'high_school' | 'university' }) {
    if (!data.name) throw new AppError(400, 'Grade name is required')
    if (data.level === undefined || data.level === null) throw new AppError(400, 'Grade level is required')
    if (!data.educationLevel) throw new AppError(400, 'Education level is required')
    return await Grade.create(data)
  }

  static async update(id: string, data: Partial<{ name: string; level: number; educationLevel: 'high_school' | 'university' }>) {
    const grade = await this.getById(id)
    return await grade.update(data)
  }

  static async delete(id: string) {
    const grade = await this.getById(id)
    await grade.destroy()
    return { message: 'Grade deleted successfully' }
  }

  static async seedGrades() {
    const grades = [
      { name: 'Grade 9', level: 9, educationLevel: 'high_school' },
      { name: 'Grade 10', level: 10, educationLevel: 'high_school' },
      { name: 'Grade 11', level: 11, educationLevel: 'high_school' },
      { name: 'Grade 12', level: 12, educationLevel: 'high_school' },
      { name: 'Remedial', level: 0, educationLevel: 'university' },
      { name: 'Freshman', level: 1, educationLevel: 'university' },
      { name: 'Senior', level: 4, educationLevel: 'university' },
      { name: 'GC', level: 5, educationLevel: 'university' },
    ]
    for (const g of grades) {
      const existing = await Grade.findOne({ where: { name: g.name } })
      if (!existing) {
        await Grade.create(g as any)
      }
    }
  }
}
