import { Op } from 'sequelize'
import { Quiz, QuizResult, StudentProgress } from '../models/index.js'
import { AppError } from '../middleware/errorHandler.js'

export interface QuizListFilters {
  educationLevel?: string
  grade?: string
  universityLevel?: string
  stream?: string
  university?: string
  department?: string
  subjectId?: string
  isAiGenerated?: string | boolean
}

export class QuizService {
  /**
   * Get quizzes visible to a student (or admin list) using targeting metadata.
   */
  static async getQuizzes(filters: QuizListFilters) {
    const {
      educationLevel,
      grade,
      universityLevel,
      stream,
      university,
      department,
      subjectId,
      isAiGenerated,
    } = filters

    const andConditions: Record<string, unknown>[] = []

    if (educationLevel) {
      andConditions.push({ educationLevel })
    }

    const gradeValue = grade || universityLevel
    if (gradeValue) {
      andConditions.push({ grade: gradeValue })
    }

    if (stream) {
      andConditions.push({
        [Op.or]: [{ stream: null }, { stream: '' }, { stream }],
      })
    }

    if (university) {
      andConditions.push({
        [Op.or]: [{ university: null }, { university: '' }, { university }],
      })
    }

    if (department) {
      andConditions.push({
        [Op.or]: [{ department: null }, { department: '' }, { department }],
      })
    }

    if (subjectId) {
      andConditions.push({ subjectId })
    }

    if (isAiGenerated !== undefined) {
      andConditions.push({
        isAiGenerated: isAiGenerated === 'true' || isAiGenerated === true,
      })
    }

    const where =
      andConditions.length > 0 ? { [Op.and]: andConditions } : {}

    return await Quiz.findAll({
      where,
      order: [['createdAt', 'DESC']],
    })
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
   * Create a new quiz (publish) with targeting fields persisted.
   */
  static async createQuiz(data: any, createdBy: string) {
    const university =
      data.university ?? data.universityId ?? data.universityName ?? undefined
    const department =
      data.department ?? data.departmentId ?? data.departmentName ?? undefined

    const quiz = await Quiz.create({
      title: data.title,
      description: data.description ?? '',
      subjectId: data.subjectId,
      educationLevel: data.educationLevel ?? 'high_school',
      grade: data.grade,
      stream: data.stream,
      university,
      department,
      questions: data.questions ?? [],
      timeLimit: data.timeLimit ?? 30,
      passingScore: data.passingScore ?? 60,
      isAiGenerated: Boolean(data.isAiGenerated),
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
  static async submitQuizResult(
    quizId: string,
    studentId: string,
    data: {
      score: number
      totalPoints: number
      timeSpent: number
      answers: any
    },
  ) {
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

    await this.updateStudentProgress(studentId, quiz.subjectId, score)

    return result
  }

  /**
   * Helper to update student progress
   */
  private static async updateStudentProgress(
    studentId: string,
    subjectId: string,
    score: number,
  ) {
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
        (progress.averageScore * progress.quizzesCompleted + score) /
        newQuizzesCompleted

      await progress.update({
        quizzesCompleted: newQuizzesCompleted,
        averageScore: newAverageScore,
        lastAccessedAt: new Date(),
      })
    }
  }
}
