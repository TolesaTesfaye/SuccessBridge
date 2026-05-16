import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler.js";
import { AuthService } from "../services/authService.js";
import { ILoginRequest, IRegisterRequest } from "../types/index.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import auditService from "../services/auditService.js";
import { AuditRequest } from "../middleware/auditLogger.js";

export const register = async (
  req: Request<unknown, unknown, IRegisterRequest>,
  res: Response,
  next: NextFunction,
) => {
  const auditReq = req as AuditRequest;
  try {
    console.log('=== REGISTRATION CONTROLLER ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { email, name, password, role } = req.body;
    if (!email || !name || !password) {
      throw new AppError(400, "Email, name, and password are required");
    }

    // Set a timeout for the entire registration process
    const registrationPromise = AuthService.register(req.body);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Registration timeout')), 25000) // 25 seconds
    );

    const result = await Promise.race([registrationPromise, timeoutPromise]) as any;

    // Log successful registration
    auditService.logAction({
      userId: result?.user?.id,
      action: 'register',
      resource: 'users',
      resourceId: result?.user?.id,
      details: { email, role: role || 'student' },
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'success',
    });

    // For admin registration, return 201 with token for immediate login
    // For student registration, return 201 with verification requirement
    res.status(201).json({
      success: true,
      data: result,
      message: role === 'admin' 
        ? 'Admin account created successfully! You can now log in.'
        : result.message,
    });
  } catch (error: any) {
    // Log failed registration
    auditService.logAction({
      action: 'register',
      resource: 'users',
      details: { email: req.body?.email },
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'failure',
      errorMessage: error?.message || 'Registration failed',
    });

    console.error("Registration error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    // Handle timeout specifically
    if (error.message === 'Registration timeout') {
      return res.status(408).json({ 
        success: false, 
        error: 'Registration is taking longer than expected. Your account may have been created. Please try logging in or use the "Resend Code" option if you received a verification email.' 
      });
    }
    
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    
    // Handle Sequelize validation errors with more detail
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
        value: e.value,
        type: e.type
      }));
      console.error("Validation errors:", validationErrors);
      const message = error.errors.map((e: any) => `${e.path}: ${e.message}`).join(", ");
      return res.status(400).json({ 
        success: false, 
        error: message,
        details: validationErrors
      });
    }
    
    // Handle Sequelize database errors
    if (error.name === "SequelizeDatabaseError") {
      console.error("Database error:", error.message);
      return res.status(400).json({ 
        success: false, 
        error: "Database error: " + error.message 
      });
    }
    
    res.status(400).json({ success: false, error: error.message || "Registration failed" });
  }
};

export const login = async (
  req: Request<unknown, unknown, ILoginRequest>,
  res: Response,
  next: NextFunction,
) => {
  const auditReq = req as AuditRequest;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError(400, "Email and password are required");
    }

    const result = await AuthService.login(req.body);

    // Log successful login
    auditService.logAction({
      userId: result?.user?.id,
      action: 'login',
      resource: 'users',
      resourceId: result?.user?.id,
      details: { email },
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'success',
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    const auditReq = req as AuditRequest;
    // Log failed login
    auditService.logAction({
      action: 'login',
      resource: 'users',
      details: { email: req.body?.email },
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'failure',
      errorMessage: error?.message || 'Login failed',
    });

    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Login failed" });
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, "Unauthorized");
    }

    const userData = await AuthService.getCurrentUser(req.user.userId);

    res.json({
      success: true,
      data: userData,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Get current user error:", error);
    res.status(500).json({ success: false, error: "Failed to get user" });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auditReq = req as AuditRequest;
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = (req.user as any)?.userId || (req.user as any)?.id;

    if (token) {
      await AuthService.logout(token);
    }

    // Log logout
    auditService.logAction({
      userId,
      action: 'logout',
      resource: 'users',
      resourceId: userId,
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'success',
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: "Logout failed" });
  }
};

