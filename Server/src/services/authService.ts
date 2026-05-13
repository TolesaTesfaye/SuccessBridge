import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import crypto from "crypto";
import User from "../models/User.js";
import AdminRequest from "../models/AdminRequest.js";
import PendingUser from "../models/PendingUser.js";
import { ILoginRequest, IRegisterRequest } from "../types/index.js";
import { AppError } from "../middleware/errorHandler.js";
import redisClient from "../config/redis.js";

import { EmailService } from "./emailService.js";

export class AuthService {
  /**
   * Generate 6-digit verification code
   */
  private static generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Register a new user
   */
  static async register(
    data: IRegisterRequest & {
      studentType?: string;
      highSchoolGrade?: string;
      highSchoolStream?: string;
      universityLevel?: string;
      university?: string;
      department?: string;
    },
  ) {
    // Log the incoming registration data for debugging
    console.log('=== REGISTRATION REQUEST ===');
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    const {
      email,
      name,
      password,
      role = "student",
      studentType,
      highSchoolGrade,
      highSchoolStream,
      universityLevel,
      university,
      department,
    } = data;

    if (!email || !name || !password) {
      console.error('Missing required fields:', { email: !!email, name: !!name, password: !!password });
      throw new AppError(400, "Email, name, and password are required. Please fill in all required fields.");
    }

    // Check if user already exists in User table
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(400, "An account with this email already exists. Please try logging in instead, or use a different email address.");
    }

