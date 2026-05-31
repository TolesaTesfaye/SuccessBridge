import ResourceType from '../models/ResourceType.js'
import { AppError } from '../middleware/errorHandler.js'

class ResourceTypeService {
  async getAll(filters?: { gradeId?: string }) {
    const where: any = {}
    if (filters?.gradeId) where.gradeId = filters.gradeId
    return ResourceType.findAll({ where, order: [['name', 'ASC']] })
  }

  async getById(id: string) {
    const type = await ResourceType.findByPk(id)
    if (!type) throw new AppError(404, 'Resource type not found')
    return type
  }

  async create(data: { name: string; gradeId: string }) {
    return ResourceType.create(data)
  }

  async update(id: string, data: { name?: string }) {
    const type = await this.getById(id)
    if (data.name !== undefined) type.name = data.name
    await type.save()
    return type
  }

  async delete(id: string) {
    const type = await this.getById(id)
    await type.destroy()
  }
}

export const resourceTypeService = new ResourceTypeService()
