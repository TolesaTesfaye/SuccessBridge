# Production Email Setup Guide - Password Reset Fix

## Problem
Password reset emails work locally but **NOT in production** on Render.

## Root Cause
The production environment (Render) is **missing SMTP email configuration** environment variables. The `render.yaml` file didn't include these variables, so the email service cannot send emails in production.

## Solution

### Step 1: Update render.yaml (Already Done ✅)
The `render.yaml` file has been updated to include all necessary email configuration variables.

### Step 2: Configure Environment Variables in Render Dashboard

You need to add the following environment variables in your Render dashboard:

#### 🔐 Required Email Variables (CRITICAL for Password Reset)

1. **SMTP_USER**
   - Value: `tolesatesfaye273@gmail.com`
   - Description: Your Gmail address

2. **SMTP_PASS**
   - Value: `lhkhwcjdzgvijtbr`
   - Description: Your Gmail App Password
   - ⚠️ **IMPORTANT**: This is your App Password, not your regular Gmail password

3. **FROM_EMAIL**
   - Value: `tolesatesfaye273@gmail.com`
   - Description: Email address that appears as sender (same as SMTP_USER)

#### ℹ️ Optional Email Variables (Already set in render.yaml)
- `SMTP_HOST`: smtp.gmail.com (already in render.yaml)
- `SMTP_PORT`: 587 (already in render.yaml)
- `FROM_NAME`: SuccessBridge Team (already in render.yaml)

### Step 3: How to Add Environment Variables in Render

1. **Go to Render Dashboard**
   - Navigate to: https://dashboard.render.com/
   - Select your `successbridge-api` service

2. **Open Environment Variables**
   - Click on "Environment" in the left sidebar
   - Or go to the "Environment" tab

3. **Add Each Variable**
   For each variable listed above:
   - Click "Add Environment Variable"
   - Enter the **Key** (e.g., `SMTP_USER`)
   - Enter the **Value** (e.g., `tolesatesfaye273@gmail.com`)
   - Click "Save Changes"

4. **Deploy Changes**
   - After adding all variables, Render will automatically redeploy
   - Or manually trigger a deploy from the "Manual Deploy" button

### Step 4: Verify Environment Variables

After deployment, check the logs to verify email service initialization:

```bash
# Look for these log messages in Render logs:
🔧 Initializing email service...
✅ SMTP email service initialized successfully
```

If you see:
```
⚠️ No email service configured. Emails will be logged to console.
```
Then the environment variables are not set correctly.

## Complete Environment Variables Checklist

Here's the complete list of environment variables you should have in Render:

### ✅ Already Set (from render.yaml)
- [x] NODE_ENV = production
- [x] PORT = 10000
- [x] FRONTEND_URL = https://successbridge.pages.dev
- [x] JWT_EXPIRES_IN = 7d
- [x] SMTP_HOST = smtp.gmail.com
- [x] SMTP_PORT = 587
- [x] FROM_NAME = SuccessBridge Team
- [x] B2_ENDPOINT = s3.us-east-005.backblazeb2.com
- [x] B2_REGION = us-east-005

### 🔴 Need to Set in Dashboard (Secrets)
- [ ] **DATABASE_URL** (Supabase connection string)
- [ ] **JWT_SECRET** (minimum 32 characters)
- [ ] **SUPABASE_URL**
- [ ] **SUPABASE_ANON_KEY**
- [ ] **SUPABASE_SERVICE_KEY**
- [ ] **SMTP_USER** ⚠️ **CRITICAL FOR EMAIL**
- [ ] **SMTP_PASS** ⚠️ **CRITICAL FOR EMAIL**
- [ ] **FROM_EMAIL** ⚠️ **CRITICAL FOR EMAIL**
- [ ] **GOOGLE_CLIENT_ID** (for OAuth)
- [ ] **GOOGLE_CLIENT_SECRET** (for OAuth)
- [ ] **MICROSOFT_CLIENT_ID** (for OAuth)
- [ ] **MICROSOFT_CLIENT_SECRET** (for OAuth)
- [ ] **B2_KEY_ID** (for file storage)
- [ ] **B2_APPLICATION_KEY** (for file storage)
- [ ] **B2_BUCKET_NAME** (for file storage)
- [ ] **B2_BUCKET_ID** (for file storage)
- [ ] **SUPER_ADMIN_EMAIL**
- [ ] **SUPER_ADMIN_PASSWORD**
- [ ] **SUPER_ADMIN_NAME**

## Testing After Deployment

### 1. Check Render Logs
After deployment, monitor the logs:
```bash
# In Render Dashboard > Logs, look for:
✅ SMTP email service initialized successfully
```

### 2. Test Password Reset Flow
1. Go to: https://successbridge.pages.dev/forgot-password
2. Enter a valid user email
3. Click "Send Reset Code"
4. Check the email inbox (and spam folder)

