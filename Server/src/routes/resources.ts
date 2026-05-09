import { Router } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { b2Upload as upload } from '../middleware/b2Upload.js'
import {
  getResources,
  getResourceById,
  getResourceStats,
  createResource,
  updateResource,
  deleteResource,
  downloadResource,
  getResourcePreview,
  debugResource,
} from '../controllers/resourceController.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management endpoints
 */

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
router.get('/', getResources)

// Get resource statistics
router.get('/stats', getResourceStats)

// Get single resource
router.get('/:id', getResourceById)

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
router.post('/', authMiddleware, requireRole('admin', 'super_admin'), upload.single('file'), createResource)

// Update resource (admin only)
router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), updateResource)

// Delete resource (admin only)
router.delete('/:id', authMiddleware, requireRole('admin', 'super_admin'), deleteResource)

// Download resource file
router.get('/:id/download', downloadResource)

// Get preview URL (signed URL for private buckets)
router.get('/:id/preview', getResourcePreview)

// Debug resource (development only)
if (process.env.NODE_ENV === 'development') {
  router.get('/:id/debug', debugResource)
}

export default router
