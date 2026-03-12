import { Router } from 'express'
import { SubjectService } from '../services/subjectService'
import { authMiddleware, requireRole } from '../middleware/auth'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const subjects = await SubjectService.getSubjects(req.query)
    res.json(subjects)
  } catch (error) {
    res.status(500).json({ error: 'Failed' })
  }
})

router.post('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const subject = await SubjectService.create(req.body)
    res.status(201).json(subject)
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
})

export default router
