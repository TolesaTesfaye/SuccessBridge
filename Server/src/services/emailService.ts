// Email service using Resend HTTP API (works perfectly on cloud platforms like Render)
import { Resend } from 'resend';

// Resend client (lazy initialization)
let resendClient: Resend | null = null;
let resendReady = false;
let initialized = false;

/**
 * Initialize Resend client
 */
async function initializeResend() {
  if (initialized) {
    return;
  }
  
  initialized = true;
  
  const resendApiKey = process.env.RESEND_API_KEY;
  
  console.log('🔧 Initializing Resend email service...');
  console.log('📧 RESEND_API_KEY:', resendApiKey ? 'SET ✅' : 'NOT SET ❌');
  
  if (!resendApiKey) {
    console.warn('⚠️ RESEND_API_KEY not configured. Emails will be logged to console.');
    return;
  }
  
  try {
    resendClient = new Resend(resendApiKey);
    resendReady = true;
    console.log('✅ Resend HTTP API initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Resend:', error);
    resendClient = null;
    resendReady = false;
  }
}

export class EmailService {
  /**
   * Send email verification code (6-digit)
   */
  static async sendVerificationCodeEmail(email: string, name: string, code: string) {
    await initializeResend();
    
    const htmlContent = `
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
              <strong>⚠️ Important:</strong> This verification code will expire in 15 minutes.
            </div>
            
            <p>If you didn't create an account with SuccessBridge, please ignore this email.</p>
            
            <p>Best regards,<br>The SuccessBridge Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Hi ${name},

Thank you for registering with SuccessBridge!

To complete your registration, please enter the following 6-digit verification code:

${code}

⚠️ Important: This verification code will expire in 15 minutes.

If you didn't create an account with SuccessBridge, please ignore this email.

Best regards,
The SuccessBridge Team
    `;

    if (resendClient && resendReady) {
      try {
        console.log(`📧 Sending verification email to ${email} via Resend HTTP API...`);
        
        const result = await resendClient.emails.send({
          from: `${process.env.FROM_NAME || 'SuccessBridge Team'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: email,
          subject: '✅ Your Verification Code - SuccessBridge',
          html: htmlContent,
          text: textContent,
        });
        
        console.log(`✅ Verification code sent to ${email}`);
        console.log(`📬 Email ID: ${result.id || result.data?.id || 'sent'}`);
        return true;
      } catch (error: any) {
        console.error('❌ Failed to send verification email:', error);
        console.error('❌ Error details:', error.message);
        
        // Log to console as fallback
        console.log(`
📧 FALLBACK - Verification code for ${email}:
Code: ${code}
Expires: 15 minutes
        `);
        return false;
      }
    } else {
      // Fallback to console logging
      console.log(`
📧 EMAIL NOTIFICATION (Verification Code):
To: ${email}
Subject: ✅ Your Verification Code - SuccessBridge
Verification Code: ${code}
Expires: 15 minutes
      `);
      console.log(`⚠️ Resend not configured. Code logged to console.`);
      return false;
    }
  }

  /**
   * Send admin approval notification email
   */
  static async sendAdminApprovalEmail(adminEmail: string, adminName: string) {
    await initializeResend();
    
    const loginUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/login`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>🎉 Congratulations!</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2>Hi ${adminName},</h2>
            <p>Great news! Your admin account has been approved.</p>
            <p style="text-align: center;">
              <a href="${loginUrl}" style="display: inline-block; padding: 15px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Login to Dashboard</a>
            </p>
            <p>Best regards,<br>The SuccessBridge Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    if (resendClient && resendReady) {
      try {
        await resendClient.emails.send({
          from: `${process.env.FROM_NAME || 'SuccessBridge Team'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: adminEmail,
          subject: '🎉 Admin Account Approved - Welcome!',
          html: htmlContent,
        });
        console.log(`✅ Approval notification sent to ${adminEmail}`);
      } catch (error) {
        console.error('❌ Failed to send approval notification:', error);
      }
    }
  }

  /**
   * Send admin rejection notification email
   */
  static async sendAdminRejectionEmail(adminEmail: string, adminName: string, reason: string) {
    await initializeResend();
    
    if (resendClient && resendReady) {
      try {
        await resendClient.emails.send({
          from: `${process.env.FROM_NAME || 'SuccessBridge Team'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: adminEmail,
          subject: '❌ Admin Account Request - Update Required',
          html: `<p>Hi ${adminName},</p><p>Feedback: ${reason}</p>`,
        });
        console.log(`✅ Rejection notification sent to ${adminEmail}`);
      } catch (error) {
        console.error('❌ Failed to send rejection notification:', error);
      }
    }
  }

  /**
   * Send password reset email with 6-digit code
   */
  static async sendPasswordResetEmail(email: string, name: string, code: string) {
    await initializeResend();
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${name},</p>
        <p>Your password reset code is:</p>
        <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px;">
          ${code}
        </div>
        <p>This code expires in 10 minutes.</p>
      </div>
    `;

    if (resendClient && resendReady) {
      try {
        await resendClient.emails.send({
          from: `${process.env.FROM_NAME || 'SuccessBridge Team'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
          to: email,
          subject: '🔑 Password Reset Code - SuccessBridge',
          html: htmlContent,
        });
        console.log(`✅ Password reset code sent to ${email}`);
        return true;
      } catch (error) {
        console.error('❌ Failed to send password reset email:', error);
        return false;
      }
    }
    
    console.log(`📧 Password reset code for ${email}: ${code}`);
    return false;
  }

  /**
   * Send invitation email (stub)
   */
  static async sendInvitationEmail(adminEmail: string, adminName: string, token: string) {
    console.log(`📧 Invitation email for ${adminEmail} (token: ${token})`);
  }
}
