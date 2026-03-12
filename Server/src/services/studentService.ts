import { StudentProgress, Resource, QuizResult } from '../models/index'
import { AppError } from '../middleware/errorHandler'

export class StudentService {
  static async getProgress(studentId: string) {
    return await StudentProgress.findAll({
      where: { studentId },
      include: ['subject']
    })
  }

  static async getStats(studentId: string) {
    const totalResources = await Resource.count()
    const completedResources = await StudentProgress.sum('resourcesCompleted', {
      where: { studentId }
    })
    
    const quizCount = await QuizResult.count({
      where: { studentId }
    })
    
    const avgScore = await StudentProgress.findOne({
      attributes: [[StudentProgress.sequelize!.fn('AVG', StudentProgress.sequelize!.col('averageScore')), 'avgScore']],
      where: { studentId },
      raw: true
    }) as any

    return {
      totalResources,
      completedResources: completedResources || 0,
      quizzesTaken: quizCount,
      averageScore: avgScore?.avgScore || 0
    }
  }
}
