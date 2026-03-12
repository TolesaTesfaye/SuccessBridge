import express from 'express'
import { authMiddleware } from '../middleware/auth'
import { QuizService } from '../services/quizService'
import { AppError } from '../middleware/errorHandler'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management endpoints
 */

/**
 * @swagger
 * /quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: List of quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
 *       500:
 *         description: Server error
 */

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await QuizService.getQuizzes(req.query as any)
    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' })
  }
})

/**
 * @swagger
 * /quizzes/{id}:
 *   get:
 *     summary: Get quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: Quiz not found
 */
// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await QuizService.getQuizById(req.params.id)
    res.json(quiz)
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Failed to fetch quiz' })
    }
  }
})

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - subjectId
 *               - questions
 *               - timeLimit
 *               - passingScore
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mathematics Quiz 1
 *               description:
 *                 type: string
 *                 example: Basic algebra and geometry questions
 *               subjectId:
 *                 type: string
 *                 format: uuid
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *               timeLimit:
 *                 type: integer
 *                 example: 30
 *               passingScore:
 *                 type: number
 *                 example: 70
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       401:
 *         description: Unauthorized
 */
// Create quiz (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const createdBy = (req as any).user.userId || (req as any).user.id
    const quiz = await QuizService.createQuiz(req.body, createdBy)
    res.status(201).json(quiz)
  } catch (error: any) {
    console.error('Quiz Create Error:', error)
    res.status(500).json({ error: 'Failed to create quiz', details: error.message })
  }
})

// Update quiz
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const quiz = await QuizService.updateQuiz(req.params.id, req.body)
    res.json(quiz)
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Failed to update quiz' })
    }
  }
})

// Delete quiz
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await QuizService.deleteQuiz(req.params.id)
    res.json(result)
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Failed to delete quiz' })
    }
  }
})

/**
 * @swagger
 * /quizzes/{id}/submit:
 *   post:
 *     summary: Submit quiz result
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *               - totalPoints
 *               - timeSpent
 *               - answers
 *             properties:
 *               score:
 *                 type: number
 *                 example: 85
 *               totalPoints:
 *                 type: number
 *                 example: 100
 *               timeSpent:
 *                 type: integer
 *                 example: 1800
 *               answers:
 *                 type: object
 *                 example: {"q1": "A", "q2": "B"}
 *     responses:
 *       201:
 *         description: Quiz result submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 quizId:
 *                   type: string
 *                   format: uuid
 *                 studentId:
 *                   type: string
 *                   format: uuid
 *                 score:
 *                   type: number
 *                 totalPoints:
 *                   type: number
 *                 timeSpent:
 *                   type: integer
 *                 answers:
 *                   type: object
 *                 passed:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 */
// Submit quiz result
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const studentId = (req as any).user.userId || (req as any).user.id
    const result = await QuizService.submitQuizResult(req.params.id, studentId, req.body)
    res.status(201).json(result)
  } catch (error: any) {
    console.error('Submission error:', error)
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Failed to submit quiz result' })
    }
  }
})

export default router
