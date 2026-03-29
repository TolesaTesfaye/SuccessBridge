import { Router } from 'express'
import { UniversityService } from '../services/universityService.js'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { AppError } from '../middleware/errorHandler.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const universities = await UniversityService.getAll()
    res.json({ success: true, data: universities })
  } catch (error) {
    console.error('Fetch universities error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch universities' })
  }
})

router.post('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const uni = await UniversityService.create(req.body)
    res.status(201).json({ success: true, data: uni })
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to create university' })
    }
  }
})

export default router
