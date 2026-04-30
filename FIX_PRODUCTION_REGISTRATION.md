# Fix Production Registration Issue

## Problem
- ✅ Registration works on **localhost**
- ❌ Registration fails on **production** with: "The information you provided is invalid"

## Root Cause
The `pending_users` table likely doesn't exist in the production database, or has an outdated schema.

## Solution

### Option 1: Automatic Fix (Recommended)
The code has been updated to automatically create/update the `pending_users` table on server startup.

**Steps:**
1. Push the changes to GitHub (see commands below)
2. Wait for Render to redeploy (3-7 minutes)
3. Check Render logs for: `✅ PendingUser table verified/created`
4. Test registration again

### Option 2: Manual Migration (If Option 1 Doesn't Work)
Run the migration script manually on Render.

**Steps:**
1. Go to Render Dashboard → Your Service
2. Click "Shell" tab (or use Render CLI)
3. Run this command:
   ```bash
   npm run migrate:pending-users
   ```
4. You should see:
   ```
   🔄 Checking PendingUser table...
   ✅ PendingUser table is ready
   📋 Table structure: [shows columns]
   📊 Current pending users: 0
   ```

### Option 3: Direct Database Access
If you have PostgreSQL access:

```sql
-- Check if table exists
SELECT * FROM information_schema.tables 
WHERE table_name = 'pending_users';

-- If it doesn't exist, create it
CREATE TABLE IF NOT EXISTS pending_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  "studentType" VARCHAR(50),
  "highSchoolGrade" VARCHAR(50),
  "highSchoolStream" VARCHAR(50),
  "universityLevel" VARCHAR(50),
  university VARCHAR(255),
  department VARCHAR(255),
  "verificationCode" VARCHAR(10) NOT NULL,
  "verificationExpires" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'pending_users' 
ORDER BY ordinal_position;
```

## Changes Made

### 1. Auto-create PendingUser Table (`Server/src/index.ts`)
Added code to force sync the `pending_users` table on every server startup:
```typescript
// Ensure PendingUser table exists in production
const PendingUser = (await import('../models/PendingUser.js')).default
await PendingUser.sync({ alter: true })
```

### 2. Migration Script (`Server/src/scripts/ensurePendingUsersTable.ts`)
Created a standalone script to verify/create the table:
```bash
npm run migrate:pending-users
```

### 3. Enhanced Logging
Added detailed logging to track:
- What data frontend sends
- What backend receives
- Database operations
- Validation errors

## How to Deploy

```bash
# Stage all changes
git add -A

# Commit
git commit -m "Fix production registration: auto-create pending_users table"

# Push to GitHub
git push origin main
```

## After Deployment

### 1. Check Render Logs
Look for these messages:
```
✅ Database connected successfully
📊 Models synced
✅ PendingUser table verified/created
✅ Super admin checked/seeded
🚀 Server running on port 5000
```

### 2. Test Registration
1. Open: https://successbridge.pages.dev/register
2. Open DevTools Console (F12)
3. Fill the form and register
4. Check both:
   - Browser console for frontend logs
   - Render logs for backend logs

### 3. Expected Success Flow

**Browser Console:**
```
=== FRONTEND REGISTRATION ===
Form data: { firstName: "Test", ... }
Sending registration payload: {
  "name": "Test Student",
  "email": "test@example.com",
  "password": "Test123456",
  "role": "student",
  "studentType": "high_school",
  "highSchoolGrade": "grade_11",
  "highSchoolStream": "natural"
}
Registration result: true
```

**Render Logs:**
```
=== REGISTRATION CONTROLLER ===
Request body: { name: "Test Student", ... }
=== REGISTRATION REQUEST ===
Received data: { ... }
Creating pending user with data: { ... }
```

**Frontend:**
- Redirects to `/verify-email`
- Shows success message
- Email sent with 6-digit code

## Troubleshooting

### Issue: Table Still Not Created
**Check:**
```bash
# In Render Shell
npm run migrate:pending-users
```

### Issue: Permission Denied
**Cause:** Database user doesn't have CREATE TABLE permission
**Solution:** Check DATABASE_URL has correct permissions

### Issue: Still Getting Validation Error
**Check Render Logs for:**
```
Validation errors: [
  { field: "...", message: "...", value: "...", type: "..." }
]
```
This will show the exact field causing the problem.

### Issue: Email Not Sending
**Check Environment Variables on Render:**
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=tolesatesfaye273@gmail.com`
- `SMTP_PASS=lhkhwcjdzgvijtbr`
- `FROM_EMAIL=tolesatesfaye273@gmail.com`

## Verification Checklist

After deployment, verify:
- [ ] Render shows "PendingUser table verified/created" in logs
- [ ] Registration form loads without errors
- [ ] Can fill out the form completely
- [ ] Clicking Register shows loading state
- [ ] Browser console shows "=== FRONTEND REGISTRATION ==="
- [ ] Render logs show "=== REGISTRATION CONTROLLER ==="
- [ ] No validation errors in Render logs
- [ ] Redirects to `/verify-email` page
- [ ] Email received with 6-digit code

## Database Schema Reference

The `pending_users` table should have these columns:
- `id` (UUID, Primary Key)
- `email` (String, Unique, Required)
- `name` (String, Required)
- `password` (String, Required - hashed)
- `role` (Enum: 'student' | 'admin')
- `studentType` (Enum: 'high_school' | 'university', Optional)
- `highSchoolGrade` (Enum: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12', Optional)
- `highSchoolStream` (Enum: 'natural' | 'social', Optional)
- `universityLevel` (Enum: 'remedial' | 'freshman' | 'senior' | 'gc', Optional)
- `university` (String, Optional)
- `department` (String, Optional)
- `verificationCode` (String, Required)
- `verificationExpires` (Timestamp, Required)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Next Steps

1. **Push changes to GitHub** (commands above)
2. **Wait for Render deployment** (3-7 minutes)
3. **Check Render logs** for table creation message
4. **Test registration** with DevTools open
5. **Share logs** if issue persists:
   - Browser console output
   - Network tab response
   - Render backend logs

The automatic table creation should fix the production registration issue!
