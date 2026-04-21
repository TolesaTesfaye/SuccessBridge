# SuccessBridge Deployment Checklist

## Current Deployment Status
- ✅ Frontend: https://port-k1wt19s4t-tolesas-projects-164416d0.vercel.app
- ✅ Backend: https://successbridge-tolesa-api.onrender.com
- ✅ Database: Supabase PostgreSQL (connected)

---

## 🔴 CRITICAL FIXES NEEDED

### 1. Vercel Environment Variables (Frontend)
Go to: https://vercel.com/tolesas-projects-164416d0/port/settings/environment-variables

Add this environment variable:
```
VITE_API_URL=https://successbridge-tolesa-api.onrender.com/api
```

After adding, **REDEPLOY** the frontend from Vercel dashboard.

---

### 2. Render Environment Variables (Backend)
Go to: https://dashboard.render.com → Your Service → Environment

Add these environment variables:

#### Required - CORS Configuration
```
FRONTEND_URL=https://port-k1wt19s4t-tolesas-projects-164416d0.vercel.app
```

#### Required - Super Admin Credentials
```
SUPER_ADMIN_EMAIL=tolesatesfaye273@gmail.com
SUPER_ADMIN_PASSWORD=702512@Tol
SUPER_ADMIN_NAME=Tolesa Tesfaye
```

#### Required - JWT Secret
```
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
```

#### Optional - Email Configuration (for notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@successbridge.com
```

#### Optional - Cloudflare R2 Storage (for file uploads)
```
AWS_REGION=auto
AWS_ACCESS_KEY_ID=your-r2-access-key-id
AWS_SECRET_ACCESS_KEY=your-r2-secret-access-key
AWS_S3_BUCKET=successbridge-resources
AWS_ENDPOINT=https://xxxxx.r2.cloudflarestorage.com
```

After adding environment variables, Render will automatically redeploy.

---

## 📋 Step-by-Step Instructions

### Step 1: Fix Frontend Environment Variable
1. Open Vercel dashboard
2. Go to your project settings
3. Navigate to "Environment Variables"
4. Add: `VITE_API_URL` = `https://successbridge-tolesa-api.onrender.com/api`
5. Select "Production" environment
6. Click "Save"
7. Go to "Deployments" tab
8. Click "Redeploy" on the latest deployment

### Step 2: Fix Backend CORS
1. Open Render dashboard
2. Go to your backend service
3. Navigate to "Environment" tab
4. Add: `FRONTEND_URL` = `https://port-k1wt19s4t-tolesas-projects-164416d0.vercel.app`
5. Click "Save Changes"
6. Wait for automatic redeploy (2-3 minutes)

### Step 3: Add Super Admin Credentials
1. In the same Render "Environment" tab
2. Add these three variables:
   - `SUPER_ADMIN_EMAIL` = `tolesatesfaye273@gmail.com`
   - `SUPER_ADMIN_PASSWORD` = `702512@Tol`
   - `SUPER_ADMIN_NAME` = `Tolesa Tesfaye`
3. Click "Save Changes"
4. Wait for automatic redeploy

### Step 4: Add JWT Secret
1. In the same Render "Environment" tab
2. Add: `JWT_SECRET` = (generate a random 32+ character string)
3. You can generate one here: https://randomkeygen.com/
4. Click "Save Changes"

### Step 5: Test the Connection
1. Wait for both deployments to complete (check Render logs)
2. Visit your frontend: https://port-k1wt19s4t-tolesas-projects-164416d0.vercel.app
3. Try to login with super admin credentials:
   - Email: tolesatesfaye273@gmail.com
   - Password: 702512@Tol
4. If successful, you should be redirected to the admin dashboard

---

## 🔍 Troubleshooting

### If frontend still shows "Unable to connect to servers":
1. Open browser console (F12)
2. Check the Network tab for failed requests
3. Verify the API URL being called matches: `https://successbridge-tolesa-api.onrender.com/api`
4. Check if CORS error appears in console

### If backend shows "CORS error":
1. Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
2. Make sure there's no trailing slash in the URL
3. Check Render logs for CORS-related errors

### If login fails:
1. Check Render logs to see if super admin was seeded
2. Look for: "✅ Super admin seeded successfully"
3. If you see "⚠️ SUPER_ADMIN_EMAIL/SUPER_ADMIN_PASSWORD not set", the env vars aren't set correctly

### If backend is sleeping (Render free tier):
1. Visit: https://successbridge-tolesa-api.onrender.com/health
2. Wait 30-60 seconds for it to wake up
3. Then try logging in again

---

## ✅ Verification Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] Database connected (Supabase)
- [ ] `VITE_API_URL` set in Vercel
- [ ] `FRONTEND_URL` set in Render
- [ ] Super admin credentials set in Render
- [ ] `JWT_SECRET` set in Render
- [ ] Frontend can reach backend (no CORS errors)
- [ ] Can login with super admin credentials
- [ ] Dashboard loads correctly

---

## 📝 Notes

- The database connection string is hardcoded in `Server/src/config/database.ts` as a temporary fix
- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- Cloudflare R2 storage is optional - file uploads will fail without it
- Email configuration is optional - email features won't work without it
