import { Router, Request, Response } from 'express'
import { authMiddleware, requireRole } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'
import { UserService } from '../services/userService'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

// Get all users (super admin only)
router.get('/', authMiddleware, requireRole('super_admin'), async (req: Request, res: Response) => {
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
    res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
})

// Get user by ID
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id)
    res.json({ success: true, data: user })
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to fetch user' })
    }
  }
})

// Update user (admin only)
router.put('/:id', authMiddleware, requireRole('admin', 'super_admin'), async (req: Request, res: Response) => {
  try {
    // Don't allow password update through this general endpoint if specified in requirements,
    // but UserService.updateUser handles hashing if present.
    // The previous implementation explicitly blocked password updates.
    const { password, ...updateData } = req.body
    const user = await UserService.updateUser(req.params.id, updateData)

    res.json({
      success: true,
      data: user,
    })
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to update user' })
    }
  }
})

// Delete user (super admin only)
router.delete('/:id', authMiddleware, requireRole('super_admin'), async (req: Request, res: Response) => {
  try {
    const result = await UserService.deleteUser(req.params.id)
    res.json({ success: true, message: result.message })
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ success: false, error: error.message })
    } else {
      res.status(500).json({ success: false, error: 'Failed to delete user' })
    }
  }
})

export default router
