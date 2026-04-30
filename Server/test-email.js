import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('='.repeat(60));
console.log('📧 EMAIL CONFIGURATION TEST');
console.log('='.repeat(60));

// Check environment variables
console.log('\n1️⃣ Checking Environment Variables:');
console.log('   SMTP_HOST:', process.env.SMTP_HOST || '❌ NOT SET');
console.log('   SMTP_PORT:', process.env.SMTP_PORT || '❌ NOT SET');
console.log('   SMTP_USER:', process.env.SMTP_USER ? `✅ ${process.env.SMTP_USER.substring(0, 5)}...` : '❌ NOT SET');
console.log('   SMTP_PASS:', process.env.SMTP_PASS ? '✅ ***SET***' : '❌ NOT SET');
console.log('   FROM_EMAIL:', process.env.FROM_EMAIL || '❌ NOT SET');
console.log('   FROM_NAME:', process.env.FROM_NAME || '❌ NOT SET');

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.log('\n❌ SMTP credentials not configured!');
  console.log('   Please add SMTP_USER and SMTP_PASS to your .env file or Render environment variables.');
  process.exit(1);
}

// Create transporter
console.log('\n2️⃣ Creating Email Transporter...');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection
console.log('3️⃣ Verifying SMTP Connection...');
try {
  await transporter.verify();
  console.log('✅ SMTP connection verified successfully!');
} catch (error) {
  console.log('❌ SMTP connection failed!');
  console.error('Error:', error.message);
  console.error('Full error:', error);
  process.exit(1);
}

// Send test email
console.log('\n4️⃣ Sending Test Email...');
const testEmail = process.env.SMTP_USER; // Send to yourself

try {
  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || 'SuccessBridge'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: testEmail,
    subject: '✅ Test Email - SuccessBridge',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1>✅ Email Test Successful!</h1>
        </div>
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2>Congratulations!</h2>
          <p>Your email configuration is working correctly.</p>
          <p><strong>Configuration Details:</strong></p>
          <ul>
            <li>SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}</li>
            <li>SMTP Port: ${process.env.SMTP_PORT || '587'}</li>
            <li>From: ${process.env.FROM_EMAIL || process.env.SMTP_USER}</li>
          </ul>
          <p>You can now send password reset emails, verification codes, and other notifications!</p>
          <p>Best regards,<br>The SuccessBridge Team</p>
        </div>
      </div>
    `,
    text: `
✅ Email Test Successful!

Congratulations! Your email configuration is working correctly.

Configuration Details:
- SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}
- SMTP Port: ${process.env.SMTP_PORT || '587'}
- From: ${process.env.FROM_EMAIL || process.env.SMTP_USER}

You can now send password reset emails, verification codes, and other notifications!

Best regards,
The SuccessBridge Team
    `
  });

  console.log('✅ Test email sent successfully!');
  console.log('📬 Message ID:', info.messageId);
  console.log(`📧 Check your inbox at: ${testEmail}`);
  console.log('\n' + '='.repeat(60));
  console.log('🎉 ALL TESTS PASSED!');
  console.log('='.repeat(60));
} catch (error) {
  console.log('❌ Failed to send test email!');
  console.error('Error:', error.message);
  console.error('Full error:', error);
  process.exit(1);
}
