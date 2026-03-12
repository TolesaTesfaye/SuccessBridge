import { Quiz, QuizResult, StudentProgress } from '../models/index'
import { AppError } from '../middleware/errorHandler'

export class QuizService {
  /**
   * Get all quizzes with filtering
   */
  static async getQuizzes(filters: {
    educationLevel?: string
    grade?: string
    stream?: string
    subjectId?: string
  }) {
    const { educationLevel, grade, stream, subjectId } = filters
    const where: any = {}
    if (educationLevel) where.educationLevel = educationLevel
    if (grade) where.grade = grade
    if (stream) where.stream = stream
    if (subjectId) where.subjectId = subjectId

    return await Quiz.findAll({ where })
  }

  /**
   * Get quiz by ID
   */
  static async getQuizById(id: string) {
    const quiz = await Quiz.findByPk(id)
    if (!quiz) {
      throw new AppError(404, 'Quiz not found')
    }
    return quiz
  }

  /**
   * Create a new quiz
   */
  static async createQuiz(data: any, createdBy: string) {
    const quiz = await Quiz.create({
      ...data,
      createdBy,
    } as any)
    return quiz
  }

  /**
   * Update quiz
   */
  static async updateQuiz(id: string, data: any) {
    const quiz = await Quiz.findByPk(id)
    if (!quiz) {
      throw new AppError(404, 'Quiz not found')
    }
    await quiz.update(data)
    return quiz
  }

  /**
   * Delete quiz
   */
  static async deleteQuiz(id: string) {
    const quiz = await Quiz.findByPk(id)
    if (!quiz) {
      throw new AppError(404, 'Quiz not found')
    }
    await quiz.destroy()
    return { message: 'Quiz deleted' }
  }

  /**
   * Submit quiz result and update progress
   */
  static async submitQuizResult(quizId: string, studentId: string, data: {
    score: number
    totalPoints: number
    timeSpent: number
    answers: any
  }) {
    const { score, totalPoints, timeSpent, answers } = data
    const quiz = await Quiz.findByPk(quizId)
    if (!quiz) {
      throw new AppError(404, 'Quiz not found')
    }

    const result = await QuizResult.create({
      quizId,
      studentId,
      score,
      totalPoints,
      timeSpent,
      answers,
      passed: score >= quiz.passingScore,
    } as any)

    // Update Student Progress
    await this.updateStudentProgress(studentId, quiz.subjectId, score)

    return result
  }

  /**
   * Helper to update student progress
   */
  private static async updateStudentProgress(studentId: string, subjectId: string, score: number) {
    let progress = await StudentProgress.findOne({
      where: {
        studentId,
        subjectId,
      },
    })

    if (!progress) {
      await StudentProgress.create({
        studentId,
        subjectId,
        resourcesCompleted: 0,
        quizzesCompleted: 1,
        averageScore: score,
        lastAccessedAt: new Date(),
      } as any)
    } else {
      const newQuizzesCompleted = progress.quizzesCompleted + 1
      const newAverageScore =
        (progress.averageScore * progress.quizzesCompleted + score) / newQuizzesCompleted

      await progress.update({
        quizzesCompleted: newQuizzesCompleted,
        averageScore: newAverageScore,
        lastAccessedAt: new Date(),
      })
    }
  }
}
