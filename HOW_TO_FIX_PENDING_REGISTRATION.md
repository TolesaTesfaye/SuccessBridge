# How to Fix "Registration Pending" Error

## The Problem

When you see this error:
> "You already started registration with this email. Please check your email for the verification code..."

But you check your database and **don't see the user in the `users` table**.

## Why This Happens

The system uses **TWO tables** for registration:

1. **`pending_users`** table - Stores incomplete registrations (waiting for email verification)
2. **`users`** table - Stores verified, active users

### Registration Flow:
```
Register → Create in pending_users → Send email code → User verifies → Move to users table
```

**Your situation:**
- ✅ Record created in `pending_users` table
- ❌ Email not sent (SMTP not configured)
- ❌ Cannot verify email
- ❌ Record stuck in `pending_users` table
- ❌ Cannot register again with same email

---

## Solution 1: Use the Cleanup API (Easiest)

### Step 1: Wait 2 Minutes
The verification code expires after 2 minutes. Wait at least 2 minutes after your last registration attempt.

### Step 2: Run Cleanup Command
Open your browser console (F12) and run:

```javascript
fetch('https://successbridge-tolesa-api.onrender.com/api/auth/cleanup-expired-pending', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.json())
.then(data => {
  console.log('✅ Cleanup result:', data);
  alert(`Cleaned up ${data.count} expired registration(s). You can now register again!`);
});
```

### Step 3: Try Registration Again
After cleanup succeeds, go back to the registration page and try again with the same email.

---

## Solution 2: Use a Different Email (Quick)

Simply register with a different email address:
- Instead of: `tolesatesfaye16@gmail.com`
- Try: `tolesatesfaye17@gmail.com` or `gammachuu.test@gmail.com`

---

## Solution 3: Manually Delete from Database

If you have access to your database (PostgreSQL on Render):

### Using Render Shell:
1. Go to Render Dashboard
2. Select your database: **successbridge-tolesa-api**
3. Click **Shell** tab
4. Run:
```sql
DELETE FROM pending_users WHERE email = 'your-email@example.com';
```

### Using Database Client (pgAdmin, DBeaver, etc.):
1. Connect to your Render PostgreSQL database
2. Run:
```sql
-- See all pending users
SELECT * FROM pending_users;

-- Delete specific email
DELETE FROM pending_users WHERE email = 'tolesatesfaye16@gmail.com';

-- Or delete all expired pending users
DELETE FROM pending_users WHERE verification_expires < NOW();
```

---

## Solution 4: Configure SMTP (Permanent Fix)

This will fix the root cause so emails are actually sent.

### Add these environment variables on Render:

1. Go to: https://dashboard.render.com
2. Select: **successbridge-tolesa-api**
3. Click: **Environment** tab
4. Add these 6 variables:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `tolesatesfaye273@gmail.com` |
| `SMTP_PASS` | `lhkhwcjdzgvijtbr` |
| `FROM_EMAIL` | `tolesatesfaye273@gmail.com` |
| `FROM_NAME` | `SuccessBridge Team` |

5. Click **Save Changes** (will auto-redeploy in 3-5 minutes)
6. After deployment, test registration - emails will be sent!

---

## How to Check Pending Users

### Option 1: Using API (Add this endpoint)
I can add an endpoint to check pending users:
```
GET /api/auth/pending-users
```

### Option 2: Using Database Query
```sql
-- See all pending registrations
SELECT 
  email, 
  name, 
  verification_expires,
  CASE 
    WHEN verification_expires > NOW() THEN 'Active'
    ELSE 'Expired'
  END as status,
  created_at
FROM pending_users
ORDER BY created_at DESC;
```

---

## Understanding the Tables

### `pending_users` Table
Stores incomplete registrations waiting for email verification:
- `email` - User's email
- `name` - User's name
- `password` - Hashed password
- `verification_code` - 6-digit code sent via email
- `verification_expires` - Code expires after 2 minutes
- `role`, `studentType`, etc. - User details

### `users` Table
Stores verified, active users who can log in:
- Only created AFTER email verification
- Has all the same fields as pending_users
- Plus: `isEmailVerified`, `approvalStatus`, etc.

---

## Quick Reference

| Situation | Solution |
|-----------|----------|
| Just registered, can't register again | Wait 2 min, run cleanup API |
| Need to test quickly | Use different email |
| Have database access | Delete from `pending_users` table |
| Want permanent fix | Configure SMTP on Render |

---

## Testing After Fix

1. **Clean up** old pending registration (Solution 1, 2, or 3)
2. **Configure SMTP** (Solution 4)
3. **Try registration** with your email
4. **Check inbox** for 6-digit code
5. **Enter code** on verify-email page
6. **Success!** User created in `users` table

---

## Need Help?

If you're still stuck:
1. Check which table has your email:
   ```sql
   SELECT 'pending_users' as table_name, email FROM pending_users WHERE email = 'your@email.com'
   UNION
   SELECT 'users' as table_name, email FROM users WHERE email = 'your@email.com';
   ```

2. Run the cleanup API
3. Try with a different email
4. Configure SMTP so emails are sent

---

**Last Updated**: May 1, 2026