### 3. Monitor Production Logs
In Render logs, you should see:
```
🔑 Password reset requested for: user@example.com
✅ User found: John Doe (ID: 123)
📝 Generated reset code for user@example.com: 123456
💾 Reset code saved to database
📧 Attempting to send password reset email to: user@example.com
📧 Attempting to send email via smtp:
   To: user@example.com
   Subject: 🔑 Password Reset Code - SuccessBridge
✅ Email sent successfully to user@example.com via SMTP
   Message ID: <abc123@gmail.com>
```

## Common Production Issues

### Issue 1: "No email service configured" in logs
**Cause:** SMTP environment variables not set in Render dashboard

**Solution:**
1. Go to Render Dashboard > Environment
2. Add SMTP_USER, SMTP_PASS, FROM_EMAIL
3. Save and redeploy

### Issue 2: "SMTP send failed: EAUTH"
**Cause:** Invalid Gmail credentials or App Password

**Solution:**
1. Verify SMTP_USER is correct email address
2. Verify SMTP_PASS is the App Password (not regular password)
3. Generate new App Password if needed:
   - https://myaccount.google.com/security
   - Enable 2-Step Verification
   - Generate App Password for "Mail"
   - Update SMTP_PASS in Render

### Issue 3: "SMTP send failed: ECONNECTION"
**Cause:** Network/firewall issues from Render servers

**Solution:**
1. Verify SMTP_HOST and SMTP_PORT are correct
2. Try alternative port (465 with secure connection)
3. Contact Render support if issue persists
4. Consider using alternative email service (SendGrid, Mailgun)

### Issue 4: Emails sent but not received
**Cause:** Gmail blocking emails from Render IP or rate limiting

**Solution:**
1. Check spam folder
2. Check Gmail "Sent" folder to verify emails were sent
3. Add sender to contacts
4. Consider using dedicated email service for production

## Alternative: Use Dedicated Email Service (Recommended)

For production, Gmail SMTP has limitations. Consider using:

### Option 1: SendGrid (Recommended)
- **Free Tier:** 100 emails/day
- **Setup:**
  1. Sign up: https://sendgrid.com/
  2. Get API key
  3. Update environment variables:
     ```
     SENDGRID_API_KEY=your_api_key
     FROM_EMAIL=noreply@yourdomain.com
     ```
  4. Update emailService.ts to use SendGrid API

### Option 2: Resend (Already Partially Integrated)
- **Free Tier:** 3,000 emails/month
- **Setup:**
  1. Sign up: https://resend.com/
  2. Get API key
  3. Add to Render:
     ```
     RESEND_API_KEY=your_api_key
     ```
  4. The code already supports Resend!

### Option 3: AWS SES
- **Cost:** Very cheap ($0.10 per 1,000 emails)
- **Reliability:** Excellent
- **Setup:** More complex, requires AWS account

## Quick Fix Commands

### Push Updated render.yaml to GitHub
```bash
git add render.yaml
git commit -m "Add email configuration for production"
git push origin main
```

### Manually Trigger Render Deployment
1. Go to Render Dashboard
2. Click "Manual Deploy" > "Deploy latest commit"
3. Wait for deployment to complete
4. Check logs for email service initialization

## Verification Checklist

After completing the setup:

- [ ] render.yaml updated with email variables
- [ ] Changes pushed to GitHub
- [ ] SMTP_USER added in Render dashboard
- [ ] SMTP_PASS added in Render dashboard
- [ ] FROM_EMAIL added in Render dashboard
- [ ] Service redeployed successfully
- [ ] Logs show "✅ SMTP email service initialized successfully"
- [ ] Tested password reset on production
- [ ] Email received successfully

## Support

If issues persist after following this guide:

1. **Check Render Logs:**
   - Look for email service initialization messages
   - Look for SMTP error messages
   - Share relevant log excerpts

2. **Verify Environment Variables:**
   - In Render Dashboard > Environment
   - Ensure SMTP_USER, SMTP_PASS, FROM_EMAIL are set
   - Check for typos in variable names

3. **Test Gmail App Password:**
   - Try using the same credentials locally
   - Generate new App Password if needed

4. **Consider Alternative:**
   - Switch to Resend or SendGrid for production
   - More reliable for production use
   - Better deliverability rates

## Next Steps

1. ✅ Update render.yaml (Already done)
2. 🔴 Add SMTP environment variables in Render Dashboard
3. 🔴 Push changes to GitHub
4. 🔴 Wait for automatic deployment
5. 🔴 Test password reset on production
6. ✅ Monitor logs and verify emails are sent

---

**Last Updated:** May 12, 2026
**Status:** Waiting for environment variables to be set in Render Dashboard
