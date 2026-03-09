import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '@models/User'
import type { ILoginRequest, IRegisterRequest } from '../types/index'
import { AppError } from '@middleware/errorHandler'

const router = Router()

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    console.log('Registering request body:', req.body)
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
    } = req.body as IRegisterRequest & {
      studentType?: string
      highSchoolGrade?: string
      highSchoolStream?: string
      universityLevel?: string
      university?: string
      department?: string
    }

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

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as any,
    )

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          studentType,
          highSchoolGrade,
          highSchoolStream,
          universityLevel,
          university,
          department,
        },
        token,
      },
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

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ILoginRequest

    if (!email || !password) {
      throw new AppError(400, 'Email and password are required')
    }

    const user = await User.findOne({ where: { email } })

    // If user not found, check if it's the super admin credentials for demo
    if (!user) {
      const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'tolesatesfaye273@gmail.com'
      const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || '702512@Tol'

      if (email === superAdminEmail && password === superAdminPassword) {
        // Create super admin in database if it doesn't exist
        const hashedPassword = await bcrypt.hash(superAdminPassword, 10)
        const newUser = await User.create({
          email: superAdminEmail,
          name: 'Super Admin',
          password: hashedPassword,
          role: 'super_admin',
        } as any)

        const token = jwt.sign(
          { userId: newUser.id, email: newUser.email, role: newUser.role },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: process.env.JWT_EXPIRE || '7d' } as any,
        )

        return res.json({
          success: true,
          data: {
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
            },
            token,
          },
        })
      }

      throw new AppError(401, 'Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials')
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' } as any,
    )

    res.json({
      success: true,
      data: {
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
      },
    })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Login failed' })
    }
  }
})

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError(401, 'No token provided')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    const user = await User.findByPk(decoded.userId)

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    res.json({
      success: true,
      data: {
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
    })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to get user' })
    }
  }
})

export default router
