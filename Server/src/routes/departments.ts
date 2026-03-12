import { Router } from 'express'
import { DepartmentService } from '../services/departmentService'
import { authMiddleware, requireRole } from '../middleware/auth'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const departments = await DepartmentService.getByUniversity(req.query.universityId as string)
    res.json(departments)
  } catch (error) {
    res.status(500).json({ error: 'Failed' })
  }
})

router.post('/', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const dept = await DepartmentService.create(req.body)
    res.status(201).json(dept)
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ error: error.message })
  }
})

export default router
