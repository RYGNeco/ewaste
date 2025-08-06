@echo off
REM Fix-Merge-Conflicts.bat
REM This script finds and lists all files with merge conflicts

echo Searching for files with merge conflicts...
echo.

cd c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi\

findstr /S /M /C:"<<<<<<< HEAD" /C:"=======" /C:">>>>>>>" *.* > merge_conflicts.txt

if %ERRORLEVEL% EQU 0 (
    echo The following files contain merge conflicts:
    echo.
    type merge_conflicts.txt
    echo.
    echo Please fix these conflicts manually or use a merge tool.
) else (
    echo No merge conflicts found!
)

echo.
echo Done!
