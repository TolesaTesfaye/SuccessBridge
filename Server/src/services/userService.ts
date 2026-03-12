import User from '../models/User'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'

interface CreateUserData {
  email: string
  name: string
  password: string
  role?: 'student' | 'admin' | 'super_admin'
  studentType?: 'high_school' | 'university'
  highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
  highSchoolStream?: 'natural' | 'social'
  universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'
  university?: string
  department?: string
}

export class UserService {
  /**
   * Get all users with optional filtering
   */
  static async getUsers(filters?: {
    role?: string
    studentType?: string
    university?: string
    page?: number
    limit?: number
  }) {
    const { role, studentType, university, page = 1, limit = 10 } = filters || {}

    const where: any = {}
    if (role) where.role = role
    if (studentType) where.studentType = studentType
    if (university) where.university = university

    const offset = (Number(page) - 1) * Number(limit)

    const { count, rows } = await User.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
    })

    return {
      data: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } })
    return user
  }

  /**
   * Create a new user
   */
  static async createUser(data: CreateUserData) {
    const { email, name, password, ...rest } = data

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      ...rest,
    } as any)

    // Return user without password
    const userWithoutPassword = user.toJSON()
    delete (userWithoutPassword as any).password

    return userWithoutPassword
  }

  /**
   * Update user
   */
  static async updateUser(id: string, data: Partial<CreateUserData>) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new Error('User not found')
    }

    // If password is being updated, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    await user.update(data)

    // Return user without password
    const userWithoutPassword = user.toJSON()
    delete (userWithoutPassword as any).password

    return userWithoutPassword
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string) {
    const user = await User.findByPk(id)
    if (!user) {
      throw new Error('User not found')
    }

    await user.destroy()
    return { message: 'User deleted successfully' }
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string) {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
        ],
      },
      limit: 20,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    })

    return users
  }

  /**
   * Get user statistics
   */
  static async getUserStats() {
    const totalUsers = await User.count()
    const students = await User.count({ where: { role: 'student' } })
    const admins = await User.count({ where: { role: 'admin' } })
    const superAdmins = await User.count({ where: { role: 'super_admin' } })

    const highSchoolStudents = await User.count({
      where: { role: 'student', studentType: 'high_school' },
    })
    const universityStudents = await User.count({
      where: { role: 'student', studentType: 'university' },
    })

    return {
      total: totalUsers,
      students,
      admins,
      superAdmins,
      highSchoolStudents,
      universityStudents,
    }
  }
}
