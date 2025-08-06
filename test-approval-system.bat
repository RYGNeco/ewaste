@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting E-Waste Account Approval System Test
echo ==================================================
echo.

REM Check if backend is running
echo 1. Checking backend server...
curl -s http://localhost:5000/api/auth/health >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ Backend server is running
) else (
    echo ❌ Backend server is not running on port 5000
    echo Please start the backend server first:
    echo cd backend ^&^& npm run dev
    pause
    exit /b 1
)

REM Check if frontend is running
echo 2. Checking frontend server...
curl -s http://localhost:5173 >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ Frontend server is running
) else (
    echo ❌ Frontend server is not running on port 5173
    echo Please start the frontend server:
    echo cd frontend ^&^& npm run dev
    pause
    exit /b 1
)

echo 3. Testing API endpoints...

REM Test auth status endpoint
echo Testing /api/auth/approval-status endpoint...
for /f %%i in ('curl -s -o nul -w "%%{http_code}" http://localhost:5000/api/auth/approval-status') do set response=%%i
if "!response!" equ "401" (
    echo ✅ Auth endpoint working ^(401 expected without token^)
) else (
    echo ❌ Auth endpoint returned: !response!
)

REM Test manual registration endpoint
echo Testing /api/auth/manual-register endpoint...
set "test_user={\"firstName\": \"Test\", \"lastName\": \"User\", \"email\": \"test@example.com\", \"password\": \"TestPassword123!\", \"userType\": \"individual\", \"role\": \"individual_user\"}"

for /f %%i in ('curl -s -X POST -H "Content-Type: application/json" -d "!test_user!" -o nul -w "%%{http_code}" http://localhost:5000/api/auth/manual-register') do set response=%%i

if "!response!" equ "201" (
    echo ✅ Manual registration endpoint working
) else if "!response!" equ "400" (
    echo ✅ Manual registration endpoint working ^(400 expected for duplicate/invalid data^)
) else (
    echo ❌ Manual registration endpoint returned: !response!
)

echo.
echo 🎉 Test completed!
echo.
echo 📝 Next steps:
echo 1. Open http://localhost:5173/auth/new-login to test new registration
echo 2. Register a new account and check email notifications
echo 3. Login as super admin to approve/reject accounts
echo 4. Test the complete approval workflow
echo.
echo 💡 Tip: Check the backend logs for email notifications and approval status updates
echo.
pause
