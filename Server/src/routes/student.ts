import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { getStudentProgress, getStudentStats } from '../controllers/studentController.js'

const router = Router()

router.get('/progress', authMiddleware, getStudentProgress)

router.get('/stats', authMiddleware, getStudentStats)

export default router
