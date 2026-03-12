import { Router } from 'express'
import { UniversityService } from '../services/universityService'
import { authMiddleware, requireRole } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const universities = await UniversityService.getAll()
    res.json(universities)
  } catch (error) {
    res.status(500).json({ error: 'Failed' })
  }
})

router.post('/', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const uni = await UniversityService.create(req.body)
    res.status(201).json(uni)
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
})

export default router