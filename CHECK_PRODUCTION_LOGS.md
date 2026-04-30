# How to Check Production Registration Logs

## The Issue
- ✅ Registration works on **localhost**
- ❌ Registration fails on **production** with: "The information you provided is invalid"

This means there's a difference between local and production environments.

## Step 1: Check Render Backend Logs

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Find your backend service: `successbridge-tolesa-api`
   - Click on it

2. **Open Logs Tab**
   - Click "Logs" in the left sidebar
   - Keep this tab open

3. **Try Registration Again**
   - Open: https://successbridge.pages.dev/register
   - Open browser DevTools (F12) → Console tab
   - Fill out the registration form
   - Click Register

4. **Watch Both Logs Simultaneously**
   
   **In Browser Console, you should see:**
   ```
   === FRONTEND REGISTRATION ===
   Form data: { ... }
   Sending registration payload: { ... }
   ```
   
   **In Render Logs, you should see:**
   ```
   === REGISTRATION CONTROLLER ===
   Request body: { ... }
   === REGISTRATION REQUEST ===
   Received data: { ... }
   Creating pending user with data: { ... }
   ```

5. **If There's an Error in Render Logs:**
   ```
   Registration error: ...
   Error name: SequelizeValidationError
   Validation errors: [...]
   ```

## Step 2: Compare Local vs Production

### Check Environment Variables on Render

The issue might be missing or incorrect environment variables:

1. **Go to Render Dashboard** → Your Service → Environment
2. **Check these variables exist:**
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Any secret string
   - `FRONTEND_URL` - Should be `https://successbridge.pages.dev`
   - `BACKEND_URL` - Should be `https://successbridge-tolesa-api.onrender.com`
   - `SMTP_HOST` - `smtp.gmail.com`
   - `SMTP_PORT` - `587`
   - `SMTP_USER` - `tolesatesfaye273@gmail.com`
   - `SMTP_PASS` - Your Gmail app password
   - `FROM_EMAIL` - `tolesatesfaye273@gmail.com`
   - `NODE_ENV` - `production`

## Step 3: Common Production Issues

### Issue A: Database Schema Mismatch
**Symptom**: Validation errors about unknown fields
**Cause**: Production database schema is outdated
**Solution**: 
```bash
# The database might need migration
# Check if PendingUser table exists with all fields
```

### Issue B: CORS Error
**Symptom**: Network request fails before reaching backend
**Check**: Browser Network tab shows CORS error
**Solution**: Verify FRONTEND_URL is set correctly on Render

### Issue C: Email Service Failing
**Symptom**: Error about sending email
**Check**: Render logs show SMTP connection error
**Solution**: Verify SMTP credentials on Render

### Issue D: Sequelize Validation Error
**Symptom**: Specific field validation fails
**Check**: Render logs show which field is invalid
**Common causes**:
- Enum value mismatch (e.g., `high_school` vs `highschool`)
- Missing required field
- Wrong data type

## Step 4: Test with Minimal Data

Try registering with the **simplest possible data**:

**High School Grade 9 (no stream required):**
- First Name: `Test`
- Last Name: `User`
- Email: `test123@example.com` (unique email)
- Password: `Test123456`
- Confirm: `Test123456`
- Type: `Student`
- Path: `High School`
- Grade: `Grade 9`

This avoids optional fields and tests the core registration flow.

## Step 5: Check Database Directly

If you have access to the Render PostgreSQL database:

1. **Check if `pending_users` table exists:**
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_name = 'pending_users';
   ```

2. **Check table structure:**
   ```sql
   SELECT column_name, data_type, is_nullable 
   FROM information_schema.columns 
   WHERE table_name = 'pending_users';
   ```

3. **Check for any pending registrations:**
   ```sql
   SELECT * FROM pending_users 
   ORDER BY "createdAt" DESC 
   LIMIT 5;
   ```

## What to Share for Help

Please share these 3 things:

### 1. Browser Console Output
```
Copy everything from the Console tab, especially:
=== FRONTEND REGISTRATION ===
Form data: ...
Sending registration payload: ...
```

### 2. Network Tab Response
```
Go to Network tab → Click on "register" request
Copy the Response body
```

### 3. Render Backend Logs
```
Copy the logs from Render, especially:
=== REGISTRATION CONTROLLER ===
Request body: ...
Any error messages
```

## Quick Diagnostic Commands

If you have Render CLI or database access:

```bash
# Check if service is running
curl https://successbridge-tolesa-api.onrender.com/health

# Check database connection
# (Run this in Render shell if available)
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users;"
```

## Expected vs Actual

### ✅ What Should Happen:
1. Frontend sends payload to backend
2. Backend validates data
3. Backend creates PendingUser record
4. Backend sends verification email
5. Frontend redirects to /verify-email
6. Success!

### ❌ What's Happening:
1. Frontend sends payload to backend
2. Backend returns 400 error
3. Generic error message shown
4. **Need to see actual error from Render logs**

---

## Next Action

**Please do this now:**

1. Open Render logs in one tab
2. Open https://successbridge.pages.dev/register with DevTools in another tab
3. Try to register
4. Copy and share:
   - Browser console logs
   - Network response
   - Render backend logs

This will show us the **exact error** happening in production!
