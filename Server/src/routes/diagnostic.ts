import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Diagnostic endpoint to check email configuration
 * Access: https://successbridge-tolesa-api.onrender.com/api/diagnostic/email-config
 */
router.get('/email-config', (req: Request, res: Response) => {
  const config = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    emailConfiguration: {
      smtpHost: process.env.SMTP_HOST || 'NOT SET',
      smtpPort: process.env.SMTP_PORT || 'NOT SET',
      smtpUser: process.env.SMTP_USER ? '✅ SET (' + process.env.SMTP_USER.substring(0, 3) + '***@' + process.env.SMTP_USER.split('@')[1] + ')' : '❌ NOT SET',
      smtpPass: process.env.SMTP_PASS ? '✅ SET (***' + process.env.SMTP_PASS.slice(-4) + ')' : '❌ NOT SET',
      fromEmail: process.env.FROM_EMAIL ? '✅ SET (' + process.env.FROM_EMAIL + ')' : '❌ NOT SET',
      fromName: process.env.FROM_NAME || 'NOT SET',
    },
    status: {
      allConfigured: !!(
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        process.env.FROM_EMAIL
      ),
      missingVariables: [
        !process.env.SMTP_HOST && 'SMTP_HOST',
        !process.env.SMTP_PORT && 'SMTP_PORT',
        !process.env.SMTP_USER && 'SMTP_USER',
        !process.env.SMTP_PASS && 'SMTP_PASS',
        !process.env.FROM_EMAIL && 'FROM_EMAIL',
      ].filter(Boolean),
    },
    recommendation: '',
  };

  if (config.status.allConfigured) {
    config.recommendation = '✅ All email configuration variables are set. Email service should be working.';
  } else {
    config.recommendation = `❌ Missing variables: ${config.status.missingVariables.join(', ')}. Add these in Render Dashboard → Environment.`;
  }

  res.json(config);
});

/**
 * Test endpoint to trigger a test email
 * Access: POST https://successbridge-tolesa-api.onrender.com/api/diagnostic/test-email
 * Body: { "email": "your@email.com" }
 */
router.post('/test-email', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required in request body',
      });
    }

    // Import EmailService dynamically to avoid circular dependencies
    const { EmailService } = await import('../services/emailService.js');

    // Send test email
    await EmailService.sendPasswordResetEmail(email, 'Test User', '123456');

    res.json({
      success: true,
      message: `Test email sent to ${email}. Check your inbox (and spam folder).`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send test email',
      details: {
        code: error.code,
        command: error.command,
        response: error.response,
      },
    });
  }
});

export default router;
