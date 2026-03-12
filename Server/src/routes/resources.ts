import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { authMiddleware, requireRole } from '@middleware/auth'
import { AppError } from '@middleware/errorHandler'
import { ResourceService } from '../services/resourceService'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management endpoints
 */

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB default
  },
})

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources with filtering
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Resource type filter
 *       - in: query
 *         name: educationLevel
 *         schema:
 *           type: string
 *           enum: [high_school, university]
 *         description: Education level filter
 *       - in: query
 *         name: grade
 *         schema:
 *           type: string
 *         description: Grade or category filter
 *       - in: query
 *         name: stream
 *         schema:
 *           type: string
 *         description: Stream filter
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Subject name filter
 *       - in: query
 *         name: university
 *         schema:
 *           type: string
 *         description: University name filter
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Department name filter
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Get all resources
router.get('/', async (req: Request, res: Response) => {
  try {
    const filters = req.query as any
    const result = await ResourceService.getResources(filters)

    if (process.env.DEBUG === 'true') {
      console.log('📦 Backend: Found resources count:', result.total)
    }

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Fetch resources error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch resources' })
  }
})

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a single resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Get single resource
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const resource = await ResourceService.getResourceById(req.params.id)
    res.json({ success: true, data: resource })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to fetch resource' })
    }
  }
})

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Upload a new resource
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - type
 *               - educationLevel
 *               - subject
 *               - file
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mathematics Textbook
 *               description:
 *                 type: string
 *                 example: Comprehensive mathematics textbook for grade 12
 *               type:
 *                 type: string
 *                 example: textbook
 *               educationLevel:
 *                 type: string
 *                 enum: [high_school, university]
 *               gradeId:
 *                 type: string
 *                 example: grade_12
 *               category:
 *                 type: string
 *                 example: freshman
 *               stream:
 *                 type: string
 *                 example: natural
 *               subject:
 *                 type: string
 *                 example: Mathematics
 *               universityId:
 *                 type: string
 *                 example: Addis Ababa University
 *               departmentId:
 *                 type: string
 *                 example: Computer Science
 *               tags:
 *                 type: string
 *                 example: math,algebra,calculus
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Resource uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Create resource (admin only)
router.post('/', authMiddleware, requireRole('admin', 'super_admin'), upload.single('file'), async (req: Request, res: Response) => {
  try {
    const createdBy = req.user!.userId
    const resource = await ResourceService.createResource(req.body, req.file, createdBy)

    res.status(201).json({ success: true, data: resource })
  } catch (error) {
    console.error('Resource creation error details:', error)
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(400).json({ success: false, error: (error as Error).message || 'Failed to create resource' })
    }
  }
})

// Update resource (admin only)
router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req: Request, res: Response) => {
  try {
    const resource = await ResourceService.updateResource(req.params.id, req.body)
    res.json({ success: true, data: resource })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to update resource' })
    }
  }
})

// Delete resource (admin only)
router.delete('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req: Request, res: Response) => {
  try {
    const result = await ResourceService.deleteResource(req.params.id)
    res.json(result)
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to delete resource' })
    }
  }
})

export default router
