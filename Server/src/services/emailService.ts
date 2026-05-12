// Email service using SMTP and Brevo API
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

// Clients
let smtpTransporter: nodemailer.Transporter | null = null;
let initialized = false;
let serviceType: 'smtp' | 'brevo' | 'none' = 'none';

/**
 * Initialize Email Service
 */
async function initializeEmailService() {
  if (initialized) return;
  initialized = true;
  
  const brevoApiKey = process.env.BREVO_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  console.log('🔧 Initializing email service...');

  // 1. Try Brevo first (if configured)
  if (brevoApiKey) {
    try {
      // Test Brevo API connection
      const response = await fetch('https://api.brevo.com/v3/account', {
        headers: {
          'api-key': brevoApiKey,
        },
      });
      
      if (response.ok) {
        serviceType = 'brevo';
        console.log('✅ Brevo email service initialized successfully');
        const data = await response.json() as any;
        console.log(`   Account: ${data.email || 'Connected'}`);
        return;
      } else {
        console.error('❌ Failed to initialize Brevo: Invalid API key');
      }
    } catch (error: any) {
      console.error('❌ Failed to initialize Brevo:', error.message);
    }
  }

  // 2. Try SMTP (if configured)
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
        // Add connection timeout settings
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000, // 10 seconds
        socketTimeout: 10000, // 10 seconds
      });
      
      console.log(`🔌 Attempting to connect to SMTP server: ${smtpHost}:${smtpPort}`);
      await smtpTransporter.verify();
      serviceType = 'smtp';
      console.log('✅ SMTP email service initialized successfully');
      console.log(`   Host: ${smtpHost}:${smtpPort}`);
      console.log(`   User: ${smtpUser}`);
      return;
    } catch (error: any) {
      console.error('❌ Failed to initialize SMTP:', error);
      console.error('   Error details:', {
        message: error.message,
        code: error.code,
        command: error.command,
      });
      console.error('   Please check your SMTP credentials in environment variables');
    }
  } else if (smtpHost || smtpUser || smtpPass) {
    console.warn('⚠️ SMTP configuration incomplete:');
    console.warn(`   SMTP_HOST: ${smtpHost ? '✅ SET' : '❌ NOT SET'}`);
    console.warn(`   SMTP_USER: ${smtpUser ? '✅ SET' : '❌ NOT SET'}`);
    console.warn(`   SMTP_PASS: ${smtpPass ? '✅ SET' : '❌ NOT SET'}`);
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
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@successbridge.com';

    console.log(`📧 Attempting to send email via ${serviceType}:`);
    console.log(`   To: ${options.to}`);
    console.log(`   Subject: ${options.subject}`);
    console.log(`   From: ${fromName} <${fromEmail}>`);

    // Try Brevo API
    if (serviceType === 'brevo') {
      try {
        const brevoApiKey = process.env.BREVO_API_KEY;
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoApiKey!,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: {
              name: fromName,
              email: fromEmail,
            },
            to: [
              {
                email: options.to,
              },
            ],
            subject: options.subject,
            htmlContent: options.html,
            textContent: options.text,
          }),
        });

        if (response.ok) {
          const data = await response.json() as any;
          console.log(`✅ Email sent successfully to ${options.to} via Brevo`);
          console.log(`   Message ID: ${data.messageId || 'sent'}`);
          return true;
        } else {
          const error = await response.json() as any;
          console.error('❌ Brevo send failed:', error);
          throw new Error(`Brevo API error: ${error.message || response.statusText}`);
        }
      } catch (error: any) {
        console.error('❌ Brevo send failed:', error);
        console.error('   Error details:', error.message);
        throw error;
      }
    }

    // Try SMTP
    if (serviceType === 'smtp' && smtpTransporter) {
      try {
        const info = await smtpTransporter.sendMail({
          from: `"${fromName}" <${fromEmail}>`,
          to: options.to,
          subject: options.subject,
          text: options.text,
          html: options.html,
        });
        console.log(`✅ Email sent successfully to ${options.to} via SMTP`);
        console.log(`   Message ID: ${info.messageId}`);
        return true;
      } catch (error: any) {
        console.error('❌ SMTP send failed:', error);
        console.error('   Error details:', {
          code: error.code,
          command: error.command,
          response: error.response,
          responseCode: error.responseCode
        });
        throw error;
      }
    }

    console.warn(`⚠️ No email service available - logging to console only`);
    console.log(`
📧 CONSOLE FALLBACK EMAIL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To: ${options.to}
Subject: ${options.subject}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${options.text || 'See HTML content below'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HTML Content:
${options.html}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: #ffffff; border: 2px dashed #f59e0b; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
          .code { font-size: 32px; font-weight: bold; color: #f59e0b; letter-spacing: 8px; font-family: 'Courier New', monospace; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .security-note { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔑 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We received a request to reset your password for your SuccessBridge account.</p>
            <p>To reset your password, please enter the following 6-digit verification code:</p>
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            <div class="warning">
              <strong>⚠️ Important:</strong> This password reset code will expire in 10 minutes.
            </div>
            <div class="security-note">
              <strong>🔒 Security Notice:</strong> If you did not request a password reset, please ignore this email and your password will remain unchanged. Consider changing your password if you suspect unauthorized access.
            </div>
            <p>Best regards,<br>The SuccessBridge Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SuccessBridge. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `Hi ${name},\n\nWe received a request to reset your password.\n\nYour password reset code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe SuccessBridge Team`;

    return this.sendEmail({
      to: email,
      subject: '🔑 Password Reset Code - SuccessBridge',
      html: htmlContent,
      text: textContent
    });
  }

  static async sendInvitationEmail(adminEmail: string, adminName: string, token: string) {
    console.log(`📧 Invitation for ${adminEmail} (token: ${token})`);
  }
}
