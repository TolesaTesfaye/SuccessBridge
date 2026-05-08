#!/bin/bash

# Deploy Frontend to Cloudflare Pages
# Run this script to manually deploy the latest changes

echo "🚀 Deploying SuccessBridge Frontend to Cloudflare Pages..."

# Navigate to Client directory
cd Client

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "☁️ Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=successbridge-client

echo "✅ Deployment complete!"
echo "🌐 Your site should be live in a few moments"
