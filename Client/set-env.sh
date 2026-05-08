#!/bin/bash
# Set environment variables for Cloudflare build
export VITE_API_URL="https://successbridge-tolesa-api.onrender.com/api"
export VITE_APP_NAME="SuccessBridge"
export VITE_APP_VERSION="1.0.0"
export VITE_SUPABASE_URL="https://oxnntnvtkngfoorkleay.supabase.co"
export VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94bm50bnZ0a25nZm9vcmtsZWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzU5NzQsImV4cCI6MjA1MjI1MTk3NH0.sb_publishable_7cmmPTJwl0Nj7-nQWpWrvA_YgvBKTum"

# Run the build
npm run build
