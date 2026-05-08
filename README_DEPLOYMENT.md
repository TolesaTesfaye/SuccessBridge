# 🚀 SuccessBridge - Deployment Instructions

## Official Stack
- **Frontend**: Vercel
- **Backend**: Render

---

## 📖 Complete Guide

See **[VERCEL_RENDER_DEPLOYMENT.md](./VERCEL_RENDER_DEPLOYMENT.md)** for detailed step-by-step instructions.

---

## ⚡ Quick Deploy

### 1. Deploy Frontend to Vercel

1. Go to: https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory**: `Client`
4. Add environment variable:
   ```
   VITE_API_URL = https://successbridge-backend.onrender.com/api
   ```
5. Click **Deploy**

### 2. Update Backend CORS

1. Go to Render dashboard
2. Add environment variable:
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```
3. Save (auto-redeploys)

---

## 🐛 Troubleshooting

See **[FRONTEND_BACKEND_CONNECTION_FIX.md](./FRONTEND_BACKEND_CONNECTION_FIX.md)**

---

## ✅ Success Checklist

- [ ] Backend running on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set
- [ ] Can login successfully
- [ ] No CORS errors

**🎉 Done!**
