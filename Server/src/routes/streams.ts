import { Router } from 'express'
import { StreamService } from '../services/streamService.js'
import { authMiddleware, requireRole } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { gradeId } = req.query
    const filters = gradeId ? { gradeId: String(gradeId) } : undefined
    const streams = await StreamService.getAll(filters)
    res.json({ success: true, data: streams })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch streams' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const stream = await StreamService.getById(req.params.id)
    res.json({ success: true, data: stream })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

router.post('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const stream = await StreamService.create(req.body)
    res.status(201).json({ success: true, data: stream })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const stream = await StreamService.update(req.params.id, req.body)
    res.json({ success: true, data: stream })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

router.delete('/:id', authMiddleware, requireRole('super_admin'), async (req, res) => {
  try {
    const result = await StreamService.delete(req.params.id)
    res.json({ success: true, ...result })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

export default router