export const addDemoAdminRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    const demoData = {
      name: "Demo Admin",
      email: `demo-admin-${Date.now()}@example.com`,
      password: `DemoPassword-${Date.now()}`,
      role: "admin" as const,
      university: "Demo University",
      department: "Demo Department",
    };

    const result = await AuthService.register(demoData);

    res.json({
      success: true,
      data: result,
      message:
        "Demo admin request created successfully - will be auto-approved in a few seconds",
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Demo admin request error:", error);
    res
      .status(400)
      .json({ success: false, error: "Failed to create admin request" });
  }
};

export const getAdminRequests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requests = await AuthService.getAllAdminRequests();
    res.json({ success: true, requests });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Get admin requests error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch admin requests" });
  }
};

export const approveAdminRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await AuthService.approveAdminRequest(id, req.user!.userId);
    res.json({
      success: true,
      message: "Admin request approved successfully",
      user: result,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Approve admin request error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to approve admin request" });
  }
};

export const rejectAdminRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res
        .status(400)
        .json({ success: false, error: "Rejection reason is required" });
    }

    await AuthService.rejectAdminRequest(id, req.user!.userId, reason);
    res.json({ success: true, message: "Admin request rejected successfully" });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Reject admin request error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to reject admin request" });
  }
};

export const submitAdminRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, name, university, department, stream } = req.body;

    // Validate required fields
    if (!email || !password || !name || !university || !department) {
      return res.status(400).json({
        success: false,
        error: "Email, password, name, university, and department are required",
      });
    }

    const result = await AuthService.submitAdminRequest({
      email,
      password,
      name,
      university,
      department,
      stream,
    });

    res.json({
      success: true,
      data: result,
      message:
        "Admin request submitted successfully. Please wait for super admin approval.",
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Submit admin request error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to submit admin request" });
  }
};

export const getAdminRequestStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    const status = await AuthService.getAdminRequestStatus(email);
    res.json({ success: true, status });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Get admin request status error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to get admin request status" });
  }
};

export const setupPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      throw new AppError(400, "Token and password are required");
    }

    const result = await AuthService.setupAdminPassword({ token, password });

    res.json({
      success: true,
      message: result.message,
      data: result.user,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Setup password error:", error);
    res.status(500).json({ success: false, error: "Failed to setup password" });
  }
};

export const oauthRegisterComplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { 
      email, name, password, googleId, provider,
      studentType, highSchoolGrade, highSchoolStream,
      universityLevel, universityId, departmentId
    } = req.body;

    if (!email || !name || !password) {
      throw new AppError(400, "Email, name, and password are required");
    }

    if (!provider || provider !== 'google') {
      throw new AppError(400, "Invalid OAuth provider");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(400, "User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user directly (bypass PendingUser for OAuth)
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      role: 'student',
      isEmailVerified: true, // OAuth emails are pre-verified
      isApproved: true,
      approvalStatus: 'approved',
      // Profile data
      studentType: studentType || null,
      highSchoolGrade: highSchoolGrade || null,
      highSchoolStream: highSchoolStream || null,
      universityLevel: universityLevel || null,
      universityId: universityId || null,
      departmentId: departmentId || null,
      // OAuth IDs
      ...(googleId && { googleId })
    } as any);

    // Generate token
    const token = AuthService.generateToken(newUser);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          studentType: newUser.studentType
        }
      },
      message: "Registration successful."
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("OAuth register complete error:", error);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
};

export const completeOAuthProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError(401, "Unauthorized");
    }

    const {
      studentType,
      highSchoolGrade,
      highSchoolStream,
      universityLevel,
      university,
      department,
    } = req.body;

    if (!studentType || !["high_school", "university"].includes(studentType)) {
      throw new AppError(
        400,
        "Valid student type is required (high_school or university)",
      );
    }

    // Validate required fields based on student type
    if (studentType === "high_school") {
      if (!highSchoolGrade || !highSchoolStream) {
        throw new AppError(
          400,
          "High school grade and stream are required for high school students",
        );
      }
    } else if (studentType === "university") {
      if (!universityLevel || !university || !department) {
        throw new AppError(
          400,
          "University level, university, and department are required for university students",
        );
      }
    }

    const result = await AuthService.completeOAuthProfile(req.user.userId, {
      studentType,
      highSchoolGrade,
      highSchoolStream,
      universityLevel,
      university,
      department,
    });

    res.json({
      success: true,
      data: result,
      message: "Profile completed successfully",
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error("Complete OAuth profile error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to complete profile" });
  }
};

