@echo off
cd ..
echo Staging changes...
git add -A
echo.
echo Committing...
git commit -m "fix: update payment command handlers"
echo.
echo Pushing to GitHub...
git push origin main
echo.
echo Done! Check Render dashboard for deployment.
pause
