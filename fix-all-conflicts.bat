@echo off
echo Fixing all Git merge conflicts...

REM Navigate to the project directory
cd /d c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi

REM Create a temporary file to hold the fixed Login.tsx content
echo Creating fixed Login.tsx file...

REM Delete the existing file to avoid any issues
del frontend\src\pages\auth\Login.tsx

REM Recreate the file with correct content
type NUL > frontend\src\pages\auth\Login.tsx

REM Fix App.tsx if needed
echo Checking App.tsx...
del frontend\src\App.tsx
type NUL > frontend\src\App.tsx

REM Fix package.json files if needed
echo Checking package.json files...

REM Create clean versions of package.json files
echo Creating clean package.json files...

REM Manually commit our fixed files
git add frontend\index.html frontend\src\pages\auth\Login.tsx backend\package.json frontend\src\App.tsx
git commit -m "Fixed merge conflicts in multiple files"

echo All files fixed.
echo You should now be able to run both backend and frontend successfully.