export const oauthSuccess = async (req: Request, res: Response) => {
  try {
    console.log("OAuth Success - User:", req.user);

    const user = req.user as any;
    if (!user) {
      console.error("OAuth Success - No user data received");
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      return res.redirect(`${frontendUrl}/login?error=no_user_data`);
    }

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

    // If this is a registration flow, redirect to registration form
    if (user.isRegistration) {
      const params = new URLSearchParams({
        email: user.email,
        name: user.name,
        provider: user.provider,
        ...(user.googleId && { googleId: user.googleId })
      });
      
      const redirectUrl = `${frontendUrl}/oauth-register?${params.toString()}`;
      console.log("OAuth Success - Redirecting to registration form:", redirectUrl);
      return res.redirect(redirectUrl);
    }

    // If this is a login flow, generate token and redirect to dashboard
    if (!user.userId) {
      console.error("OAuth Success - No userId for login");
      return res.redirect(`${frontendUrl}/login?error=no_user_data`);
    }

    const token = AuthService.generateToken({
      id: user.userId,
      email: user.email,
      role: user.role,
    } as any);
    console.log("OAuth Success - Token generated for user:", user.userId);

    const redirectUrl = `${frontendUrl}/oauth-callback?token=${token}`;
    console.log("OAuth Success - Redirecting to dashboard:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("OAuth success error:", error);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(`${frontendUrl}/login?error=oauth_failed`);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      throw new AppError(400, 'Email and verification code are required');
    }

    const result = await AuthService.verifyEmail(email, code);

    res.json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error('Verify email error:', error);
    res.status(500).json({ success: false, error: 'Failed to verify email' });
  }
};

export const resendVerificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError(400, 'Email is required');
    }

    const result = await AuthService.resendVerificationEmail(email);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error('Resend verification email error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to resend verification email' });
  }
};

export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError(400, 'Email is required');
    }

    const result = await AuthService.requestPasswordReset(email);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error('Request password reset error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to process password reset request' });
  }
};

export const verifyResetCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      throw new AppError(400, 'Email and reset code are required');
    }

    const result = await AuthService.verifyResetCode(email, code);

    res.json({
      success: true,
      message: result.message,
      data: { email: result.email },
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error('Verify reset code error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to verify reset code' });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auditReq = req as AuditRequest;
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      throw new AppError(400, 'Email, reset code, and new password are required');
    }

    if (newPassword.length < 6) {
      throw new AppError(400, 'Password must be at least 6 characters long');
    }

    const result = await AuthService.resetPassword(email, code, newPassword);

    // Find user ID for audit log
    const user = await User.findOne({ where: { email } });

    // Log successful password reset
    auditService.logAction({
      userId: user?.id,
      action: 'password_reset',
      resource: 'users',
      resourceId: user?.id,
      details: { email },
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'success',
    });

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    // Log failed password reset
    auditService.logAction({
      action: 'password_reset',
      resource: 'users',
      details: { email: req.body?.email },
      ipAddress: auditReq.audit?.ipAddress,
      userAgent: auditReq.audit?.userAgent,
      status: 'failure',
      errorMessage: error?.message || 'Password reset failed',
    });

    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ success: false, error: error.message });
    }
    console.error('Reset password error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to reset password' });
  }
};

export const cleanupExpiredPendingUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthService.cleanupExpiredPendingUsers();
    
    res.json({
      success: true,
      message: `Cleaned up ${result} expired pending user(s)`,
      count: result,
    });
  } catch (error: any) {
    console.error('Cleanup expired pending users error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to cleanup expired pending users' });
  }
};

export const getPendingUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AuthService.getPendingUsers();
    
    res.json({
      success: true,
      data: result,
      count: result.length,
    });
  } catch (error: any) {
    console.error('Get pending users error:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to get pending users' });
  }
};
