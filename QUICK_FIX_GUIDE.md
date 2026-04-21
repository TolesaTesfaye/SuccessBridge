# 🚀 Quick Fix Guide - Frontend-Backend Connection

## The Problem
Your frontend and backend are deployed but not connecting because:
1. ❌ Wrong API URL in frontend (missing "tolesa" in URL)
2. ❌ CORS not configured (backend doesn't allow your Vercel domain)
3. ❌ Super admin credentials not set in Render

## The Solution (3 Steps - 5 Minutes)

### Step 1: Fix Vercel Environment Variable ⏱️ 2 min
1. Go to: https://vercel.com → Your Project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://successbridge-tolesa-api.onrender.com/api`
   - **Environment**: Production
3. Click **Save**
4. Go to **Deployments** tab → Click **Redeploy** on latest deployment

### Step 2: Fix Render CORS ⏱️ 2 min
1. Go to: https://dashboard.render.com → Your Backend Service → Environment
2. Add new variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://port-k1wt19s4t-tolesas-projects-164416d0.vercel.app`
3. Click **Save Changes** (auto-redeploys)

### Step 3: Add Super Admin Credentials ⏱️ 1 min
In the same Render Environment tab, add:
- **Key**: `SUPER_ADMIN_EMAIL` → **Value**: `tolesatesfaye273@gmail.com`
- **Key**: `SUPER_ADMIN_PASSWORD` → **Value**: `702512@Tol`
- **Key**: `SUPER_ADMIN_NAME` → **Value**: `Tolesa Tesfaye`
- **Key**: `JWT_SECRET` → **Value**: (any random 32+ character string)

Click **Save Changes**

---

## ✅ Test It
1. Wait 2-3 minutes for deployments to complete
2. Visit: https://port-k1wt19s4t-tolesas-projects-164416d0.vercel.app
3. Login with:
   - Email: `tolesatesfaye273@gmail.com`
   - Password: `702512@Tol`
4. Should redirect to admin dashboard ✨

---

## 🔍 Still Not Working?

### Check Backend is Awake
Visit: https://successbridge-tolesa-api.onrender.com/health
- Should return: `{"status":"OK","database":"connected"}`
- If slow/timeout: Render free tier is waking up (wait 30 seconds)

### Check Browser Console
Press F12 → Console tab
- Look for CORS errors
- Check what API URL is being called
- Should be: `https://successbridge-tolesa-api.onrender.com/api/...`

### Check Render Logs
Dashboard → Your Service → Logs
- Look for: "✅ Super admin seeded successfully"
- If you see: "⚠️ SUPER_ADMIN_EMAIL not set" → env vars not saved correctly

---

## 📱 Need More Help?
See full details in: `DEPLOYMENT_CHECKLIST.md`
