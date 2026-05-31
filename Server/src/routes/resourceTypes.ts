import { Router } from 'express'
import { resourceTypeService } from '../services/resourceTypeService.js'
import { authMiddleware, requireRole } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { gradeId } = req.query
    const filters = gradeId ? { gradeId: String(gradeId) } : undefined
    const types = await resourceTypeService.getAll(filters)
    res.json({ success: true, data: types })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch resource types' })
  }
})

router.post('/', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const type = await resourceTypeService.create(req.body)
    res.status(201).json({ success: true, data: type })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to create resource type' })
  }
})

router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    const type = await resourceTypeService.update(req.params.id, req.body)
    res.json({ success: true, data: type })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

router.delete('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req, res) => {
  try {
    await resourceTypeService.delete(req.params.id)
    res.json({ success: true, message: 'Resource type deleted' })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
})

export default router
