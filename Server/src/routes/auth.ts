import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from '@middleware/errorHandler'
import { authMiddleware } from '@middleware/auth'
import { AuthService } from '../services/authService'

const router = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [student, admin, super_admin]
 *                 default: student
 *               studentType:
 *                 type: string
 *                 enum: [high_school, university]
 *               highSchoolGrade:
 *                 type: string
 *                 example: grade_12
 *               highSchoolStream:
 *                 type: string
 *                 example: natural
 *               universityLevel:
 *                 type: string
 *                 example: freshman
 *               university:
 *                 type: string
 *                 example: Addis Ababa University
 *               department:
 *                 type: string
 *                 example: Computer Science
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    console.log('Registering request body:', req.body)
    const result = await AuthService.register(req.body)

    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      const message = error.name === 'SequelizeValidationError'
        ? error.errors.map((e: any) => e.message).join(', ')
        : 'Registration failed'
      res.status(400).json({ success: false, error: message })
    }
  }
})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body)

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Login failed' })
    }
  }
})

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Get current user
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError(401, 'No token provided')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    const userData = await AuthService.getCurrentUser(decoded.userId)

    res.json({
      success: true,
      data: userData,
    })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to get user' })
    }
  }
})

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Logout
router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (token) {
      await AuthService.logout(token)
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (error) {
    console.error('Logout error:', error)
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Logout failed' })
    }
  }
})

export default router
