import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import { ILoginRequest, IRegisterRequest } from '../types/index'
import { AppError } from '../middleware/errorHandler'
import redisClient from '../config/redis'

export class AuthService {
  /**
   * Register a new user
   */
  static async register(data: IRegisterRequest & {
    studentType?: string
    highSchoolGrade?: string
    highSchoolStream?: string
    universityLevel?: string
    university?: string
    department?: string
  }) {
    const {
      email,
      name,
      password,
      role = 'student',
      studentType,
      highSchoolGrade,
      highSchoolStream,
      universityLevel,
      university,
      department,
    } = data

    if (!email || !name || !password) {
      throw new AppError(400, 'Email, name, and password are required')
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new AppError(400, 'User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userData = {
      email,
      name,
      password: hashedPassword,
      role,
      studentType: studentType || null,
      highSchoolGrade: highSchoolGrade || null,
      highSchoolStream: highSchoolStream || null,
      universityLevel: universityLevel || null,
      university: university || null,
      department: department || null,
    }

    const user = await User.create(userData as any)

    const token = this.generateToken(user)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        studentType: user.studentType,
        highSchoolGrade: user.highSchoolGrade,
        highSchoolStream: user.highSchoolStream,
        universityLevel: user.universityLevel,
        university: user.university,
        department: user.department,
      },
      token,
    }
  }

  /**
   * Login user
   */
  static async login(data: ILoginRequest) {
    const { email, password } = data

    if (!email || !password) {
      throw new AppError(400, 'Email and password are required')
    }

    let user = await User.findOne({ where: { email } })

    // Handler for super admin auto-seeding if not found
    if (!user) {
      const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'tolesatesfaye273@gmail.com'
      const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || '702512@Tol'

      if (email === superAdminEmail && password === superAdminPassword) {
        const hashedPassword = await bcrypt.hash(superAdminPassword, 10)
        user = await User.create({
          email: superAdminEmail,
          name: 'Super Admin',
          password: hashedPassword,
          role: 'super_admin',
        } as any)
      } else {
        throw new AppError(401, 'Invalid credentials')
      }
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        throw new AppError(401, 'Invalid credentials')
      }
    }

    const token = this.generateToken(user)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        studentType: user.studentType,
        highSchoolGrade: user.highSchoolGrade,
        highSchoolStream: user.highSchoolStream,
        universityLevel: user.universityLevel,
        university: user.university,
        department: user.department,
      },
      token,
    }
  }

  /**
   * Get user by ID (for /me endpoint)
   */
  static async getCurrentUser(userId: string) {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new AppError(404, 'User not found')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentType: user.studentType,
      highSchoolGrade: user.highSchoolGrade,
      highSchoolStream: user.highSchoolStream,
      universityLevel: user.universityLevel,
      university: user.university,
      department: user.department,
    }
  }

  /**
   * Logout (Blacklist token)
   */
  static async logout(token: string) {
    if (!token) return

    try {
      const decoded = jwt.decode(token) as any
      if (decoded && decoded.exp) {
        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000)
        
        if (expiresIn > 0) {
          await redisClient.setEx(`blacklist_${token}`, expiresIn, 'true')
          return true
        }
      }
    } catch (error) {
      console.warn('Redis not available for token blacklisting:', error)
      return false
    }
    return false
  }

  /**
   * Helper to generate JWT
   */
  private static generateToken(user: User) {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
    )
  }
}
