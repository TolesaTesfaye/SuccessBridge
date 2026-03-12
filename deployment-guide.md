# 🚀 SuccessBridge Deployment: Vercel + Railway + Supabase

## Stack Overview
- **Frontend**: Vercel (React/Vite)
- **Backend**: Railway (Node.js/Express)  
- **Database**: Supabase (PostgreSQL)

## Step 1: Database Setup (Supabase)

### 1.1 Create Supabase Project
```bash
# 1. Go to https://supabase.com
# 2. Sign up/Login with GitHub
# 3. Click "New Project"
# 4. Organization: Your personal org
# 5. Project name: successbridge
# 6. Database password: Create a strong password
# 7. Region: Choose closest to your users
# 8. Click "Create new project"
```

### 1.2 Get Database Connection Details
```bash
# In Supabase Dashboard:
# 1. Go to Settings > Database
# 2. Copy the connection string under "Connection string"
# 3. Replace [YOUR-PASSWORD] with your actual password
# 4. Save this - you'll need it for Railway

# Example connection string:
# postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 1.3 Setup Database Schema
```sql
-- You can run these in Supabase SQL Editor
-- Or your backend will create tables automatically with Sequelize
```

## Step 2: Backend Deployment (Railway)

### 2.1 Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2.2 Prepare Backend
```bash
# Navigate to Server directory
cd Server

# Install dependencies
npm install

# Build the project
npm run build
```

### 2.3 Deploy to Railway
```bash
# Login to Railway
railway login

# Initialize Railway project
railway init

# Deploy
railway up
```

### 2.4 Set Environment Variables in Railway
```bash
# Go to Railway dashboard (railway.app)
# Click on your project
# Go to Variables tab
# Add these variables:

DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://successbridge.vercel.app
```

### 2.5 Get Railway Backend URL
```bash
# After deployment, Railway will give you a URL like:
# https://your-app-name.railway.app
# Save this URL - you'll need it for frontend
```

## Step 3: Frontend Deployment (Vercel)

### 3.1 Update Environment Variables
```bash
# Update Client/.env.production
VITE_API_URL=https://your-app-name.railway.app/api
VITE_APP_NAME=SuccessBridge
VITE_APP_VERSION=1.0.0
```

### 3.2 Install Vercel CLI
```bash
npm install -g vercel
```

### 3.3 Deploy Frontend
```bash
# Navigate to Client directory
cd Client

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your personal account
# - Link to existing project? No
# - Project name: successbridge
# - In which directory is your code located? ./
# - Want to override settings? No
```

## Step 4: Configuration Files

### 4.1 Backend Configuration (Server/.env)
```env
# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=production

# CORS
FRONTEND_URL=https://successbridge.vercel.app

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

### 4.2 Frontend Configuration (Client/.env.production)
```env
VITE_API_URL=https://your-railway-app.railway.app/api
VITE_APP_NAME=SuccessBridge
VITE_APP_VERSION=1.0.0
```

## Step 5: Database Migration (Supabase)

### 5.1 Enable Row Level Security (Optional)
```sql
-- In Supabase SQL Editor, run:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
-- Add more tables as needed
```

### 5.2 Create Policies (Optional)
```sql
-- Example policy for users table
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid() = id);
```

## Step 6: Verification & Testing

### 6.1 Test Backend
```bash
# Test your Railway backend
curl https://your-railway-app.railway.app/api/health

# Should return: {"status": "OK", "timestamp": "..."}
```

### 6.2 Test Frontend
```bash
# Visit your Vercel URL
https://successbridge.vercel.app

# Check browser console for any errors
# Test login/registration functionality
```

## Step 7: Custom Domain (Optional)

### 7.1 Frontend Domain (Vercel)
```bash
# In Vercel dashboard:
# 1. Go to your project
# 2. Settings > Domains
# 3. Add your custom domain
# 4. Follow DNS configuration instructions
```

### 7.2 Backend Domain (Railway)
```bash
# In Railway dashboard:
# 1. Go to your project
# 2. Settings > Domains
# 3. Add custom domain
# 4. Update CORS settings in backend
```

## Troubleshooting

### Common Issues:

#### 1. CORS Error
```bash
# Update FRONTEND_URL in Railway environment variables
# Make sure it matches your Vercel domain exactly
```

#### 2. Database Connection Error
```bash
# Check DATABASE_URL format
# Ensure password is correct
# Check Supabase project is active
```

#### 3. Build Failures
```bash
# Check Node.js version compatibility
# Ensure all dependencies are installed
# Check for TypeScript errors
```

#### 4. API Not Responding
```bash
# Check Railway logs: railway logs
# Verify environment variables are set
# Test API endpoints manually
```

## Monitoring & Logs

### Railway Logs
```bash
# View backend logs
railway logs

# Or in Railway dashboard > Deployments > View Logs
```

### Vercel Logs
```bash
# View frontend logs
vercel logs

# Or in Vercel dashboard > Functions > View Logs
```

### Supabase Monitoring
```bash
# In Supabase dashboard:
# - Database > Logs
# - API > Logs
# - Auth > Logs
```

## Free Tier Limits

### Supabase (Free)
- ✅ 500MB database storage
- ✅ 2GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Up to 500MB file storage

### Railway (Free)
- ✅ $5 credit per month
- ✅ 500 hours of usage
- ✅ 1GB RAM, 1 vCPU
- ✅ Custom domains

### Vercel (Free)
- ✅ 100GB bandwidth per month
- ✅ 100 deployments per day
- ✅ Custom domains
- ✅ Automatic HTTPS

## Scaling Up

When you need more resources:

### Supabase Pro ($25/month)
- 8GB database storage
- 250GB bandwidth
- Daily backups

### Railway Pro ($5/month)
- $5 + usage-based pricing
- More resources and priority support

### Vercel Pro ($20/month)
- 1TB bandwidth
- Advanced analytics
- Team collaboration

## Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Database password is secure
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly
- [ ] HTTPS is enabled (automatic with Vercel/Railway)
- [ ] API rate limiting implemented (if needed)

## Final URLs

After deployment, you'll have:
- **Frontend**: https://successbridge.vercel.app
- **Backend**: https://your-app.railway.app
- **Database**: Managed by Supabase

## Support

If you encounter issues:
1. Check the logs in each platform's dashboard
2. Verify all environment variables
3. Test each service independently
4. Check CORS configuration

🎉 **Your SuccessBridge app is now live and free!**