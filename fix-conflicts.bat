@echo off
echo Fixing Git merge conflicts...

REM Navigate to the project directory
cd /d c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi

REM Create a fixed version of index.html without conflict markers
echo Creating fixed index.html...
echo ^<!DOCTYPE html^> > frontend\index.html.fixed
echo ^<html lang="en"^> >> frontend\index.html.fixed
echo   ^<head^> >> frontend\index.html.fixed
echo     ^<meta charset="UTF-8" /^> >> frontend\index.html.fixed
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^> >> frontend\index.html.fixed
echo     ^<meta name="description" content="Rygneco E-Waste Tracker - Professional E-Waste Management System" /^> >> frontend\index.html.fixed
echo     ^<meta name="author" content="Rygneco Team" /^> >> frontend\index.html.fixed
echo     ^<meta name="robots" content="index, follow" /^> >> frontend\index.html.fixed
echo     ^<title^>Rygneco E-Waste Tracker^</title^> >> frontend\index.html.fixed
echo     ^<link rel="icon" type="image/x-icon" href="/favicon.ico" /^> >> frontend\index.html.fixed
echo     ^<script src="https://cdn.tailwindcss.com"^>^</script^> >> frontend\index.html.fixed
echo   ^</head^> >> frontend\index.html.fixed
echo   ^<body^> >> frontend\index.html.fixed
echo     ^<noscript^>You need to enable JavaScript to run this app.^</noscript^> >> frontend\index.html.fixed
echo     ^<div id="root"^> >> frontend\index.html.fixed
echo       ^<p class="text-center text-gray-500 mt-10"^>Loading...^</p^> >> frontend\index.html.fixed
echo     ^</div^> >> frontend\index.html.fixed
echo     ^<script type="module" src="/src/index.tsx" defer^>^</script^> >> frontend\index.html.fixed
echo   ^</body^> >> frontend\index.html.fixed
echo ^</html^> >> frontend\index.html.fixed

REM Replace the original file with the fixed version
copy /y frontend\index.html.fixed frontend\index.html
del frontend\index.html.fixed

REM Add the fixed file to git
git add frontend\index.html

echo Fixed index.html and added to Git.
echo You should now commit these changes with: git commit -m "Fixed merge conflicts"
