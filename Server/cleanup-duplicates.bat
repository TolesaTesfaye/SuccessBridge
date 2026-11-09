@echo off
echo ========================================
echo Remove Duplicate Subjects
echo ========================================
echo.
echo This will remove duplicate subjects from the database.
echo Only the first occurrence of each subject will be kept.
echo.
pause
echo.

cd /d "%~dp0"
call npx tsx src/scripts/removeDuplicateSubjects.ts

echo.
echo ========================================
echo Done!
echo ========================================
pause
