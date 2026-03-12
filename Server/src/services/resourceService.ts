import { Op } from 'sequelize'
import Resource from '../models/Resource'
import Subject from '../models/Subject'
import University from '../models/University'
import Department from '../models/Department'
import Grade from '../models/Grade'
import { AppError } from '../middleware/errorHandler'

interface ResourceFilters {
  page?: number
  limit?: number
  type?: string
  resourceType?: string
  educationLevel?: string
  subjectId?: string
  subject?: string
  grade?: string
  category?: string
  stream?: string
  universityId?: string
  departmentId?: string
  university?: string
  department?: string
}

export class ResourceService {
  /**
   * Get resources with advanced filtering
   */
  static async getResources(filters: ResourceFilters) {
    const {
      page = 1,
      limit = 10,
      type,
      resourceType,
      educationLevel,
      subjectId,
      subject: subjectName,
      grade,
      category,
      stream,
      universityId,
      departmentId,
      university: universityName,
      department: departmentName,
    } = filters

    const where: any = {}

    const rawType = type || resourceType
    if (rawType) {
      where.type = (rawType as string).toLowerCase().trim().replace(/\s+/g, '_')
    }

    if (educationLevel) where.educationLevel = (educationLevel as string).toLowerCase()
    
    const gradeValue = grade || category
    if (gradeValue) where.grade = (gradeValue as string).toLowerCase()
    
    if (stream) where.stream = (stream as string).toLowerCase()

    if (universityId) {
      where.universityId = universityId
    } else if (universityName) {
      const uni = await University.findOne({ 
        where: { name: { [Op.iLike]: universityName as string } }
      })
      if (uni) {
        where.universityId = uni.id
      } else {
        return { data: [], total: 0, page: Number(page), limit: Number(limit) }
      }
    }

    if (departmentId) {
      where.departmentId = departmentId
    } else if (departmentName) {
      const dept = await Department.findOne({ where: { name: departmentName as string } })
      if (dept) {
        where.departmentId = dept.id
      }
    }

    if (subjectId) {
      where.subjectId = subjectId
    } else if (subjectName) {
      const subj = await Subject.findOne({ where: { name: subjectName as string } })
      if (subj) {
        where.subjectId = subj.id
      } else {
        return { data: [], total: 0, page: Number(page), limit: Number(limit) }
      }
    }

    const offset = (Number(page) - 1) * Number(limit)

    const { count, rows } = await Resource.findAndCountAll({
      where,
      include: [
        { model: University, as: 'university', attributes: ['id', 'name', 'location'] },
        { model: Department, as: 'department', attributes: ['id', 'name'] },
        { model: Subject, as: 'subject', attributes: ['id', 'name'] }
      ],
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
    })

    return {
      data: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
    }
  }

  /**
   * Get resource by ID
   */
  static async getResourceById(id: string) {
    const resource = await Resource.findByPk(id)
    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }
    return resource
  }

  /**
   * Create a new resource
   */
  static async createResource(data: any, file: Express.Multer.File | undefined, uploadedBy: string) {
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
      tags,
      fileUrl: providedFileUrl
    } = data

    if (!title || !type || !educationLevel || !subject) {
      throw new AppError(400, 'Missing required fields (title, type, educationLevel, subject)')
    }

    if (!file && !providedFileUrl) {
      throw new AppError(400, 'File or File URL is required')
    }

    // Resolve subject
    let subjectId: string
    const existingSubject = await Subject.findOne({ where: { name: subject } })

    if (existingSubject) {
      subjectId = existingSubject.id
    } else {
      const subjectData: any = {
        name: subject,
        code: subject.toUpperCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substring(2, 7) + '_' + Date.now().toString().slice(-4),
      }

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (gradeId) {
        if (uuidRegex.test(gradeId)) {
          subjectData.gradeId = gradeId
        } else {
          const gradeName = gradeId.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
          const g = await Grade.findOne({ where: { name: gradeName } })
          if (g) subjectData.gradeId = g.id
        }
      }

      const newSubject = await Subject.create(subjectData)
      subjectId = newSubject.id
    }

    const fileUrl = file ? `/uploads/${file.filename}` : providedFileUrl

    // Resolve University and Department
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

    const gradeValue = category || gradeId || ''

    return await Resource.create({
      title,
      description,
      type: type.toLowerCase().replace(/\s+/g, '_'),
      fileUrl,
      educationLevel: educationLevel.toLowerCase() === 'university' ? 'university' : 'high_school',
      grade: gradeValue.toLowerCase(),
      stream: stream ? stream.toLowerCase() : undefined,
      subjectId,
      universityId: finalUniversityId,
      departmentId: finalDepartmentId,
      tags: typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : (tags || []),
      uploadedBy,
    } as any)
  }

  /**
   * Update a resource
   */
  static async updateResource(id: string, data: any) {
    const resource = await Resource.findByPk(id)
    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    await resource.update(data)
    return resource
  }

  /**
   * Delete a resource
   */
  static async deleteResource(id: string) {
    const resource = await Resource.findByPk(id)
    if (!resource) {
      throw new AppError(404, 'Resource not found')
    }

    await resource.destroy()
    return { success: true, message: 'Resource deleted' }
  }
}
