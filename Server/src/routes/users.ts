import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

// Get all users (admin and super admin)
router.get("/", authMiddleware, requireRole("admin", "super_admin"), getUsers);

// Get user by ID (self, or admin/super admin)
router.get(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    const actor = req.user as any;
    if (actor?.id !== req.params.id && !["admin", "super_admin"].includes(actor?.role)) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }
    next();
  },
  getUserById,
);

// Update user (admin only)
router.put(
  "/:id",
  authMiddleware,
  requireRole("admin", "super_admin"),
  updateUser,
);

// Delete user (super admin only)
router.delete("/:id", authMiddleware, requireRole("super_admin"), deleteUser);

export default router;
