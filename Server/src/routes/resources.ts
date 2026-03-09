import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import Resource from '@models/Resource'
import Subject from '@models/Subject'
import University from '@models/University'
import Department from '@models/Department'
import Grade from '@models/Grade'
import { authMiddleware, requireRole } from '@middleware/auth'
import { AppError } from '@middleware/errorHandler'

const router = Router()

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

// Get all resources
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      resourceType,
      educationLevel,
      subjectId,
      subject: subjectName,
      grade,
      stream,
      universityId,
      departmentId,
      university: universityName,
      department: departmentName
    } = req.query

    const where: any = {}

    // Map resourceType (frontend labels) to type (backend keys)
    const rawType = type || resourceType
    if (rawType) {
      where.type = (rawType as string).toLowerCase().trim().replace(/\s+/g, '_')
    }

    if (educationLevel) where.educationLevel = (educationLevel as string).toLowerCase()
    if (grade) where.grade = (grade as string).toLowerCase()
    if (stream) where.stream = (stream as string).toLowerCase()

    // Handle University Filtering (by ID or Name)
    if (universityId) {
      where.universityId = universityId
    } else if (universityName) {
      const uni = await University.findOne({ where: { name: universityName as string } })
      if (uni) {
        where.universityId = uni.id
      } else {
        return res.json({ success: true, data: { data: [], total: 0, page: Number(page), limit: Number(limit) } })
      }
    }

    // Handle Department Filtering (by ID or Name)
    if (departmentId) {
      where.departmentId = departmentId
    } else if (departmentName) {
      const dept = await Department.findOne({ where: { name: departmentName as string } })
      if (dept) {
        where.departmentId = dept.id
      } else {
        // Only return empty if they specifically searched for a department that doesn't exist
        // (Freshman don't have depts, so we don't return early if name is missing but req didn't require it)
      }
    }

    // Handle subject filtering (by ID or Name)
    if (subjectId) {
      where.subjectId = subjectId
    } else if (subjectName) {
      const subj = await Subject.findOne({ where: { name: subjectName as string } })
      if (subj) {
        where.subjectId = subj.id
      } else {
        // If subject name provided but not found, return empty results early
        return res.json({
          success: true,
          data: {
            data: [],
            total: 0,
            page: Number(page),
            limit: Number(limit),
          },
        })
      }
    }

    const offset = (Number(page) - 1) * Number(limit)

    const { count, rows } = await Resource.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
    })

    res.json({
      success: true,
      data: {
        data: rows,
        total: count,
        page: Number(page),
        limit: Number(limit),
      },
    })
  } catch (error) {
    console.error('Fetch resources error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch resources' })
  }
})

// Get single resource
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByPk(req.params.id)

    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    res.json({ success: true, data: resource })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to fetch resource' })
    }
  }
})

// Create resource (admin only)
router.post('/', authMiddleware, requireRole('admin', 'super_admin'), upload.single('file'), async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      type,
      educationLevel,
      gradeId,
      category,
      stream,
      subject,
      universityId: universityName,
      departmentId: departmentName,
      tags
    } = req.body
    const file = req.file

    if (!title || !type || !educationLevel || !subject) {
      throw new AppError(400, 'Missing required fields (title, type, educationLevel, subject)')
    }

    if (!file && !req.body.fileUrl) {
      throw new AppError(400, 'File or File URL is required')
    }

    // Try to find subjectId or create a placeholder if it doesn't exist
    let subjectId: string
    const existingSubject = await Subject.findOne({ where: { name: subject } })

    if (existingSubject) {
      subjectId = existingSubject.id
    } else {
      // For high school, we might have a string like 'grade_12'
      // The Subject model expects gradeId to be a UUID. 
      const subjectData: any = {
        name: subject,
        code: subject.toUpperCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substring(2, 7) + '_' + Date.now().toString().slice(-4),
      }

      // Only attempt to add gradeId if it looks like a UUID or resolve if its a name
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (gradeId) {
        if (uuidRegex.test(gradeId)) {
          subjectData.gradeId = gradeId
        } else {
          // Try to look up by name: 'grade_12' -> 'Grade 12'
          const gradeName = gradeId.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
          const g = await Grade.findOne({ where: { name: gradeName } })
          if (g) subjectData.gradeId = g.id
        }
      }

      const newSubject = await Subject.create(subjectData)
      subjectId = newSubject.id
    }

    const fileUrl = file ? `/uploads/${file.filename}` : req.body.fileUrl

    // Resolve University and Department IDs if names were provided
    let finalUniversityId = null
    let finalDepartmentId = null

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    if (universityName) {
      if (uuidRegex.test(universityName)) {
        finalUniversityId = universityName
      } else {
        const uni = await University.findOne({ where: { name: universityName } })
        if (uni) finalUniversityId = uni.id
      }
    }

    if (departmentName) {
      if (uuidRegex.test(departmentName)) {
        finalDepartmentId = departmentName
      } else {
        const dept = await Department.findOne({ where: { name: departmentName } })
        if (dept) finalDepartmentId = dept.id
      }
    }

    const resource = await Resource.create({
      title,
      description,
      type: type.toLowerCase().replace(/\s+/g, '_'),
      fileUrl,
      educationLevel: educationLevel.toLowerCase() === 'university' ? 'university' : 'high_school',
      grade: (gradeId || category || '').toLowerCase(),
      stream: stream ? stream.toLowerCase() : undefined,
      subjectId,
      universityId: finalUniversityId,
      departmentId: finalDepartmentId,
      tags: typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : (tags || []),
      uploadedBy: req.user!.userId,
    } as any)

    res.status(201).json({ success: true, data: resource })
  } catch (error) {
    console.error('Resource creation error details:', error)
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: (error as Error).message || 'Failed to create resource' })
    }
  }
})

// Update resource (admin only)
router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByPk(req.params.id)

    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    await resource.update(req.body)

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
    const resource = await Resource.findByPk(req.params.id)

    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    await resource.destroy()

    res.json({ success: true, message: 'Resource deleted' })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to delete resource' })
    }
  }
})

export default router
