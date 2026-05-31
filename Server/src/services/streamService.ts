import Stream from '../models/Stream.js'
import { AppError } from '../middleware/errorHandler.js'

export class StreamService {
  static async getAll(filters?: { gradeId?: string }) {
    const where: any = {}
    if (filters?.gradeId) where.gradeId = filters.gradeId
    return await Stream.findAll({ where, order: [['name', 'ASC']] })
  }

  static async getById(id: string) {
    const stream = await Stream.findByPk(id)
    if (!stream) throw new AppError(404, 'Stream not found')
    return stream
  }

  static async create(data: { name: string; code: string; gradeId: string }) {
    if (!data.name) throw new AppError(400, 'Stream name is required')
    if (!data.code) throw new AppError(400, 'Stream code is required')
    if (!data.gradeId) throw new AppError(400, 'Grade ID is required')
    return await Stream.create(data)
  }

  static async update(id: string, data: Partial<{ name: string; code: string; gradeId: string }>) {
    const stream = await this.getById(id)
    return await stream.update(data)
  }

  static async delete(id: string) {
    const stream = await this.getById(id)
    await stream.destroy()
    return { message: 'Stream deleted successfully' }
  }
}