    // Check if there's a pending registration
    const existingPending = await PendingUser.findOne({ where: { email } });
    if (existingPending) {
      // If the pending registration has expired, delete it and allow re-registration
      if (existingPending.verificationExpires < new Date()) {
        console.log('Expired pending registration found, deleting and allowing re-registration');
        await existingPending.destroy();
      } else {
        // If still valid, update it with new code instead of blocking
        const verificationCode = this.generateVerificationCode();
        const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        
        await existingPending.update({
          name: name, // Update name in case they changed it
          password: await bcrypt.hash(password, 10), // Update password
          verificationCode: verificationCode,
          verificationExpires: verificationExpires,
          // Update student info if provided
          studentType: studentType || existingPending.studentType,
          highSchoolGrade: highSchoolGrade || existingPending.highSchoolGrade,
          highSchoolStream: highSchoolStream || existingPending.highSchoolStream,
          universityLevel: universityLevel || existingPending.universityLevel,
          university: university || existingPending.university,
          department: department || existingPending.department,
        });

        // Send new verification email
        try {
          // Use Promise.race to timeout after 5 seconds
          await Promise.race([
            EmailService.sendVerificationCodeEmail(email, name, verificationCode),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Email timeout')), 5000)
            )
          ]);
        } catch (error) {
          console.error('Failed to send verification email (non-blocking):', error);
          // Don't throw - allow registration to continue even if email fails
        }

        return {
          message: 'A new verification code has been sent to your email. The previous code has been replaced. The code will expire in 15 minutes.',
          requiresVerification: true,
          email: email,
        };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      // For admin registration, create admin user directly
      if (!university || !department) {
        throw new AppError(
          400,
          "University and department are required for admin registration. Please select both from the dropdown menus.",
        );
      }

      // Create admin user directly (no approval needed)
      const newAdmin = await User.create({
        email,
        name,
        password: hashedPassword,
        role: "admin",
        university,
        department,
        isApproved: true,
        approvalStatus: "approved",
        approvedAt: new Date(),
        isEmailVerified: true,
      } as any);

      // Generate token for immediate login
      const token = this.generateToken(newAdmin);

      return {
        message: "Admin account created successfully! You can now log in.",
        user: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name,
          role: newAdmin.role,
          university: newAdmin.university,
          department: newAdmin.department,
        },
        token,
      };
    } else {
      // For student registration, store in PendingUser table until email is verified
      const verificationCode = this.generateVerificationCode();
      const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes (increased from 2)

      const pendingData = {
        email,
        name,
        password: hashedPassword,
        role,
        studentType: studentType || undefined,
        highSchoolGrade: highSchoolGrade || undefined,
        highSchoolStream: highSchoolStream || undefined,
        universityLevel: universityLevel || undefined,
        university: university || undefined,
        department: department || undefined,
        verificationCode: verificationCode,
        verificationExpires: verificationExpires,
      };

      console.log('Creating pending user with data:', JSON.stringify(pendingData, null, 2));
      
      await PendingUser.create(pendingData as any);

      // Send verification email with 6-digit code (with timeout to prevent blocking)
      try {
        // Use Promise.race to timeout after 5 seconds
        await Promise.race([
          EmailService.sendVerificationCodeEmail(email, name, verificationCode),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Email timeout')), 5000)
          )
        ]);
      } catch (error) {
        console.error('Failed to send verification email (non-blocking):', error);
        // Don't throw - allow registration to continue even if email fails
      }

      // Don't return token - user must verify email first
      return {
        message: 'Registration initiated! Please check your email for a 6-digit verification code. The code will expire in 15 minutes.',
        requiresVerification: true,
        email: email,
      };
    }
  }

  /**
   * Login user
   */
  static async login(data: ILoginRequest) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError(400, "Email and password are required. Please fill in both fields.");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError(401, "No account found with this email address. Please check your email or create a new account.");
    }

    // OAuth users may not have a password set
    if (!user.password) {
      throw new AppError(
        400,
        "This account uses Google sign-in. Please click 'Continue with Google' to log in, or set a password first.",
      );
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Incorrect password. Please try again or use 'Forgot Password' to reset it.");
    }

    const token = this.generateToken(user);

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
    };
  }

  /**
   * Get user by ID
   */
  static async getCurrentUser(userId: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(404, "User not found");
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
    };
  }

  /**
   * Logout
   */
  static async logout(token: string) {
    if (!token) return;

    try {
      if (redisClient && redisClient.isOpen) {
        const decoded = jwt.decode(token) as any;
        if (decoded && decoded.exp) {
          const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
          if (expiresIn > 0) {
            await redisClient.setEx(`blacklist_${token}`, expiresIn, "true");
            return true;
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn("Redis not available for token blacklist");
      }
    }
    return false;
  }

  /**
   * Helper to generate JWT
   */
  public static generateToken(user: User) {
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: process.env.JWT_EXPIRES_IN || process.env.JWT_EXPIRE || "7d",
      } as any,
    );
  }

  /**
   * Get all admin requests (deprecated - kept for backward compatibility)
   */
  static async getAllAdminRequests() {
    try {
      return await AdminRequest.findAll({ order: [["createdAt", "DESC"]] });
    } catch (error) {
      throw new AppError(500, "Failed to fetch admin requests");
    }
  }

  /**
   * Approve an admin request (deprecated - admins are now auto-approved)
   */
  static async approveAdminRequest(requestId: string, approvedBy: string) {
    throw new AppError(400, "Admin approval process has been removed. Admins are now registered directly.");
  }

  /**
   * Reject an admin request (deprecated - admins are now auto-approved)
   */
  static async rejectAdminRequest(
    requestId: string,
    rejectedBy: string,
    reason: string,
  ) {
    throw new AppError(400, "Admin approval process has been removed. Admins are now registered directly.");
  }

  /**
   * Submit an admin request (deprecated - use register instead)
   */
  static async submitAdminRequest(data: any) {
    throw new AppError(400, "Admin approval process has been removed. Please use the standard registration endpoint.");
  }

  /**
   * Get admin request status (deprecated)
   */
  static async getAdminRequestStatus(email: string) {
    return "not_found";
  }

  /**
   * Setup admin password (from email token)
   */
  static async setupAdminPassword({ token, password }: any) {
    const request = await AdminRequest.findOne({ where: { id: token } });
    if (!request) throw new AppError(404, "Request not found");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: request.email,
      name: request.name,
      password: hashedPassword,
      role: "admin",
      university: request.university,
      department: request.department,
      isApproved: true,
      approvalStatus: "approved",
    } as any);

    await request.update({ status: "approved" });

    return { message: "Password setup successful", user };
  }

  /**
   * Complete OAuth profile with student information
   */
  static async completeOAuthProfile(
    userId: string,
    profileData: {
      studentType: "high_school" | "university";
      highSchoolGrade?: string;
      highSchoolStream?: string;
      universityLevel?: string;
      university?: string;
      department?: string;
    },
  ) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const updateData: any = {
      studentType: profileData.studentType,
      isApproved: true,
      approvalStatus: "approved",
    };

    if (profileData.studentType === "high_school") {
      updateData.highSchoolGrade = profileData.highSchoolGrade;
      updateData.highSchoolStream = profileData.highSchoolStream;
    } else if (profileData.studentType === "university") {
      updateData.universityLevel = profileData.universityLevel;
      updateData.university = profileData.university;
      updateData.department = profileData.department;
    }

    await user.update(updateData);

    // Return updated user data without password
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    return updatedUser;
  }

  /**
   * Verify email with 6-digit code and create actual user account
   */
  static async verifyEmail(email: string, verificationCode: string) {
    // Find pending user with matching email and code
    const pendingUser = await PendingUser.findOne({
      where: {
        email: email,
        verificationCode: verificationCode,
        verificationExpires: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!pendingUser) {
      throw new AppError(400, 'Invalid or expired verification code. The code may have expired (valid for 2 minutes). Please request a new code using the "Resend Code" button.');
    }

    // Check if user already exists (shouldn't happen, but safety check)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Clean up pending user
      await pendingUser.destroy();
      throw new AppError(400, 'This email is already verified. Please log in to your account.');
    }

    // Create the actual user account
    const userData = {
      email: pendingUser.email,
      name: pendingUser.name,
      password: pendingUser.password, // Already hashed
      role: pendingUser.role,
      studentType: pendingUser.studentType || null,
      highSchoolGrade: pendingUser.highSchoolGrade || null,
      highSchoolStream: pendingUser.highSchoolStream || null,
      universityLevel: pendingUser.universityLevel || null,
      university: pendingUser.university || null,
      department: pendingUser.department || null,
      isApproved: true,
      approvalStatus: "approved" as const,
      approvedAt: new Date(),
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    };

    const user = await User.create(userData as any);

    // Delete the pending user record
    await pendingUser.destroy();

    // Generate JWT token after successful verification
    const authToken = this.generateToken(user);

    return {
      message: 'Email verified successfully! You can now log in to your account.',
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
        isEmailVerified: user.isEmailVerified,
      },
      token: authToken,
    };
  }

  /**
   * Resend verification email
   */
  static async resendVerificationEmail(email: string) {
    // Check if user already exists and is verified
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(400, 'This email is already verified. Please log in to your account.');
    }

    // Find pending user
    const pendingUser = await PendingUser.findOne({ where: { email } });

    if (!pendingUser) {
      throw new AppError(404, 'No pending registration found for this email. Please start a new registration.');
    }

    // Generate new verification code with longer expiration
    const verificationCode = this.generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await pendingUser.update({
      verificationCode: verificationCode,
      verificationExpires: verificationExpires,
    });

    try {
      // Use Promise.race to timeout after 5 seconds
      await Promise.race([
        EmailService.sendVerificationCodeEmail(email, pendingUser.name, verificationCode),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email timeout')), 5000)
        )
      ]);
    } catch (error) {
      console.error('Failed to send verification email (non-blocking):', error);
      // Don't throw - allow resend to complete even if email fails
      // The code is still updated in database
    }

    return {
      message: 'Verification code sent successfully! Please check your inbox. The code will expire in 15 minutes.',
    };
  }

  /**
   * Request password reset - send 6-digit code via email
   */
  static async requestPasswordReset(email: string) {
    console.log(`🔑 Password reset requested for: ${email}`);
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`⚠️ No user found with email: ${email}`);
      // Don't reveal if user exists or not for security
      return {
        message: 'If an account exists with this email, a password reset code has been sent.',
      };
    }

    console.log(`✅ User found: ${user.name} (ID: ${user.id})`);

    // OAuth users without password cannot reset password
    if (!user.password) {
      console.log(`❌ OAuth user attempted password reset: ${email}`);
      throw new AppError(
        400,
        'This account uses OAuth authentication (Google). Please sign in with your OAuth provider.',
      );
    }

    // Generate 6-digit reset code
    const resetCode = this.generateVerificationCode();
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log(`📝 Generated reset code for ${email}: ${resetCode} (expires at ${resetExpires.toISOString()})`);

    await user.update({
      passwordResetToken: resetCode,
      passwordResetExpires: resetExpires,
    });

    console.log(`💾 Reset code saved to database for user: ${email}`);

    try {
      console.log(`📧 Attempting to send password reset email to: ${email}`);
      // Use Promise.race to timeout after 15 seconds (increased for slower networks)
      await Promise.race([
        EmailService.sendPasswordResetEmail(email, user.name, resetCode),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email timeout - SMTP connection took too long')), 15000)
        )
      ]);
      console.log(`✅ Password reset email sent successfully to: ${email}`);
    } catch (error: any) {
      console.error(`❌ Failed to send password reset email to ${email}:`, error);
      console.error(`   Error type: ${error.name}`);
      console.error(`   Error message: ${error.message}`);
      if (error.code) {
        console.error(`   Error code: ${error.code}`);
      }
      // Don't throw - allow password reset to continue even if email fails
      // The code is still saved in the database and can be used
    }

    return {
      message: 'If an account exists with this email, a password reset code has been sent.',
    };
  }

  /**
   * Verify password reset code
   */
  static async verifyResetCode(email: string, code: string) {
    const user = await User.findOne({
      where: {
        email: email,
        passwordResetToken: code,
        passwordResetExpires: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      throw new AppError(400, 'Invalid or expired reset code');
    }

    return {
      message: 'Reset code verified successfully',
      email: user.email,
    };
  }

  /**
   * Reset password with verified code
   */
  static async resetPassword(email: string, code: string, newPassword: string) {
    const user = await User.findOne({
      where: {
        email: email,
        passwordResetToken: code,
        passwordResetExpires: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!user) {
      throw new AppError(400, 'Invalid or expired reset code');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await user.update({
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    return {
      message: 'Password reset successfully. You can now log in with your new password.',
    };
  }

  /**
   * Cleanup expired pending users
   */
  static async cleanupExpiredPendingUsers() {
    const result = await PendingUser.destroy({
      where: {
        verificationExpires: {
          [Op.lt]: new Date(),
        },
      },
    });

    return result;
  }

  /**
   * Get all pending users (for debugging/admin purposes)
   */
  static async getPendingUsers() {
    const pendingUsers = await PendingUser.findAll({
      attributes: ['id', 'email', 'name', 'role', 'studentType', 'verificationExpires', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    return pendingUsers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentType: user.studentType,
      verificationExpires: user.verificationExpires,
      createdAt: user.createdAt,
      isExpired: user.verificationExpires < new Date(),
    }));
  }
}
