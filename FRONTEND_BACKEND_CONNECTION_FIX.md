# 🔧 Frontend-Backend Connection Fix

## Problem
Frontend shows: "timeout of 30000ms exceeded" or "Network Error" when trying to login.

## Root Cause
The frontend can't connect to the backend due to:
1. Wrong API URL in environment variables
2. CORS not allowing the frontend domain
3. Backend not deployed or not running

---

## ✅ Solution Steps

### Step 1: Check Your Backend URL

Your backend should be deployed on Render at:
```
https://successbridge-tolesa-api.onrender.com
```

**Test it:** Open this URL in your browser:
```
https://successbridge-tolesa-api.onrender.com/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "...",
  "database": "connected",
  "environment": "production"
}
```

❌ **If you get an error or timeout:**
- Your backend is not deployed or crashed
- Go to Render dashboard and check deployment status
- Check backend logs for errors

---

### Step 2: Update Frontend Environment Variables

#### For Cloudflare Pages:
1. Go to: https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → Your project
3. Go to **Settings** → **Environment variables**
4. Add/Update:
   ```
   VITE_API_URL = https://successbridge-tolesa-api.onrender.com/api
   ```
5. Click **Save**
6. Go to **Deployments** → Click **"Retry deployment"**

#### For Vercel:
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Update:
   ```
   VITE_API_URL = https://successbridge-tolesa-api.onrender.com/api
   ```
5. Click **Save**
6. Go to **Deployments** → Click **"Redeploy"**

#### For Netlify:
1. Go to: https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add/Update:
   ```
   VITE_API_URL = https://successbridge-tolesa-api.onrender.com/api
   ```
5. Click **Save**
6. Go to **Deploys** → Click **"Trigger deploy"**

---

### Step 3: Verify CORS is Fixed

I've updated the backend to allow:
- ✅ All `.pages.dev` domains (Cloudflare)
- ✅ All `.vercel.app` domains (Vercel)
- ✅ All `.netlify.app` domains (Netlify)
- ✅ All `.github.io` domains (GitHub Pages)

**Push the backend changes:**
```bash
git add Server/src/index.ts
git commit -m "fix: Update CORS to allow all deployment platforms"
git push origin main
```

Wait 2-3 minutes for Render to redeploy the backend.

---

### Step 4: Test the Connection

1. **Open your deployed frontend**
2. **Open browser DevTools** (F12)
3. **Go to Console tab**
4. **Try to login**

**Look for these logs:**
```
🚀 API Request: POST /auth/login
✅ API Response: POST /auth/login
```

✅ **If you see these:** Connection is working!

❌ **If you see CORS error:**
```
Access to XMLHttpRequest at 'https://...' from origin 'https://...' has been blocked by CORS
```
- Backend CORS needs to be updated
- Check backend logs on Render

❌ **If you see timeout:**
```
timeout of 30000ms exceeded
```
- Backend is not responding
- Check if backend is running on Render
- Check backend logs for errors

---

## 🚨 Common Issues & Fixes

### Issue 1: Backend Not Deployed
**Symptoms:** Health check fails, timeout errors

**Fix:**
1. Go to Render dashboard
2. Check if backend service is running
3. Check deployment logs for errors
4. If failed, click "Manual Deploy" → "Deploy latest commit"

### Issue 2: Wrong API URL
**Symptoms:** 404 errors, "Cannot GET /api/auth/login"

**Fix:**
- Make sure `VITE_API_URL` ends with `/api`
- Correct: `https://successbridge-tolesa-api.onrender.com/api`
- Wrong: `https://successbridge-tolesa-api.onrender.com`

### Issue 3: Environment Variables Not Applied
**Symptoms:** Still connecting to localhost

**Fix:**
1. After updating environment variables, you MUST redeploy
2. Cloudflare: Retry deployment
3. Vercel: Redeploy
4. Netlify: Trigger deploy
5. Clear browser cache (Ctrl+Shift+R)

### Issue 4: CORS Still Blocking
**Symptoms:** "Not allowed by CORS" in console

**Fix:**
1. Make sure backend changes are pushed and deployed
2. Check backend logs on Render for "❌ CORS blocked origin: ..."
3. If your domain is blocked, add it to `allowedOrigins` in `Server/src/index.ts`

---

## 📝 Quick Checklist

- [ ] Backend is deployed and running on Render
- [ ] Backend health check returns "OK"
- [ ] Frontend environment variable `VITE_API_URL` is correct
- [ ] Frontend is redeployed after env variable change
- [ ] Backend CORS changes are pushed and deployed
- [ ] Browser cache is cleared
- [ ] DevTools console shows no CORS errors

---

## 🆘 Still Not Working?

1. **Check Backend Logs:**
   - Go to Render dashboard
   - Click on your backend service
   - Go to "Logs" tab
   - Look for errors

2. **Check Frontend Console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red errors
   - Share the error message

3. **Test API Directly:**
   ```bash
   curl https://successbridge-tolesa-api.onrender.com/health
   ```

4. **Check Network Tab:**
   - Open DevTools → Network tab
   - Try to login
   - Click on the failed request
   - Check "Response" and "Headers" tabs
   - Look for error details

---

## ✅ Success Indicators

When everything is working, you should see:

1. **Health check works:**
   ```
   https://successbridge-tolesa-api.onrender.com/health
   → Status: OK
   ```

2. **Login works:**
   - No timeout errors
   - No CORS errors
   - User is logged in successfully

3. **Console logs (in dev mode):**
   ```
   🚀 API Request: POST /auth/login
   ✅ API Response: POST /auth/login
   ```

4. **Network tab shows:**
   - Status: 200 OK
   - Response contains token and user data
