// Email service supporting both Resend HTTP API and SMTP
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Clients
let resendClient: Resend | null = null;
let smtpTransporter: nodemailer.Transporter | null = null;
let initialized = false;
let serviceType: 'resend' | 'smtp' | 'none' = 'none';

/**
 * Initialize Email Service
 */
async function initializeEmailService() {
  if (initialized) return;
  initialized = true;
  
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log('🔧 Initializing email service...');

  // 1. Try SMTP first (if configured)
  if (smtpHost && smtpUser && smtpPass) {
    try {
      smtpTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
      
      await smtpTransporter.verify();
      serviceType = 'smtp';
      console.log('✅ SMTP email service initialized successfully');
      return;
    } catch (error) {
      console.error('❌ Failed to initialize SMTP:', error);
    }
  }

  // 2. Try Resend if SMTP failed or not configured
  if (resendApiKey) {
    try {
      resendClient = new Resend(resendApiKey);
      serviceType = 'resend';
      console.log('✅ Resend HTTP API initialized successfully');
      return;
    } catch (error) {
      console.error('❌ Failed to initialize Resend:', error);
    }
  }

  console.warn('⚠️ No email service configured. Emails will be logged to console.');
  serviceType = 'none';
}

export class EmailService {
  /**
   * Helper to send email via available service
   */
  private static async sendEmail(options: { to: string, subject: string, html: string, text?: string }) {
    await initializeEmailService();
    
    const fromName = process.env.FROM_NAME || 'SuccessBridge Team';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    if (serviceType === 'smtp' && smtpTransporter) {
      try {
        await smtpTransporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: options.to,
          subject: options.subject,
          text: options.text,
          html: options.html,
        });
        console.log(`✅ Email sent to ${options.to} via SMTP`);
        return true;
      } catch (error) {
        console.error('❌ SMTP send failed:', error);
      }
    }

    if (serviceType === 'resend' && resendClient) {
      try {
        await resendClient.emails.send({
          from: fromEmail.includes('@resend.dev') 
            ? `${fromName} <${fromEmail}>`
            : `${fromName} <onboarding@resend.dev>`,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        });
        console.log(`✅ Email sent to ${options.to} via Resend`);
        return true;
      } catch (error) {
        console.error('❌ Resend send failed:', error);
      }
    }

    console.log(`
📧 CONSOLE FALLBACK:
To: ${options.to}
Subject: ${options.subject}
Content: ${options.text || 'See HTML content'}
    `);
    return false;
  }

  /**
   * Send email verification code (6-digit)
   */
  static async sendVerificationCodeEmail(email: string, name: string, code: string) {
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
            <p>Best regards,<br>The SuccessBridge Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `Hi ${name},\n\nThank you for registering! Your code is: ${code}\n\nExpires in 15 mins.`;

    return this.sendEmail({
      to: email,
      subject: '✅ Your Verification Code - SuccessBridge',
      html: htmlContent,
      text: textContent
    });
  }

  /**
   * Send admin approval notification email
   */
  static async sendAdminApprovalEmail(adminEmail: string, adminName: string) {
    const loginUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/login`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #10b981; color: white; padding: 20px; text-align: center;">
          <h1>🎉 Congratulations!</h1>
        </div>
        <p>Hi ${adminName}, your admin account has been approved.</p>
        <p><a href="${loginUrl}">Login to Dashboard</a></p>
      </div>
    `;
    return this.sendEmail({ to: adminEmail, subject: '🎉 Admin Account Approved', html: htmlContent });
  }

  /**
   * Send admin rejection notification email
   */
  static async sendAdminRejectionEmail(adminEmail: string, adminName: string, reason: string) {
    return this.sendEmail({
      to: adminEmail,
      subject: '❌ Admin Account Request Update',
      html: `<p>Hi ${adminName},</p><p>Your request was not approved. Feedback: ${reason}</p>`
    });
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(email: string, name: string, code: string) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset</h2>
        <p>Hi ${name}, your code is: <strong>${code}</strong></p>
      </div>
    `;
    return this.sendEmail({ to: email, subject: '🔑 Password Reset - SuccessBridge', html: htmlContent });
  }

  static async sendInvitationEmail(adminEmail: string, adminName: string, token: string) {
    console.log(`📧 Invitation for ${adminEmail} (token: ${token})`);
  }
}
