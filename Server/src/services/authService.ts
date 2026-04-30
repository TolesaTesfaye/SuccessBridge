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
      throw new AppError(400, "Email, name, and password are required");
    }

    // Check if user already exists in User table
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(400, "User already exists");
    }

    // Check if there's a pending registration
    const existingPending = await PendingUser.findOne({ where: { email } });
    if (existingPending) {
      throw new AppError(400, "Registration pending. Please check your email for the verification code or request a new one.");
    }

    // Check if admin request already exists
    if (role === "admin") {
      const existingRequest = await AdminRequest.findOne({ where: { email } });
      if (existingRequest) {
        if (existingRequest.status === "pending") {
          throw new AppError(
            400,
            "Admin registration request already submitted and pending approval",
          );
        } else if (existingRequest.status === "rejected") {
          throw new AppError(
            400,
            `Previous admin request was rejected. Reason: ${existingRequest.rejectionReason || "No reason provided"}`,
          );
        }
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "admin") {
      // For admin registration, create AdminRequest for tracking
      if (!university || !department) {
        throw new AppError(
          400,
          "University and department are required for admin registration",
        );
      }

      // Create admin request record for tracking
      const adminRequest = await AdminRequest.create({
        name,
        email,
        password: hashedPassword,
        university,
        department,
        documents: [],
        status: "pending",
      });

      return {
        message:
          "Admin registration request submitted successfully. Your application will be reviewed by the super admin.",
        requestId: adminRequest.id,
        status: "pending",
      };
    } else {
      // For student registration, store in PendingUser table until email is verified
      const verificationCode = this.generateVerificationCode();
      const verificationExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

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

      await PendingUser.create(pendingData as any);

      // Send verification email with 6-digit code
      try {
        await EmailService.sendVerificationCodeEmail(email, name, verificationCode);
      } catch (error) {
        console.error('Failed to send verification email:', error);
      }

      // Don't return token - user must verify email first
      return {
        message: 'Registration initiated! Please check your email for a 6-digit verification code. The code will expire in 2 minutes.',
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
      throw new AppError(400, "Email and password are required");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Check if this is an admin trying to login before approval
      const adminRequest = await AdminRequest.findOne({ where: { email } });
      if (adminRequest) {
        if (adminRequest.status === "pending") {
          throw new AppError(
            403,
            "Your admin account is being processed. Please wait for approval.",
          );
        }
        if (adminRequest.status === "rejected") {
          throw new AppError(
            403,
            `Your admin account has been rejected. Reason: ${adminRequest.rejectionReason || "No reason provided"}`,
          );
        }
      }

      throw new AppError(401, "Invalid credentials");
    }

    // OAuth users may not have a password set
    if (!user.password) {
      throw new AppError(
        400,
        "This account does not have a password. Please sign in with Google, or set a password first.",
      );
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid credentials");
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
   * Get all admin requests
   */
  static async getAllAdminRequests() {
    try {
      return await AdminRequest.findAll({ order: [["createdAt", "DESC"]] });
    } catch (error) {
      throw new AppError(500, "Failed to fetch admin requests");
    }
  }

  /**
   * Approve an admin request
   */
  static async approveAdminRequest(requestId: string, approvedBy: string) {
    try {
      const adminRequest = await AdminRequest.findByPk(requestId);
      if (!adminRequest) {
        throw new AppError(404, "Admin request not found");
      }

      if (adminRequest.status !== "pending") {
        throw new AppError(
          400,
          `Admin request is already ${adminRequest.status}`,
        );
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email: adminRequest.email },
      });
      if (existingUser) {
        throw new AppError(400, "User account already exists for this email");
      }

      // Create the admin user
      const newAdmin = await User.create({
        email: adminRequest.email,
        name: adminRequest.name,
        password: adminRequest.password, // This is already the hashed password from the request
        role: "admin",
        university: adminRequest.university,
        department: adminRequest.department,
        isApproved: true,
        approvalStatus: "approved",
        approvedBy: approvedBy,
        approvedAt: new Date(),
      } as any);

      // Update the admin request status
      await adminRequest.update({
        status: "approved",
        reviewedBy: approvedBy,
        reviewedAt: new Date(),
      });

      // Send confirmation email (stub)
      try {
        await EmailService.sendAdminApprovalEmail(
          adminRequest.email,
          adminRequest.name,
        );
      } catch (err) {
        console.warn("Failed to send approval email:", err);
      }

      return {
        message:
          "Admin request approved successfully. The admin can now log in.",
        user: { id: newAdmin.id, email: newAdmin.email },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error("Approve admin request error:", error);
      throw new AppError(500, "Failed to approve admin request");
    }
  }

  /**
   * Reject an admin request
   */
  static async rejectAdminRequest(
    requestId: string,
    rejectedBy: string,
    reason: string,
  ) {
    try {
      const adminRequest = await AdminRequest.findByPk(requestId);
      if (!adminRequest) {
        throw new AppError(404, "Admin request not found");
      }

      if (adminRequest.status !== "pending") {
        throw new AppError(400, "Admin request has already been processed");
      }

      await adminRequest.update({
        status: "rejected",
        reviewedBy: rejectedBy,
        reviewedAt: new Date(),
        rejectionReason: reason,
      });

      // Send rejection email (stub)
      try {
        await EmailService.sendAdminRejectionEmail(
          adminRequest.email,
          adminRequest.name,
          reason,
        );
      } catch (err) {
        console.warn("Failed to send rejection email:", err);
      }

      return adminRequest;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Failed to reject admin request");
    }
  }

  /**
   * Submit an admin request (for existing admin flow)
   */
  static async submitAdminRequest(data: any) {
    const { email, password, name, university, department, stream } = data;

    if (!email || !password || !name || !university || !department) {
      throw new AppError(
        400,
        "Email, password, name, university, and department are required",
      );
    }

    // Prevent duplicates
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError(400, "User already exists");
    }

    const existingRequest = await AdminRequest.findOne({ where: { email } });
    if (existingRequest) {
      if (existingRequest.status === "pending") {
        throw new AppError(
          400,
          "Admin registration request already submitted and pending approval",
        );
      }
      if (existingRequest.status === "rejected") {
        throw new AppError(
          400,
          `Previous admin request was rejected. Reason: ${existingRequest.rejectionReason || "No reason provided"}`,
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await AdminRequest.create({
      email,
      password: hashedPassword,
      name,
      university,
      department,
      status: "pending",
    });
  }

  /**
   * Get admin request status
   */
  static async getAdminRequestStatus(email: string) {
    const request = await AdminRequest.findOne({ where: { email } });
    return request ? request.status : "not_found";
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
      throw new AppError(400, 'Invalid or expired verification code');
    }

    // Check if user already exists (shouldn't happen, but safety check)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Clean up pending user
      await pendingUser.destroy();
      throw new AppError(400, 'User already exists. Please login.');
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
      throw new AppError(400, 'Email is already verified. Please login.');
    }

    // Find pending user
    const pendingUser = await PendingUser.findOne({ where: { email } });

    if (!pendingUser) {
      throw new AppError(404, 'No pending registration found for this email. Please register first.');
    }

    // Generate new verification code
    const verificationCode = this.generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    await pendingUser.update({
      verificationCode: verificationCode,
      verificationExpires: verificationExpires,
    });

    try {
      await EmailService.sendVerificationCodeEmail(email, pendingUser.name, verificationCode);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new AppError(500, 'Failed to send verification email');
    }

    return {
      message: 'Verification code sent successfully! Please check your inbox. The code will expire in 2 minutes.',
    };
  }

  /**
   * Request password reset - send 6-digit code via email
   */
  static async requestPasswordReset(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if user exists or not for security
      return {
        message: 'If an account exists with this email, a password reset code has been sent.',
      };
    }

    // OAuth users without password cannot reset password
    if (!user.password) {
      throw new AppError(
        400,
        'This account uses OAuth authentication (Google). Please sign in with your OAuth provider.',
      );
    }

    // Generate 6-digit reset code
    const resetCode = this.generateVerificationCode();
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.update({
      passwordResetToken: resetCode,
      passwordResetExpires: resetExpires,
    });

    try {
      await EmailService.sendPasswordResetEmail(email, user.name, resetCode);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new AppError(500, 'Failed to send password reset email');
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
}
