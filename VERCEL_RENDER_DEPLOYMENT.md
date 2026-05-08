# 🚀 SuccessBridge Deployment Guide

## Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express + PostgreSQL)

---

## 📋 Prerequisites

- GitHub account with your repository
- Vercel account (free): https://vercel.com
- Render account (free): https://render.com
- Backend already deployed on Render

---

## 🎯 Step-by-Step Deployment

### Part 1: Deploy Backend on Render (If Not Already Done)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click **"New +"** → **"Web Service"**

2. **Connect Repository**
   - Connect your GitHub account
   - Select repository: `TolesaTesfaye/SuccessBridge`
   - Click **"Connect"**

3. **Configure Service**
   ```
   Name: successbridge-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: Server
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Required variables:
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this
   
   # Database (Render provides this automatically if you add PostgreSQL)
   DATABASE_URL=your-postgres-connection-string
   
   # Frontend URL (will update after deploying frontend)
   FRONTEND_URL=https://your-app.vercel.app
   
   # File Upload (Backblaze B2)
   B2_APPLICATION_KEY_ID=your-b2-key-id
   B2_APPLICATION_KEY=your-b2-key
   B2_BUCKET_NAME=your-bucket-name
   B2_BUCKET_ID=your-bucket-id
   B2_REGION=us-west-004
   
   # Email (Resend)
   RESEND_API_KEY=your-resend-api-key
   EMAIL_FROM=noreply@yourdomain.com
   ```

5. **Create Web Service**
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for deployment
   - Copy your backend URL: `https://successbridge-backend.onrender.com`

6. **Test Backend**
   - Open: `https://successbridge-backend.onrender.com/health`
   - Should show: `{"status":"OK","database":"connected"}`

---

### Part 2: Deploy Frontend on Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com/new
   - Click **"Continue with GitHub"**
   - Authorize Vercel

2. **Import Project**
   - Click **"Import Git Repository"**
   - Select: `TolesaTesfaye/SuccessBridge`
   - Click **"Import"**

3. **Configure Project**
   ```
   Project Name: successbridge
   Framework Preset: Vite
   Root Directory: Client (click "Edit" to change)
   Build Command: npm run build (auto-detected)
   Output Directory: dist (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Add Environment Variables**
   Click **"Environment Variables"** section
   
   Add these variables:
   ```
   Name: VITE_API_URL
   Value: https://successbridge-backend.onrender.com/api
   
   Name: VITE_APP_NAME
   Value: SuccessBridge
   
   Name: NODE_VERSION
   Value: 22.22.0
   ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Your site is live! 🎉
   - Copy your URL: `https://successbridge.vercel.app`

6. **Update Backend CORS**
   - Go back to Render dashboard
   - Open your backend service
   - Go to **Environment** tab
   - Update `FRONTEND_URL` to your Vercel URL:
     ```
     FRONTEND_URL=https://successbridge.vercel.app
     ```
   - Click **"Save Changes"**
   - Backend will automatically redeploy

---

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to Client directory
cd Client

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? successbridge
# - Directory? ./ (current directory)
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### 1. Update Backend Environment Variables

Go to Render → Your backend service → Environment:

```
FRONTEND_URL=https://successbridge.vercel.app
```

Save and wait for redeploy.

### 2. Set Up Custom Domain (Optional)

#### On Vercel:
1. Go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

#### On Render:
1. Go to your service → **Settings** → **Custom Domain**
2. Add your custom domain
3. Update DNS records

### 3. Enable Automatic Deployments

Both platforms are already configured for automatic deployments:
- **Vercel**: Auto-deploys on every push to `main` branch
- **Render**: Auto-deploys on every push to `main` branch

---

## ✅ Verify Deployment

### Test Backend:
```bash
curl https://successbridge-backend.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2026-05-08T...",
  "database": "connected",
  "environment": "production"
}
```

### Test Frontend:
1. Open: `https://successbridge.vercel.app`
2. Try to register/login
3. Should work without errors! ✅

