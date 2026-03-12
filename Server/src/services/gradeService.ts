import Grade from '../models/Grade'
import { AppError } from '../middleware/errorHandler'

export class GradeService {
  static async getAll() {
    return await Grade.findAll({ order: [['level', 'ASC']] })
  }

  static async getByEducationLevel(educationLevel: 'high_school' | 'university') {
    return await Grade.findAll({
      where: { educationLevel },
      order: [['level', 'ASC']]
    })
  }

  static async seedGrades() {
    const grades = [
      // High School
      { name: 'Grade 9', level: 9, educationLevel: 'high_school' },
      { name: 'Grade 10', level: 10, educationLevel: 'high_school' },
      { name: 'Grade 11', level: 11, educationLevel: 'high_school' },
      { name: 'Grade 12', level: 12, educationLevel: 'high_school' },
      // University
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
