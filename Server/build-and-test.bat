@echo off
echo ========================================
echo Building Server with Profile Enforcement
echo ========================================
echo.

echo Cleaning old build...
if exist dist rmdir /s /q dist
echo.

echo Compiling TypeScript...
call npx tsc

if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed! Check errors above.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ Build Successful!
echo ========================================
echo.
echo The profile enforcement is now compiled.
echo.
echo Next steps:
echo 1. Make sure ENABLE_TELEGRAM_BOT=true in .env
echo 2. Run: npm start
echo 3. Test with /start in Telegram
echo.
pause
