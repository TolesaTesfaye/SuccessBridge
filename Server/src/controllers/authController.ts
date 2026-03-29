import { Request, Response, NextFunction } from 'express'
import { AppError } from '../middleware/errorHandler.js'
import { AuthService } from '../services/authService.js'
import { ILoginRequest, IRegisterRequest } from '../types/index.js'

export const register = async (req: Request<unknown, unknown, IRegisterRequest>, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body
    if (!email || !name || !password) {
      throw new AppError(400, 'Email, name, and password are required')
    }

    const result = await AuthService.register(req.body)

    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    const message =
      error.name === 'SequelizeValidationError'
        ? error.errors.map((e: any) => e.message).join(', ')
        : 'Registration failed'
    res.status(400).json({ success: false, error: message })
  }
}

export const login = async (req: Request<unknown, unknown, ILoginRequest>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new AppError(400, 'Email and password are required')
    }

    const result = await AuthService.login(req.body)

    res.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Login error:', error)
    res.status(500).json({ success: false, error: 'Login failed' })
  }
}

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, 'Unauthorized')
    }

    const userData = await AuthService.getCurrentUser(req.user.userId)

    res.json({
      success: true,
      data: userData,
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Get current user error:', error)
    res.status(500).json({ success: false, error: 'Failed to get user' })
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (token) {
      await AuthService.logout(token)
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error: any) {
    console.error('Logout error:', error)
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    res.status(500).json({ success: false, error: 'Logout failed' })
  }
}

export const addDemoAdminRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tolesaData = {
      name: 'Tolesa Tesfaye',
      email: 'successbirdge27@gmail.com',
      password: 'sb123409987',
      role: 'admin' as const,
      university: 'Addis Ababa University',
      department: 'Computer Science',
    }

    const result = await AuthService.register(tolesaData)

    res.json({
      success: true,
      data: result,
      message: 'Demo admin request created successfully - will be auto-approved in a few seconds',
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Demo admin request error:', error)
    res.status(400).json({ success: false, error: 'Failed to create admin request' })
  }
}

export const getAdminRequests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requests = await AuthService.getAllAdminRequests()
    res.json({ success: true, requests })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Get admin requests error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch admin requests' })
  }
}

export const approveAdminRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await AuthService.approveAdminRequest(id, req.user!.userId)
    res.json({ success: true, message: 'Admin request approved successfully', user: result })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Approve admin request error:', error)
    res.status(500).json({ success: false, error: 'Failed to approve admin request' })
  }
}

export const rejectAdminRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { reason } = req.body

    if (!reason) {
      return res.status(400).json({ success: false, error: 'Rejection reason is required' })
    }

    await AuthService.rejectAdminRequest(id, req.user!.userId, reason)
    res.json({ success: true, message: 'Admin request rejected successfully' })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Reject admin request error:', error)
    res.status(500).json({ success: false, error: 'Failed to reject admin request' })
  }
}

export const submitAdminRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, university, department, stream } = req.body

    // Validate required fields
    if (!email || !password || !name || !university || !department) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email, password, name, university, and department are required' 
      })
    }

    // Check if this is the standard admin request email
    if (email !== 'successbridge27@gmail.com') {
      return res.status(400).json({ 
        success: false, 
        error: 'Please use the standard admin request email: successbridge27@gmail.com' 
      })
    }

    const result = await AuthService.submitAdminRequest({
      email,
      password,
      name,
      university,
      department,
      stream
    })

    res.json({
      success: true,
      data: result,
      message: 'Admin request submitted successfully. Please wait for super admin approval.'
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Submit admin request error:', error)
    res.status(500).json({ success: false, error: 'Failed to submit admin request' })
  }
}

export const getAdminRequestStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' })
    }

    const status = await AuthService.getAdminRequestStatus(email)
    res.json({ success: true, status })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Get admin request status error:', error)
    res.status(500).json({ success: false, error: 'Failed to get admin request status' })
  }
}

export const setupPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body
    if (!token || !password) {
      throw new AppError(400, 'Token and password are required')
    }

    const result = await AuthService.setupAdminPassword({ token, password })

    res.json({
      success: true,
      message: result.message,
      data: result.user
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Setup password error:', error)
    res.status(500).json({ success: false, error: 'Failed to setup password' })
  }
}

export const completeOAuthProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, 'Unauthorized')
    }

    const { studentType, highSchoolGrade, highSchoolStream, universityLevel, university, department } = req.body

    if (!studentType || !['high_school', 'university'].includes(studentType)) {
      throw new AppError(400, 'Valid student type is required (high_school or university)')
    }

    // Validate required fields based on student type
    if (studentType === 'high_school') {
      if (!highSchoolGrade || !highSchoolStream) {
        throw new AppError(400, 'High school grade and stream are required for high school students')
      }
    } else if (studentType === 'university') {
      if (!universityLevel || !university || !department) {
        throw new AppError(400, 'University level, university, and department are required for university students')
      }
    }

    const result = await AuthService.completeOAuthProfile(req.user.userId, {
      studentType,
      highSchoolGrade,
      highSchoolStream,
      universityLevel,
      university,
      department
    })

    res.json({
      success: true,
      data: result,
      message: 'Profile completed successfully'
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ success: false, error: error.message })
    }
    console.error('Complete OAuth profile error:', error)
    res.status(500).json({ success: false, error: 'Failed to complete profile' })
  }
}

export const oauthSuccess = async (req: Request, res: Response) => {
  try {
    console.log('OAuth Success - User:', req.user)
    
    const user = req.user as any
    if (!user || !user.userId) {
      console.error('OAuth Success - No user data received')
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
      return res.redirect(`${frontendUrl}/login?error=no_user_data`)
    }

    // Check if user profile is complete
    const fullUser = await AuthService.getCurrentUser(user.userId)
    const isProfileComplete = fullUser.studentType && 
      ((fullUser.studentType === 'high_school' && fullUser.highSchoolGrade && fullUser.highSchoolStream) ||
       (fullUser.studentType === 'university' && fullUser.universityLevel && fullUser.university && fullUser.department))

    const token = AuthService.generateToken({ id: user.userId, email: user.email, role: user.role } as any)
    console.log('OAuth Success - Token generated for user:', user.userId)
    
    // Redirect based on profile completeness
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    let redirectUrl: string
    
    if (isProfileComplete) {
      // Profile complete - go to dashboard
      redirectUrl = `${frontendUrl}/oauth-callback?token=${token}`
    } else {
      // Profile incomplete - go to profile completion page
      redirectUrl = `${frontendUrl}/oauth-callback?token=${token}&complete_profile=true`
    }
    
    console.log('OAuth Success - Redirecting to:', redirectUrl)
    res.redirect(redirectUrl)
  } catch (error) {
    console.error('OAuth success error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    res.redirect(`${frontendUrl}/login?error=oauth_failed`)
  }
}

