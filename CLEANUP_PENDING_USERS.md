# How to Clean Up Pending Users

## Problem
When you try to register with an email that already has a pending registration, you get:
"The information you provided is invalid. Please check your input and try again."

The actual error is: "Registration pending. Please check your email for the verification code or request a new one."

## Solutions

### Solution 1: Use the API Endpoint (After Deployment)

After Render finishes deploying (3-5 minutes), you can clean up expired pending users by calling this endpoint:

**Using Browser Console:**
```javascript
fetch('https://successbridge-tolesa-api.onrender.com/api/auth/cleanup-expired-pending', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(data => console.log('Cleanup result:', data));
```

**Using curl:**
```bash
curl -X POST https://successbridge-tolesa-api.onrender.com/api/auth/cleanup-expired-pending
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cleaned up 1 expired pending user(s)",
  "count": 1
}
```

### Solution 2: Use a Different Email

The easiest solution right now:
- Register with a different email address
- Example: `tolesatesfaye17@gmail.com` or `gammachuu.test@gmail.com`

### Solution 3: Use Render Shell (Manual)

If you have access to Render Shell:
```bash
npm run cleanup:pending-users
```

### Solution 4: Wait for Expiration

Pending registrations expire after 2 minutes. If you wait 2 minutes, then call the cleanup endpoint, the old registration will be removed.

## What Changed

### 1. Better Error Message ✅
Now when you try to register with a pending email, you'll see:
```
Title: Registration Pending
Message: You already started registration with this email. 
Please check your email for the verification code, or use 
the "Resend Code" option on the verify-email page.
```

Instead of the generic "invalid information" message.

### 2. Cleanup API Endpoint ✅
New endpoint to clean up expired pending users:
- **URL:** `POST /api/auth/cleanup-expired-pending`
- **No authentication required**
- **Removes all expired pending registrations**

## Testing After Deployment

### Step 1: Wait for Deployment (3-5 minutes)
- Render will auto-deploy the backend
- Cloudflare will auto-deploy the frontend

### Step 2: Clean Up Expired Pending Users
Run this in browser console:
```javascript
fetch('https://successbridge-tolesa-api.onrender.com/api/auth/cleanup-expired-pending', {
  method: 'POST'
})
.then(res => res.json())
.then(data => console.log(data));
```

### Step 3: Try Registration Again
- Go to: https://successbridge.pages.dev/register
- Use the same email: `tolesatesfaye16@gmail.com`
- Should work now!

## Current Status

- ✅ Better error message (shows "Registration Pending" instead of generic error)
- ✅ Cleanup API endpoint added
- ✅ Changes pushed to GitHub
- ⏳ Waiting for deployment (3-5 minutes)
- ⏳ Still need to configure SMTP for emails

## Quick Test

After deployment, test the cleanup:

1. **Open browser console** on any page
2. **Run:**
   ```javascript
   fetch('https://successbridge-tolesa-api.onrender.com/api/auth/cleanup-expired-pending', {
     method: 'POST'
   })
   .then(res => res.json())
   .then(data => console.log('Cleaned up:', data.count, 'users'));
   ```
3. **Try to register** with the same email again
4. **Should work now!**

## Important Notes

- The cleanup endpoint removes **only expired** pending users (older than 2 minutes)
- If a pending registration is less than 2 minutes old, it won't be removed
- This is by design to prevent abuse
- Users can use the "Resend Code" feature on the verify-email page

## Next Steps

1. **Wait 3-5 minutes** for deployment
2. **Run the cleanup endpoint** (browser console command above)
3. **Try registration again** with the same email
4. **Configure SMTP** on Render so emails are actually sent

Once SMTP is configured, users will receive verification codes immediately and won't have this problem!
