// Test script to verify email configuration
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testEmailConfiguration() {
  console.log('🔧 Testing Email Configuration...\n');
  
  // Display configuration (without showing password)
  console.log('Configuration:');
  console.log(`  SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`  SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`  SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`  SMTP_PASS: ${process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET'}`);
  console.log(`  FROM_EMAIL: ${process.env.FROM_EMAIL}`);
  console.log(`  FROM_NAME: ${process.env.FROM_NAME}\n`);

  // Check if all required variables are set
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Missing required SMTP configuration!');
    console.error('   Please ensure SMTP_HOST, SMTP_USER, and SMTP_PASS are set in .env file');
    process.exit(1);
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: parseInt(process.env.SMTP_PORT || '587') === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Step 1: Verify connection
    console.log('📡 Step 1: Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');

    // Step 2: Send test email
    console.log('📧 Step 2: Sending test email...');
    const testEmail = process.env.SMTP_USER; // Send to yourself
    
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: testEmail,
      subject: '🔑 Test Password Reset Code - SuccessBridge',
      text: 'This is a test email. Your password reset code is: 123456',
      html: `
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔑 Test Password Reset</h1>
            </div>
            <div class="content">
              <h2>Hi there,</h2>
              <p>This is a test email to verify your email configuration is working correctly.</p>
              <div class="code-box">
                <div class="code">123456</div>
              </div>
              <p>If you received this email, your SMTP configuration is working! ✅</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Recipient: ${testEmail}`);
    console.log('\n🎉 Email configuration is working correctly!');
    console.log('   Check your inbox for the test email.');
    
  } catch (error) {
    console.error('\n❌ Email test failed!');
    console.error('Error details:', error);
    
    if (error.code === 'EAUTH') {
      console.error('\n💡 Authentication failed. Possible solutions:');
      console.error('   1. Verify SMTP_USER and SMTP_PASS are correct');
      console.error('   2. For Gmail, ensure you are using an App Password, not your regular password');
      console.error('   3. Enable "Less secure app access" or use 2FA with App Password');
      console.error('   4. Check if your account has been locked due to suspicious activity');
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('\n💡 Connection failed. Possible solutions:');
      console.error('   1. Check your internet connection');
      console.error('   2. Verify SMTP_HOST and SMTP_PORT are correct');
      console.error('   3. Check if your firewall is blocking the connection');
    }
    
    process.exit(1);
  }
}

// Run the test
testEmailConfiguration();
