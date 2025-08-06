@echo off
echo Resolving git merge conflicts...

cd /d c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi

echo Fixing index.html...
type NUL > frontend\index.html.fixed
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo     ^<meta name="description" content="Rygneco E-Waste Tracker - Professional E-Waste Management System" /^>
echo     ^<meta name="author" content="Rygneco Team" /^>
echo     ^<meta name="robots" content="index, follow" /^>
echo     ^<title^>Rygneco E-Waste Tracker^</title^>
echo     ^<link rel="icon" type="image/x-icon" href="/favicon.ico" /^>
echo     ^<script src="https://cdn.tailwindcss.com"^>^</script^>
echo   ^</head^>
echo   ^<body^>
echo     ^<noscript^>You need to enable JavaScript to run this app.^</noscript^>
echo     ^<div id="root"^>
echo       ^<p class="text-center text-gray-500 mt-10"^>Loading...^</p^>
echo     ^</div^>
echo     ^<script type="module" src="/src/index.tsx" defer^>^</script^>
echo   ^</body^>
echo ^</html^>
) > frontend\index.html.fixed

move /y frontend\index.html.fixed frontend\index.html

echo Fixed index.html
echo Now trying to fix Login.tsx...

echo Done. Please check the files manually to ensure they were fixed correctly.
