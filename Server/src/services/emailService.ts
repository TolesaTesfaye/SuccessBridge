// Email service with nodemailer for sending actual emails
import * as nodemailer from 'nodemailer';

// Create transporter for sending emails (lazy initialization)
let transporter: nodemailer.Transporter | null = null;
let transporterInitialized = false;

/**
 * Initialize email transporter (called on first use)
 */
function initializeTransporter() {
  if (transporterInitialized) {
    return;
  }
  
  transporterInitialized = true;
  
  try {
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    
    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP credentials not configured. Emails will be logged to console.');
      return;
    }
    
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email service configuration error:', error);
        transporter = null; // Reset on error
      } else {
        console.log('✅ Email service is ready to send emails');
      }
    });
  } catch (error) {
    console.error('❌ Failed to initialize email transporter:', error);
    console.log('📧 Emails will be logged to console instead');
    transporter = null;
  }
}

export class EmailService {
  /**
   * Send email verification code (6-digit)
   */
  static async sendVerificationCodeEmail(email: string, name: string, code: string) {
    // Initialize transporter on first use
    initializeTransporter();
    
    try {
      const mailOptions = {
        from: `"${process.env.FROM_NAME || 'SuccessBridge'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: email,
        subject: '✅ Your Verification Code - SuccessBridge',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .code-box { background: #ffffff; border: 2px dashed #667eea; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
              .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; font-family: 'Courier New', monospace; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎓 Welcome to SuccessBridge!</h1>
              </div>
              <div class="content">
                <h2>Hi ${name},</h2>
                <p>Thank you for registering with SuccessBridge! We're excited to have you join our learning community.</p>
                
                <p>To complete your registration, please enter the following 6-digit verification code:</p>
                
                <div class="code-box">
                  <div class="code">${code}</div>
                </div>
                
                <div class="warning">
                  <strong>⚠️ Important:</strong> This verification code will expire in 2 minutes. You must verify your email before you can log in to your account.
                </div>
                
                <p>If you didn't create an account with SuccessBridge, please ignore this email.</p>
                
                <p>Best regards,<br>The SuccessBridge Team</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
                <p>This is an automated email. Please do not reply to this message.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hi ${name},

Thank you for registering with SuccessBridge!

To complete your registration, please enter the following 6-digit verification code:

${code}

⚠️ Important: This verification code will expire in 2 minutes. You must verify your email before you can log in to your account.

If you didn't create an account with SuccessBridge, please ignore this email.

Best regards,
The SuccessBridge Team
        `,
      };

      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Verification code sent to ${email}`);
      } else {
        // Fallback to console logging if transporter is not available
        console.log(`
📧 EMAIL NOTIFICATION (Verification Code):
To: ${email}
Subject: ${mailOptions.subject}
Verification Code: ${code}
Expires: 2 minutes
        `);
        console.log(`⚠️ Email transporter not available. Code logged to console.`);
      }
    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      // Log to console as fallback
      console.log(`
📧 FALLBACK - Verification code for ${email}:
Code: ${code}
Expires: 2 minutes
      `);
    }
  }

  /**
   * Send admin approval notification email
   */
  static async sendAdminApprovalEmail(adminEmail: string, adminName: string) {
    // Initialize transporter on first use
    initializeTransporter();
    
    try {
      const loginUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/login`;
      
      const mailOptions = {
        from: `"${process.env.FROM_NAME || 'SuccessBridge'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: '🎉 Admin Account Approved - Welcome!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 15px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
              .info-box { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Congratulations!</h1>
              </div>
              <div class="content">
                <h2>Hi ${adminName},</h2>
                <p>Great news! Your admin account has been approved by our super admin team.</p>
                
                <div class="info-box">
                  <strong>✅ What's Next?</strong>
                  <ul>
                    <li>You can now log in to your admin dashboard</li>
                    <li>Use your registered email and password to access the system</li>
                    <li>Start managing students, resources, and quizzes</li>
                  </ul>
                </div>
                
                <div style="text-align: center;">
                  <a href="${loginUrl}" class="button">Login to Dashboard</a>
                </div>
                
                <p>If you have any questions or need assistance, please don't hesitate to reach out.</p>
                
                <p>Best regards,<br>The SuccessBridge Team</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hi ${adminName},

Great news! Your admin account has been approved by our super admin team.

What's Next?
• You can now log in to your admin dashboard
• Use your registered email and password to access the system
• Start managing students, resources, and quizzes

Login URL: ${loginUrl}

Best regards,
The SuccessBridge Team
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Approval notification sent to ${adminEmail}`);
    } catch (error) {
      console.error('❌ Failed to send approval notification:', error);
    }
  }

