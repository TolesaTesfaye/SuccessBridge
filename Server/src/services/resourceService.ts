import { Op } from 'sequelize'
import sequelize from '../config/database.js'
import Resource from '../models/Resource.js'
import Subject from '../models/Subject.js'
import University from '../models/University.js'
import Grade from '../models/Grade.js'
import Stream from '../models/Stream.js'
import { AppError } from '../middleware/errorHandler.js'
import { uploadToB2 } from '../middleware/b2Upload.js'

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
  university?: string
}

export class ResourceService {
  /**
   * Get resources with advanced filtering
   */
  static async getResources(filters: ResourceFilters) {
    const {
      page = 1,
      limit = 1000,
      type,
      resourceType,
      educationLevel,
      subjectId,
      subject: subjectName,
      grade,
      category,
      stream,
      universityId,
      university: universityName,
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

    if (subjectId) {
      where.subjectId = subjectId
    } else if (subjectName) {
      const subj = await Subject.findOne({ where: { name: { [Op.iLike]: subjectName as string } } })
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
   * Get resource statistics
   */
  static async getResourceStats() {
    const totalResources = await Resource.count()
    
    if (totalResources === 0) {
      return {
        total: 0,
        byEducationLevel: {},
        byGrade: {},
        byType: {},
        recent: []
      }
    }

    // Count by education level
    const byEducationLevel = await Resource.findAll({
      attributes: [
        'educationLevel',
        [sequelize.fn('COUNT', sequelize.col('educationLevel')), 'count']
      ],
      group: ['educationLevel'],
      raw: true
    })

    // Count by grade/category
    const byGrade = await Resource.findAll({
      attributes: [
        'grade',
        [sequelize.fn('COUNT', sequelize.col('grade')), 'count']
      ],
      group: ['grade'],
      raw: true
    })

    // Count by type
    const byType = await Resource.findAll({
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('type')), 'count']
      ],
      group: ['type'],
      raw: true
    })

    // Get recent resources
    const recent = await Resource.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'type', 'educationLevel', 'grade', 'createdAt'],
      include: [
        { model: University, as: 'university', attributes: ['name'] },
        { model: Subject, as: 'subject', attributes: ['name'] }
      ]
    })

    return {
      total: totalResources,
      byEducationLevel: byEducationLevel.reduce((acc: any, item: any) => {
        acc[item.educationLevel] = parseInt(item.count)
        return acc
      }, {}),
      byGrade: byGrade.reduce((acc: any, item: any) => {
        acc[item.grade || 'unspecified'] = parseInt(item.count)
        return acc
      }, {}),
      byType: byType.reduce((acc: any, item: any) => {
        acc[item.type] = parseInt(item.count)
        return acc
      }, {}),
      recent: recent
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
  static async createResource(
    data: any,
    files: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File | undefined,
    uploadedBy: string,
  ) {
    console.log('Creating resource with data:', data)

    // Support both the legacy single-file signature and the new fields object
    const filesMap = (Array.isArray(files) ? undefined : files) as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined
    const file = Array.isArray(files) ? files[0] : filesMap?.file?.[0]
    const previewImage = filesMap?.previewImage?.[0]
    console.log('File object:', file ? { name: file.originalname, size: file.size } : 'none')
    console.log(
      'Preview image:',
      previewImage ? { name: previewImage.originalname, size: previewImage.size } : 'none',
    )
    
    const {
      title,
      description,
      type,
      educationLevel,
      grade,
      category,
      stream,
      subject,
      universityId: universityName,
      tags,
      fileUrl: providedFileUrl
    } = data

    if (!title || !type || !educationLevel || !subject) {
      console.error('Missing required fields:', { title, type, educationLevel, subject })
      throw new AppError(400, 'Missing required fields (title, type, educationLevel, subject)')
    }

    if (!file && !providedFileUrl) {
      console.error('No file or fileUrl provided')
      throw new AppError(400, 'File or File URL is required')
    }

    // Resolve subject — accepts UUID or name
    let subjectId: string
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    if (uuidRegex.test(subject)) {
      subjectId = subject
    } else {
      const existingSubject = await Subject.findOne({ where: { name: subject } })
      if (existingSubject) {
        subjectId = existingSubject.id
      } else {
        const subjectData: any = {
          name: subject,
          code: subject.toUpperCase().replace(/\s+/g, '_') + '_' + Math.random().toString(36).substring(2, 7) + '_' + Date.now().toString().slice(-4),
        }

        if (grade) {
          if (uuidRegex.test(grade)) {
            subjectData.gradeId = grade
          } else {
            const g = await Grade.findOne({ where: { name: grade } })
            if (g) subjectData.gradeId = g.id
          }
        }

        const newSubject = await Subject.create(subjectData)
        subjectId = newSubject.id
      }
    }

    // Upload file to B2 and get public URL
    let fileUrl: string
    if (file) {
      console.log('Processing file upload...')
      console.log('File buffer size:', file.buffer?.length || 'no buffer')
      console.log('File mimetype:', file.mimetype)
      console.log('File originalname:', file.originalname)
      
      try {
        // Upload to B2 and get public URL
        fileUrl = await uploadToB2(data, file)
        console.log('File uploaded to B2, public URL:', fileUrl)
      } catch (error) {
        console.error('B2 upload failed:', error)
        throw new AppError(500, `File upload failed: ${error}`)
      }
    } else if (providedFileUrl) {
      fileUrl = providedFileUrl
      console.log('Using provided file URL:', fileUrl)
    } else {
      throw new AppError(400, 'No file provided')
    }

    console.log('Final fileUrl to be saved:', fileUrl)

    // Optional custom preview image — falls back to the default preview on the client
    let previewImageUrl: string | undefined
    if (previewImage) {
      try {
        previewImageUrl = await uploadToB2(data, previewImage, 'previews')
        console.log('Preview image uploaded to B2:', previewImageUrl)
      } catch (error) {
        // Don't fail the whole upload just because the optional preview failed
        console.error('Preview image upload failed, using default preview:', error)
      }
    }

    // Resolve University
    let finalUniversityId = null

    if (universityName) {
      if (uuidRegex.test(universityName)) {
        finalUniversityId = universityName
      } else {
        const uni = await University.findOne({ where: { name: universityName } })
        if (uni) finalUniversityId = uni.id
      }
    }

    // Resolve grade — accept UUID or name string
    let gradeValue = category || ''
    if (!gradeValue && grade) {
      if (uuidRegex.test(grade)) {
        const g = await Grade.findByPk(grade)
        gradeValue = g ? g.name : grade
      } else {
        gradeValue = grade
      }
    }

    // Resolve stream — accept UUID or code string
    let streamValue = stream || ''
    if (stream && uuidRegex.test(stream)) {
      const s = await Stream.findByPk(stream)
      streamValue = s ? s.code : stream
    }
    // Extract base stream type from prefixed codes (e.g. "g11_natural" → "natural")
    const streamParts = (streamValue || '').split('_')
    const baseStream = streamParts.length > 1 ? streamParts[streamParts.length - 1] : streamValue

    // Map grade name to User model format (e.g. "Grade 9" → "grade_9")
    const gradeNameToKey = (name: string): string => {
      const map: Record<string, string> = {
        'grade 9': 'grade_9',
        'grade 10': 'grade_10',
        'grade 11': 'grade_11',
        'grade 12': 'grade_12',
      }
      return map[name.toLowerCase()] || name.toLowerCase()
    }

    const newResource = await Resource.create({
      title,
      description,
      type: type.toLowerCase().replace(/\s+/g, '_'),
      fileUrl,
      previewImageUrl,
      educationLevel: educationLevel.toLowerCase() === 'university' ? 'university' : 'high_school',
      grade: gradeNameToKey(gradeValue),
      stream: baseStream ? baseStream.toLowerCase() : undefined,
      subjectId,
      universityId: finalUniversityId,
      tags: typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : (tags || []),
      uploadedBy,
    } as any)

    console.log('Resource created successfully with fileUrl:', newResource.fileUrl)
    return newResource
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
