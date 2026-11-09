@echo off
echo ========================================
echo Rebuilding and Restarting Telegram Bot
echo ========================================
echo.

echo Step 1: Building TypeScript...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo Step 2: Starting server...
echo.
echo Press Ctrl+C to stop the server when needed
echo.

call npm start

pause
