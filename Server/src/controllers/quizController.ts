import { Request, Response, NextFunction } from 'express'
import { QuizService } from '../services/quizService.js'
import { AppError } from '../middleware/errorHandler.js'

export const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizzes = await QuizService.getQuizzes(req.query as any)
    res.json({
      success: true,
      data: quizzes,
    })
  } catch (error) {
    console.error('Fetch quizzes error:', error)
    next(error)
  }
}

export const getQuizById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await QuizService.getQuizById(req.params.id)
    res.json({ success: true, data: quiz })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Fetch quiz error:', error)
    next(error)
  }
}

export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdBy = (req as any).user.userId || (req as any).user.id
    const quiz = await QuizService.createQuiz(req.body, createdBy)
    res.status(201).json({ success: true, data: quiz })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Quiz Create Error:', error)
    next(error)
  }
}

export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await QuizService.updateQuiz(req.params.id, req.body)
    res.json({ success: true, data: quiz })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Update quiz error:', error)
    next(error)
  }
}

export const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await QuizService.deleteQuiz(req.params.id)
    res.json({ success: true, data: result })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Delete quiz error:', error)
    next(error)
  }
}

export const submitQuizResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id
    const result = await QuizService.submitQuizResult(req.params.id, studentId, req.body)
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Submission error:', error)
    next(error)
  }
}

