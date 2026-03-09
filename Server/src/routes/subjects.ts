import express from 'express'
import { Subject } from '../models/index'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.findAll()
    res.json(subjects)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' })
  }
})

// Get subject by ID
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id)
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' })
    }
    res.json(subject)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subject' })
  }
})

// Create subject (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, code, departmentId, gradeId, streamId } = req.body
    const subject = await Subject.create({
      name,
      code,
      departmentId,
      gradeId,
      streamId,
    } as any)
    res.status(201).json(subject)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subject' })
  }
})

// Update subject
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id)
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' })
    }
    await subject.update(req.body)
    res.json(subject)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subject' })
  }
})

// Delete subject
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id)
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' })
    }
    await subject.destroy()
    res.json({ message: 'Subject deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subject' })
  }
})

export default router
