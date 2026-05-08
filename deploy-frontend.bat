@echo off
REM Deploy Frontend to Cloudflare Pages (Windows)
REM Run this script to manually deploy the latest changes

echo 🚀 Deploying SuccessBridge Frontend to Cloudflare Pages...

REM Navigate to Client directory
cd Client

echo 📦 Installing dependencies...
call npm install

echo 🔨 Building project...
call npm run build

echo ☁️ Deploying to Cloudflare Pages...
call npx wrangler pages deploy dist --project-name=successbridge-client

echo ✅ Deployment complete!
echo 🌐 Your site should be live in a few moments

cd ..
pause
