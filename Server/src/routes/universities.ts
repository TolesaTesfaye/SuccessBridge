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

// Students-per-university counts (super admin / admin only)
router.get('/student-counts', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const counts = await UniversityService.getStudentCounts()
    res.json({ success: true, data: counts })
  } catch (error) {
    console.error('University student counts error:', error)
    res.status(500).json({ success: false, error: 'Failed to count university students' })
  }
})

// Students who selected a university (super admin / admin only)
router.get('/:id/students', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const students = await UniversityService.getStudents(req.params.id)
    res.json({ success: true, data: students })
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      console.error('University students error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch university students' })
    }
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
      console.error('Create university error:', error)
      res.status(500).json({ success: false, error: 'Failed to create university' })
    }
  }
})

router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const uni = await UniversityService.update(req.params.id, req.body)
    res.json({ success: true, data: uni })
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      console.error('Update university error:', error)
      res.status(500).json({ success: false, error: 'Failed to update university' })
    }
  }
})

router.delete('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    await UniversityService.remove(req.params.id)
    res.json({ success: true, message: 'University deleted' })
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      console.error('Delete university error:', error)
      res.status(500).json({ success: false, error: 'Failed to delete university' })
    }
  }
})

export default router
