import express from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuizResult,
} from '../controllers/quizController.js'

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
router.get('/', getQuizzes)

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
router.get('/:id', getQuizById)

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
// Create quiz (admin or super admin only)
router.post('/', authMiddleware, requireRole('admin', 'super_admin'), createQuiz)

// Update quiz (admin or super admin only)
router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), updateQuiz)

// Delete quiz (admin or super admin only)
router.delete('/:id', authMiddleware, requireRole('admin', 'super_admin'), deleteQuiz)

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
router.post('/:id/submit', authMiddleware, submitQuizResult)

export default router
