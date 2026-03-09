import express from 'express'
import { University } from '../models/index'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.findAll()
    res.json(universities)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch universities' })
  }
})

// Get university by ID
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id)
    if (!university) {
      return res.status(404).json({ error: 'University not found' })
    }
    res.json(university)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch university' })
  }
})

// Create university (super admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, location, email, phone } = req.body
    const university = await University.create({
      name,
      location,
      email,
      phone,
    } as any)
    res.status(201).json(university)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create university' })
  }
})

// Update university
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id)
    if (!university) {
      return res.status(404).json({ error: 'University not found' })
    }
    await university.update(req.body)
    res.json(university)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update university' })
  }
})

// Delete university
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id)
    if (!university) {
      return res.status(404).json({ error: 'University not found' })
    }
    await university.destroy()
    res.json({ message: 'University deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete university' })
  }
})

export default router