  /**
   * Send admin invitation/password setup email
   */
  static async sendInvitationEmail(adminEmail: string, adminName: string, token: string) {
    // Initialize transporter on first use
    initializeTransporter();
    
    try {
      const setupUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/setup-password/${token}`
      
      console.log(`
📧 EMAIL NOTIFICATION (Invitation):
To: ${adminEmail}
Subject: 🔑 Set Up Your SuccessBridge Admin Account

Dear ${adminName},

Congratulations! Your admin request has been approved. 

To complete your account setup and gain access to the dashboard, please click the link below to set your password:

Setup Link: ${setupUrl}

Please Note: This link will expire in 24 hours.

Best regards,
The SuccessBridge Team
      `)

      console.log(`✅ Invitation email logged for ${adminEmail}`)
    } catch (error) {
      console.error('❌ Failed to send invitation email:', error)
    }
  }

  /**
   * Send admin rejection notification email
   */
  static async sendAdminRejectionEmail(adminEmail: string, adminName: string, reason: string) {
    // Initialize transporter on first use
    initializeTransporter();
    
    try {
      const registerUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/register`;
      
      const mailOptions = {
        from: `"${process.env.FROM_NAME || 'SuccessBridge'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: '❌ Admin Account Request - Update Required',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 15px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
              .reason-box { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .info-box { background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Admin Request Update</h1>
              </div>
              <div class="content">
                <h2>Hi ${adminName},</h2>
                <p>Thank you for your interest in becoming an admin. After reviewing your application, we need some additional information or clarification.</p>
                
                <div class="reason-box">
                  <strong>📋 Feedback:</strong>
                  <p>${reason}</p>
                </div>
                
                <div class="info-box">
                  <strong>Next Steps:</strong>
                  <ul>
                    <li>Please review the feedback above</li>
                    <li>Make necessary corrections or provide additional information</li>
                    <li>Submit a new admin request when ready</li>
                  </ul>
                </div>
                
                <div style="text-align: center;">
                  <a href="${registerUrl}" class="button">Submit New Request</a>
                </div>
                
                <p>If you have any questions, please don't hesitate to contact us.</p>
                
                <p>Best regards,<br>The SuccessBridge Team</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hi ${adminName},

Thank you for your interest in becoming an admin. After reviewing your application, we need some additional information or clarification.

Feedback: ${reason}

Next Steps:
• Please review the feedback above
• Make necessary corrections or provide additional information
• Submit a new admin request when ready

Submit New Request: ${registerUrl}

Best regards,
The SuccessBridge Team
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Rejection notification sent to ${adminEmail}`);
    } catch (error) {
      console.error('❌ Failed to send rejection notification:', error);
    }
  }

  /**
   * Send password reset email with 6-digit code
   */
  static async sendPasswordResetEmail(email: string, name: string, code: string) {
    // Initialize transporter on first use
    initializeTransporter();
    
    try {
      const mailOptions = {
        from: `"${process.env.FROM_NAME || 'SuccessBridge'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to: email,
        subject: '🔑 Password Reset Code - SuccessBridge',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .code-box { background: #ffffff; border: 2px dashed #3b82f6; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
              .code { font-size: 32px; font-weight: bold; color: #3b82f6; letter-spacing: 8px; font-family: 'Courier New', monospace; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
              .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
              .security { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔑 Password Reset Request</h1>
              </div>
              <div class="content">
                <h2>Hi ${name},</h2>
                <p>We received a request to reset your password. Use the code below to proceed:</p>
                
                <div class="code-box">
                  <div class="code">${code}</div>
                </div>
                
                <div class="warning">
                  <strong>⚠️ Important:</strong> This password reset code will expire in 10 minutes for security reasons.
                </div>
                
                <div class="security">
                  <strong>🔒 Security Notice:</strong> If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                </div>
                
                <p>Best regards,<br>The SuccessBridge Team</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
                <p>This is an automated email. Please do not reply to this message.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hi ${name},

We received a request to reset your password. Use the code below to proceed:

${code}

⚠️ Important: This password reset code will expire in 10 minutes for security reasons.

🔒 Security Notice: If you didn't request a password reset, please ignore this email. Your password will remain unchanged.

Best regards,
The SuccessBridge Team
        `,
      };

      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset code sent to ${email}`);
      } else {
        // Fallback to console logging if transporter is not available
        console.log(`
📧 EMAIL NOTIFICATION (Password Reset):
To: ${email}
Subject: ${mailOptions.subject}
Reset Code: ${code}
Expires: 10 minutes
        `);
        console.log(`⚠️ Email transporter not available. Code logged to console.`);
      }
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      // Log to console as fallback
      console.log(`
📧 FALLBACK - Password reset code for ${email}:
Code: ${code}
Expires: 10 minutes
      `);
    }
  }
}