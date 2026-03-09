import express from 'express'
import { Quiz, QuizResult } from '../models/index'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll()
    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' })
  }
})

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    res.json(quiz)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' })
  }
})

// Create quiz (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, subjectId, questions, timeLimit, passingScore } = req.body
    const quiz = await Quiz.create({
      title,
      description,
      subjectId,
      questions,
      timeLimit,
      passingScore,
      createdBy: (req as any).user.id,
    } as any)
    res.status(201).json(quiz)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' })
  }
})

// Update quiz
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    await quiz.update(req.body)
    res.json(quiz)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' })
  }
})

// Delete quiz
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    await quiz.destroy()
    res.json({ message: 'Quiz deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quiz' })
  }
})

// Submit quiz result
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { score, totalPoints, timeSpent, answers } = req.body
    const quiz = await Quiz.findByPk(req.params.id)
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }

    const studentId = (req as any).user.id
    const result = await QuizResult.create({
      quizId: req.params.id,
      studentId,
      score,
      totalPoints,
      timeSpent,
      answers,
      passed: score >= quiz.passingScore,
    } as any)

    // Update Student Progress
    const { StudentProgress } = require('../models/index')
    let progress = await StudentProgress.findOne({
      where: {
        studentId,
        subjectId: quiz.subjectId
      }
    })

    if (!progress) {
      progress = await StudentProgress.create({
        studentId,
        subjectId: quiz.subjectId,
        resourcesCompleted: 0,
        quizzesCompleted: 1,
        averageScore: score,
        lastAccessedAt: new Date()
      })
    } else {
      const newQuizzesCompleted = progress.quizzesCompleted + 1
      const newAverageScore = ((progress.averageScore * progress.quizzesCompleted) + score) / newQuizzesCompleted

      await progress.update({
        quizzesCompleted: newQuizzesCompleted,
        averageScore: newAverageScore,
        lastAccessedAt: new Date()
      })
    }

    res.status(201).json(result)
  } catch (error) {
    console.error('Submission error:', error)
    res.status(500).json({ error: 'Failed to submit quiz result' })
  }
})

export default router
