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

// Get user by ID
router.get("/:id", authMiddleware, getUserById);

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
