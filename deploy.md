# 🚀 SuccessBridge Deployment Guide

## Quick Deployment (Recommended)

### 1. Database Setup (Choose One)

#### Option A: PlanetScale (MySQL) - FREE
```bash
# 1. Sign up at planetscale.com
# 2. Create new database: successbridge
# 3. Get connection string
# 4. Add to your backend environment variables
```

#### Option B: Supabase (PostgreSQL) - FREE
```bash
# 1. Sign up at supabase.com
# 2. Create new project: successbridge
# 3. Go to Settings > Database
# 4. Copy connection string
```

### 2. Backend Deployment - Railway (FREE)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Navigate to Server directory
cd Server

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables in Railway dashboard:
# - DATABASE_URL: your database connection string
# - JWT_SECRET: your-secret-key
# - FRONTEND_URL: https://your-app.vercel.app
# - NODE_ENV: production
```

### 3. Frontend Deployment - Vercel (FREE)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to Client directory
cd Client

# Update .env.production with your Railway backend URL
# VITE_API_URL=https://your-app.railway.app/api

# Build the project
npm run build

# Deploy to Vercel
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: successbridge
# - Directory: ./
# - Override settings? No
```

## Alternative Deployment Options

### Backend Alternatives:

#### Render.com (FREE)
1. Connect GitHub repo to render.com
2. Create new Web Service
3. Root directory: `Server`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variables

#### Heroku (FREE tier limited)
```bash
# Install Heroku CLI
# Create Heroku app
heroku create successbridge-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL=your-db-url
heroku config:set JWT_SECRET=your-secret

# Deploy
git subtree push --prefix Server heroku main
```

### Frontend Alternatives:

#### Netlify (FREE)
1. Build project: `cd Client && npm run build`
2. Drag & drop `dist` folder to netlify.com
3. Or connect GitHub repo for auto-deployment

#### GitHub Pages (FREE)
```bash
cd Client
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/successbridge",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

npm run deploy
```

## Environment Variables Setup

### Backend (.env)
```
DATABASE_URL=your-database-connection-string
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
PORT=5000
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-domain.railway.app/api
VITE_APP_NAME=SuccessBridge
```

## Post-Deployment Checklist

- [ ] Database connected and tables created
- [ ] Backend API responding at `/api/health`
- [ ] Frontend can connect to backend
- [ ] Authentication working
- [ ] File uploads working (if applicable)
- [ ] All environment variables set
- [ ] CORS configured for your frontend domain

## Troubleshooting

### Common Issues:

1. **CORS Error**: Update FRONTEND_URL in backend environment
2. **Database Connection**: Check DATABASE_URL format
3. **Build Fails**: Check Node.js version compatibility
4. **API Not Found**: Verify VITE_API_URL in frontend

### Logs:
- Railway: `railway logs`
- Vercel: Check dashboard or `vercel logs`
- Render: Check dashboard logs

## Cost Breakdown (FREE TIER)

- **Database**: PlanetScale (1GB) or Supabase (500MB) - FREE
- **Backend**: Railway (500 hours/month) - FREE
- **Frontend**: Vercel (100GB bandwidth) - FREE
- **Total Monthly Cost**: $0 🎉

## Scaling Options

When you outgrow free tiers:
- **Database**: Upgrade to paid plans ($10-20/month)
- **Backend**: Railway Pro ($5/month), Render ($7/month)
- **Frontend**: Vercel Pro ($20/month), Netlify Pro ($19/month)

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check CORS configuration