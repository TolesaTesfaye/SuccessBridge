# Configure SMTP on Render - Quick Guide

## Your New Gmail App Password

**Password:** `sqraxsrbycmlpjke`

Alternative format: `SuccessBridge2`

## Step-by-Step Instructions

### 1. Open Render Dashboard
Go to: https://dashboard.render.com

### 2. Select Your Backend Service
Click on: **successbridge-tolesa-api**

### 3. Go to Environment Tab
Click: **Environment** (in left sidebar)

### 4. Add/Update These 6 Variables

Copy and paste each one:

```
Variable Name: SMTP_HOST
Value: smtp.gmail.com
```

```
Variable Name: SMTP_PORT
Value: 587
```

```
Variable Name: SMTP_USER
Value: tolesatesfaye273@gmail.com
```

```
Variable Name: SMTP_PASS
Value: sqraxsrbycmlpjke
```

```
Variable Name: FROM_EMAIL
Value: tolesatesfaye273@gmail.com
```

```
Variable Name: FROM_NAME
Value: SuccessBridge Team
```

### 5. Save Changes
Click the **"Save Changes"** button at the bottom

### 6. Wait for Deployment
- Render will automatically redeploy (3-5 minutes)
- Watch the logs for: "✅ Email service is ready to send emails"

### 7. Test Registration
1. Go to: https://successbridge.pages.dev/register
2. Register with any email
3. Check your email inbox
4. You should receive a verification code!

## What to Look For in Logs

### Success (What You Want to See)
```
🔧 Initializing email service...
📧 SMTP_USER: toles...
📧 SMTP_PASS: ***SET***
📧 SMTP_HOST: smtp.gmail.com
📧 SMTP_PORT: 587
✅ Email service is ready to send emails
📧 Attempting to send verification email to user@example.com...
✅ Verification code sent to user@example.com
📬 Message ID: <...>
```

### Failure (What You're Seeing Now)
```
🔧 Initializing email service...
📧 SMTP_USER: toles...
📧 SMTP_PASS: ***SET***
Failed to send verification email (non-blocking): Error: Email timeout
```

## Quick Copy-Paste (All Variables)

For easy copy-paste into Render:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tolesatesfaye273@gmail.com
SMTP_PASS=sqraxsrbycmlpjke
FROM_EMAIL=tolesatesfaye273@gmail.com
FROM_NAME=SuccessBridge Team
```

## Troubleshooting

### If It Still Doesn't Work

1. **Check Gmail Account**
   - Go to: https://myaccount.google.com/security
   - Make sure 2-Step Verification is ON
   - Check for security alerts

2. **Generate New App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Delete old "SuccessBridge" app password
   - Create new one
   - Update SMTP_PASS on Render

3. **Check Render Logs**
   - Look for specific error messages
   - Share them if you need help

## Expected Timeline

- **Now:** Configure variables on Render (2 minutes)
- **+3 minutes:** Render redeploys automatically
- **+5 minutes:** Test registration
- **+6 minutes:** Receive email with verification code
- **+7 minutes:** Complete registration successfully

## Success Criteria

✅ Render logs show: "✅ Email service is ready to send emails"
✅ Registration completes in 2-3 seconds (not 5-6)
✅ Email arrives in inbox within 30 seconds
✅ Verification code works
✅ User can complete registration

---

**Ready to configure?** Follow the steps above and your email system will be working in 5 minutes! 🎉
