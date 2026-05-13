import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import {
  register,
  login,
  getMe,
  logout,
  addDemoAdminRequest,
  getAdminRequests,
  approveAdminRequest,
  rejectAdminRequest,
  submitAdminRequest,
  getAdminRequestStatus,
  setupPassword,
  oauthSuccess,
  oauthRegisterComplete,
  completeOAuthProfile,
  verifyEmail,
  resendVerificationEmail,
  requestPasswordReset,
  verifyResetCode,
  resetPassword,
  cleanupExpiredPendingUsers,
  getPendingUsers,
} from "../controllers/authController.js";
import passport from "passport";

const authAttemptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Too many authentication attempts. Please wait a moment and try again.",
});

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [student, admin, super_admin]
 *                 default: student
 *               studentType:
 *                 type: string
 *                 enum: [high_school, university]
 *               highSchoolGrade:
 *                 type: string
 *                 example: grade_12
 *               highSchoolStream:
 *                 type: string
 *                 example: natural
 *               universityLevel:
 *                 type: string
 *                 example: freshman
 *               university:
 *                 type: string
 *                 example: Addis Ababa University
 *               department:
 *                 type: string
 *                 example: Computer Science
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Register
router.post("/register", authAttemptLimiter, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: student@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Login
router.post("/login", authAttemptLimiter, login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Get current user
router.get("/me", authMiddleware, getMe);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Logout
router.post("/logout", authMiddleware, logout);

// Add demo admin request (for testing auto-approval) - restricted to super admin
router.post(
  "/add-tolesa-request",
  authMiddleware,
  requireRole("super_admin"),
  addDemoAdminRequest,
);

/**
 * @swagger
 * /auth/admin-requests:
 *   get:
 *     summary: Get all admin requests (Super Admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admin requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin access required
 */
router.get(
  "/admin-requests",
  authMiddleware,
  requireRole("super_admin"),
  getAdminRequests,
);

/**
 * @swagger
 * /auth/admin-requests/{id}/approve:
 *   post:
 *     summary: Approve an admin request (Super Admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin request ID
 *     responses:
 *       200:
 *         description: Admin request approved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin access required
 *       404:
 *         description: Admin request not found
 */
router.post(
  "/admin-requests/:id/approve",
  authMiddleware,
  requireRole("super_admin"),
  approveAdminRequest,
);

/**
 * @swagger
 * /auth/admin-requests/{id}/reject:
 *   post:
 *     summary: Reject an admin request (Super Admin only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for rejection
 *     responses:
 *       200:
 *         description: Admin request rejected successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Super Admin access required
 *       404:
 *         description: Admin request not found
 */
router.post(
  "/admin-requests/:id/reject",
  authMiddleware,
  requireRole("super_admin"),
  rejectAdminRequest,
);

/**
 * @swagger
 * /auth/submit-admin-request:
 *   post:
 *     summary: Submit admin request with candidate details
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - university
 *               - department
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address for the admin candidate
 *               password:
 *                 type: string
 *                 description: Password for the admin candidate
 *               name:
 *                 type: string
 *                 description: Full name of the admin candidate
 *               university:
 *                 type: string
 *                 description: University name
 *               department:
 *                 type: string
 *                 description: Department name
 *               stream:
 *                 type: string
 *                 description: Academic stream (optional)
 *     responses:
 *       200:
 *         description: Admin request submitted successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: Admin request not found
 */
router.post("/submit-admin-request", submitAdminRequest);

/**
 * @swagger
 * /auth/admin-request-status:
 *   post:
 *     summary: Check admin request status by email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address used for admin request
 *     responses:
 *       200:
 *         description: Admin request status retrieved successfully
 *       404:
 *         description: No admin request found for this email
 */
router.post("/admin-request-status", getAdminRequestStatus);

/**
 * @swagger
 * /auth/setup-password:
 *   post:
 *     summary: Set up admin password using invitation token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 description: Invitation token received via email
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: New password to set
 *     responses:
 *       200:
 *         description: Password set successfully
 *       400:
 *         description: Invalid or expired token
 */
/**
 * @swagger
 * /auth/complete-oauth-profile:
 *   post:
 *     summary: Complete OAuth profile with student information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentType
 *             properties:
 *               studentType:
 *                 type: string
 *                 enum: [high_school, university]
 *                 description: Type of student
 *               highSchoolGrade:
 *                 type: string
 *                 enum: [grade_9, grade_10, grade_11, grade_12]
 *                 description: Required for high school students
 *               highSchoolStream:
 *                 type: string
 *                 enum: [natural, social]
 *                 description: Required for high school students
 *               universityLevel:
 *                 type: string
 *                 enum: [remedial, freshman, senior, gc]
 *                 description: Required for university students
 *               university:
 *                 type: string
 *                 description: Required for university students
 *               department:
 *                 type: string
 *                 description: Required for university students
 *     responses:
 *       200:
 *         description: Profile completed successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
router.post("/complete-oauth-profile", authMiddleware, completeOAuthProfile);

// OAuth Registration Complete (after collecting additional info)
router.post("/oauth-register-complete", oauthRegisterComplete);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Verify email address with 6-digit code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to verify
 *               code:
 *                 type: string
 *                 description: 6-digit verification code
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired code
 */
router.post("/verify-email", verifyEmail);

/**
 * @swagger
 * /auth/resend-verification:
 *   post:
 *     summary: Resend email verification link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to resend verification to
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *       400:
 *         description: Email already verified or invalid
 *       404:
 *         description: User not found
 */
router.post("/resend-verification", resendVerificationEmail);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to send reset code to
 *     responses:
 *       200:
 *         description: Reset code sent if account exists
 *       400:
 *         description: Invalid request
 */
router.post("/forgot-password", requestPasswordReset);

/**
 * @swagger
 * /auth/verify-reset-code:
 *   post:
 *     summary: Verify password reset code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address
 *               code:
 *                 type: string
 *                 description: 6-digit reset code
 *     responses:
 *       200:
 *         description: Reset code verified successfully
 *       400:
 *         description: Invalid or expired code
 */
router.post("/verify-reset-code", verifyResetCode);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with verified code
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address
 *               code:
 *                 type: string
 *                 description: 6-digit reset code
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid request or expired code
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /auth/cleanup-expired-pending:
 *   post:
 *     summary: Cleanup expired pending user registrations
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Cleanup successful
 *       500:
 *         description: Server error
 */
router.post("/cleanup-expired-pending", cleanupExpiredPendingUsers);

/**
 * @swagger
 * /auth/pending-users:
 *   get:
 *     summary: Get all pending user registrations (for debugging)
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: List of pending users
 *       500:
 *         description: Server error
 */
router.get("/pending-users", getPendingUsers);

// Google OAuth - Register (create new users)
router.get(
  "/google/register",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    state: "register", // Pass mode as state
  }),
);

// Google OAuth - Callback
router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    (error: any, user: any) => {
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const getOAuthErrorCode = (err: any) => {
        if (!err) return "oauth_failed";
        if (err.code === "account_exists") return "account_exists";
        if (err.code === "redirect_uri_mismatch") return "redirect_uri_mismatch";
        if (err.code === "invalid_grant") return "invalid_grant";
        return "oauth_failed";
      };

      if (error) {
        const errorCode = getOAuthErrorCode(error);
        console.error("Google OAuth callback error:", {
          code: errorCode,
          message: error.message,
        });
        return res.redirect(
          `${frontendUrl}/login?error=${encodeURIComponent(errorCode)}`,
        );
      }

      if (!user) {
        return res.redirect(`${frontendUrl}/login?error=oauth_failed`);
      }

      req.user = user;
      return oauthSuccess(req, res);
    },
  )(req, res, next);
});

export default router;
