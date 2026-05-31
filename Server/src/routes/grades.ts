import { Router } from 'express'
import { GradeService } from '../services/gradeService.js'
import { authMiddleware, requireRole } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { educationLevel } = req.query
    let grades
    if (educationLevel === 'high_school' || educationLevel === 'university') {
      grades = await GradeService.getByEducationLevel(educationLevel)
    } else {
      grades = await GradeService.getAll()
    }
    res.json({ success: true, data: grades })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch grades' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const grade = await GradeService.getById(req.params.id)
    res.json({ success: true, data: grade })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Failed to fetch grade' })
  }
})

router.post('/', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const grade = await GradeService.create(req.body)
    res.status(201).json({ success: true, data: grade })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

router.put('/:id', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const grade = await GradeService.update(req.params.id, req.body)
    res.json({ success: true, data: grade })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

router.delete('/:id', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const result = await GradeService.delete(req.params.id)
    res.json({ success: true, ...result })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

export default router
