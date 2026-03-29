import { Request, Response, NextFunction } from 'express'
import { StudentService } from '../services/studentService.js'

export const getStudentProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id
    const progress = await StudentService.getProgress(studentId)
    res.json({ success: true, data: progress })
  } catch (error) {
    console.error('Get student progress error:', error)
    next(error)
  }
}

export const getStudentStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id
    const stats = await StudentService.getStats(studentId)
    res.json({ success: true, data: stats })
  } catch (error) {
    console.error('Get student stats error:', error)
    next(error)
  }
}

