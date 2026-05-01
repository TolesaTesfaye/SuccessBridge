# SMTP Configuration for Render

## Current SMTP Settings

Use these environment variables on Render:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `tolesatesfaye273@gmail.com` |
| `SMTP_PASS` | `sqraxsrbycmlpjke` |
| `FROM_EMAIL` | `tolesatesfaye273@gmail.com` |
| `FROM_NAME` | `SuccessBridge Team` |

## Alternative App Password (If Needed)

If the above doesn't work, try this one:
- **App Password:** `SuccessBridge2`

## How to Update on Render

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Sign in to your account

### Step 2: Select Your Service
1. Click on: **successbridge-tolesa-api**

### Step 3: Update Environment Variables
1. Click on: **Environment** tab (left sidebar)
2. Find or add these variables:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = tolesatesfaye273@gmail.com
SMTP_PASS = sqraxsrbycmlpjke
FROM_EMAIL = tolesatesfaye273@gmail.com
FROM_NAME = SuccessBridge Team
```

### Step 4: Save Changes
1. Click: **Save Changes** button
2. Render will automatically redeploy (takes 3-5 minutes)

### Step 5: Wait for Deployment
Watch the deployment logs. You should see:
```
✅ Email service is ready to send emails
```

## Testing After Configuration

### Test 1: Register New User
```bash
curl -X POST https://successbridge-tolesa-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "password123",
    "studentType": "university"
  }'
```

### Test 2: Check Render Logs
Look for:
```
📧 Attempting to send verification email to test@example.com...
✅ Verification code sent to test@example.com
📬 Message ID: <...>
```

### Test 3: Check Email Inbox
- Check the email inbox for: test@example.com
- Should receive email with 6-digit verification code
- Subject: "✅ Your Verification Code - SuccessBridge"

## Troubleshooting

### If Email Still Times Out

#### Option 1: Check Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with: tolesatesfaye273@gmail.com
3. Verify the app password is active
4. Generate a new one if needed

#### Option 2: Check Gmail Account
- Make sure 2-Step Verification is enabled
- Check if account is locked or suspended
- Verify no security alerts

#### Option 3: Try Alternative SMTP
If Gmail doesn't work, you can use:

**SendGrid (Free tier: 100 emails/day)**
```
SMTP_HOST = smtp.sendgrid.net
SMTP_PORT = 587
SMTP_USER = apikey
SMTP_PASS = <your-sendgrid-api-key>
FROM_EMAIL = tolesatesfaye273@gmail.com
FROM_NAME = SuccessBridge Team
```

**Mailgun (Free tier: 5,000 emails/month)**
```
SMTP_HOST = smtp.mailgun.org
SMTP_PORT = 587
SMTP_USER = postmaster@<your-domain>.mailgun.org
SMTP_PASS = <your-mailgun-password>
FROM_EMAIL = tolesatesfaye273@gmail.com
FROM_NAME = SuccessBridge Team
```

## Expected Behavior

### Without SMTP (Current)
```
Registration: 5-6 seconds
Email: Logged to console only
Verification code: In Render logs
User experience: Must check logs for code
```

### With SMTP (After Configuration)
```
Registration: 2-3 seconds
Email: Sent to user's inbox
Verification code: In email
User experience: Check email, enter code, done!
```

## Quick Copy-Paste for Render

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tolesatesfaye273@gmail.com
SMTP_PASS=sqraxsrbycmlpjke
FROM_EMAIL=tolesatesfaye273@gmail.com
FROM_NAME=SuccessBridge Team
```

## Security Notes

⚠️ **Important:**
- Never commit SMTP credentials to Git
- Use environment variables only
- Rotate app passwords regularly
- Monitor for suspicious activity

## Status Checklist

- [ ] SMTP_HOST configured on Render
- [ ] SMTP_PORT configured on Render
- [ ] SMTP_USER configured on Render
- [ ] SMTP_PASS configured on Render
- [ ] FROM_EMAIL configured on Render
- [ ] FROM_NAME configured on Render
- [ ] Render redeployed (automatic after save)
- [ ] Test registration completed
- [ ] Email received in inbox
- [ ] Verification successful

## Support

If you continue to have issues:
1. Check Render logs for error messages
2. Verify Gmail account is not locked
3. Try generating a new app password
4. Consider using SendGrid or Mailgun as alternative

---

**Last Updated:** May 1, 2026
**App Password:** sqraxsrbycmlpjke (or SuccessBridge2)
**Status:** Ready to configure on Render
