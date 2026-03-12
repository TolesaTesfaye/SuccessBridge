import { Router } from 'express'
import { StudentService } from '../services/studentService'
import { authMiddleware } from '../middleware/auth'

const router = Router()

router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id
    const progress = await StudentService.getProgress(studentId)
    res.json({ success: true, data: progress })
  } catch (error) {
    res.status(500).json({ error: 'Failed' })
  }
})

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id
    const stats = await StudentService.getStats(studentId)
    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ error: 'Failed' })
  }
})

export default router
