#!/bin/bash

echo "🚀 SuccessBridge Quick Deployment Script"
echo "========================================"

# Check if required tools are installed
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

echo "📦 Installing deployment tools..."

# Install Vercel CLI
npm install -g vercel

# Install Railway CLI
npm install -g @railway/cli

echo "🏗️  Building frontend..."
cd Client
npm install
npm run build

echo "✅ Frontend built successfully!"

echo "🚀 Deploying frontend to Vercel..."
vercel --prod

echo "🏗️  Preparing backend..."
cd ../Server
npm install
npm run build

echo "🚀 Deploying backend to Railway..."
railway login
railway init
railway up

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Railway dashboard"
echo "2. Update VITE_API_URL in Client/.env.production"
echo "3. Redeploy frontend with updated API URL"
echo ""
echo "🎉 Your SuccessBridge app should be live!"