### Check Browser Console:
- Open DevTools (F12)
- Go to Console tab
- Should see no CORS errors
- Should see successful API requests

---

## 🐛 Troubleshooting

### Issue: "Network Error" or "Timeout"

**Cause**: Frontend can't reach backend

**Fix**:
1. Check backend is running: `https://successbridge-backend.onrender.com/health`
2. Verify `VITE_API_URL` in Vercel environment variables
3. Make sure it ends with `/api`: `https://successbridge-backend.onrender.com/api`
4. Redeploy frontend after changing env variables

### Issue: "CORS Error"

**Cause**: Backend not allowing frontend domain

**Fix**:
1. Check `FRONTEND_URL` in Render environment variables
2. Should be: `https://successbridge.vercel.app` (no trailing slash)
3. Backend code already allows all `.vercel.app` domains
4. Redeploy backend after changing env variables

### Issue: "502 Bad Gateway" on Backend

**Cause**: Backend crashed or not responding

**Fix**:
1. Go to Render dashboard
2. Check backend logs for errors
3. Common issues:
   - Database connection failed
   - Missing environment variables
   - Build failed
4. Fix the issue and redeploy

### Issue: Frontend Shows Old Version

**Cause**: Browser cache or deployment not complete

**Fix**:
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Check Vercel deployment status
4. Wait for deployment to complete (2-3 minutes)

---

## 📊 Monitoring & Logs

### Vercel Logs:
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **"Deployments"**
4. Click on a deployment to see logs

### Render Logs:
1. Go to: https://dashboard.render.com
2. Select your service
3. Click **"Logs"** tab
4. Real-time logs appear here

---

## 🔄 Update Deployment

### Update Frontend:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel automatically deploys in 2-3 minutes.

### Update Backend:
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render automatically deploys in 5-10 minutes.

---

## 💰 Cost Breakdown

### Vercel (Free Tier):
- ✅ Unlimited personal projects
- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments

### Render (Free Tier):
- ✅ 750 hours/month (enough for 1 service)
- ✅ Automatic HTTPS
- ✅ Automatic deployments
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Cold start: 30-60 seconds to wake up

**Note**: For production, consider upgrading Render to paid plan ($7/month) to avoid cold starts.

---

## 🎯 Quick Reference

### Your URLs:
```
Frontend: https://successbridge.vercel.app
Backend:  https://successbridge-backend.onrender.com
API:      https://successbridge-backend.onrender.com/api
Health:   https://successbridge-backend.onrender.com/health
```

### Environment Variables:

**Vercel (Frontend)**:
```
VITE_API_URL=https://successbridge-backend.onrender.com/api
VITE_APP_NAME=SuccessBridge
NODE_VERSION=22.22.0
```

**Render (Backend)**:
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-secret
DATABASE_URL=postgres://...
FRONTEND_URL=https://successbridge.vercel.app
B2_APPLICATION_KEY_ID=...
B2_APPLICATION_KEY=...
B2_BUCKET_NAME=...
B2_BUCKET_ID=...
RESEND_API_KEY=...
EMAIL_FROM=noreply@yourdomain.com
```

---

## 🆘 Need Help?

1. **Check deployment status**:
   - Vercel: https://vercel.com/dashboard
   - Render: https://dashboard.render.com

2. **Check logs**:
   - Look for error messages
   - Share error logs if needed

3. **Test endpoints**:
   ```bash
   # Test backend health
   curl https://successbridge-backend.onrender.com/health
   
   # Test API endpoint
   curl https://successbridge-backend.onrender.com/api/auth/health
   ```

4. **Common commands**:
   ```bash
   # Redeploy frontend
   vercel --prod
   
   # Check Vercel deployment
   vercel ls
   
   # View Vercel logs
   vercel logs
   ```

---

## ✨ Success Checklist

- [ ] Backend deployed on Render
- [ ] Backend health check returns "OK"
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set on both platforms
- [ ] CORS configured correctly
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can access dashboard
- [ ] No console errors
- [ ] Automatic deployments working

---

**🎉 Congratulations! Your app is now live on Vercel + Render!**
