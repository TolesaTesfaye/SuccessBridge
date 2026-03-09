import { Router, Request, Response } from 'express'
import User from '../models/User'
import { authMiddleware, requireRole } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

const router = Router()

// Get all users (super admin only)
router.get('/', authMiddleware, requireRole('super_admin'), async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role } = req.query

    const where: any = {}
    if (role) where.role = role

    const offset = (Number(page) - 1) * Number(limit)

    const { count, rows } = await User.findAndCountAll({
      where,
      offset,
      limit: Number(limit),
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    })

    res.json({
      success: true,
      data: {
        users: rows,
        total: count,
        page: Number(page),
        limit: Number(limit),
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
})

// Get user by ID
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    res.json({ success: true, data: user })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to fetch user' })
    }
  }
})

// Update user (admin only)
router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    // Don't allow password update through this endpoint
    const { password, ...updateData } = req.body

    await user.update(updateData)

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to update user' })
    }
  }
})

// Delete user (super admin only)
router.delete('/:id', authMiddleware, requireRole('super_admin'), async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      throw new AppError(404, 'User not found')
    }

    await user.destroy()

    res.json({ success: true, message: 'User deleted' })
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to delete user' })
    }
  }
})

export default router
