import { StudentProgress, Resource, QuizResult } from '../models/index.js'
import { AppError } from '../middleware/errorHandler.js'
import sequelize from '../config/database.js'

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
    
    const avgScoreResult = await StudentProgress.findOne({
      attributes: [[sequelize.fn('AVG', sequelize.col('averageScore')), 'avgScore']],
      where: { studentId },
      raw: true
    }) as any

    return {
      totalResources,
      completedResources: completedResources || 0,
      quizzesTaken: quizCount,
      averageScore: avgScoreResult?.avgScore || 0
    }
  }
}
