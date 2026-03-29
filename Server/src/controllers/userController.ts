import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/userService.js'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getUsers(req.query as any)

    res.json({
      success: true,
      data: {
        users: result.data,
        total: result.total,
        page: result.page,
        limit: result.limit,
      },
    })
  } catch (error) {
    console.error('Fetch users error:', error)
    next(error)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.getUserById(req.params.id)
    res.json({ success: true, data: user })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ success: false, error: error.message })
    }
    console.error('Fetch user error:', error)
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, ...updateData } = req.body
    const user = await UserService.updateUser(req.params.id, updateData)

    res.json({
      success: true,
      data: user,
    })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ success: false, error: error.message })
    }
    console.error('Update user error:', error)
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.deleteUser(req.params.id)
    res.json({ success: true, message: result.message })
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ success: false, error: error.message })
    }
    console.error('Delete user error:', error)
    next(error)
  }
}

