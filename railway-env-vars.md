# Railway Environment Variables

Copy these environment variables to your Railway project dashboard:

```
DATABASE_URL=postgresql://postgres:702512@Tol_Database@db.oxnntnvtkngfoorkleay.supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-for-production-use
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://successbridge.vercel.app
SUPABASE_URL=https://oxnntnvtkngfoorkleay.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94bm50bnZ0a25nZm9vcmtsZWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU5NzQsImV4cCI6MjA1MjI1MTk3NH0.sb_publishable_7cmmPTJwl0Nj7-nQWpWrvA_YgvBKTum
SUPABASE_SERVICE_KEY=sb_secret_BnVbahCrOQufviYpHZewjw_6p9ykmQl
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

## Instructions:

1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "Deploy from GitHub repo"
4. Select your SuccessBridge repository
5. Set root directory to `Server`
6. Go to Variables tab and add all the above environment variables
7. Deploy!

## Important Notes:

- Replace the JWT_SECRET with a strong 32+ character secret
- The FRONTEND_URL will be updated after you deploy to Vercel
- All Supabase credentials are now configured