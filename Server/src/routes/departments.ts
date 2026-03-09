import express from 'express'
import { Department } from '../models/index'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll()
    res.json(departments)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' })
  }
})

// Get department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id)
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    res.json(department)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch department' })
  }
})

// Create department (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, code, universityId } = req.body
    const department = await Department.create({
      name,
      code,
      universityId,
    } as any)
    res.status(201).json(department)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create department' })
  }
})

// Update department
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id)
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    await department.update(req.body)
    res.json(department)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update department' })
  }
})

// Delete department
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id)
    if (!department) {
      return res.status(404).json({ error: 'Department not found' })
    }
    await department.destroy()
    res.json({ message: 'Department deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete department' })
  }
})

export default router
