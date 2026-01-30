@echo off
echo ========================================
echo   وەرگێڕ Vercel Deployment Script
echo ========================================
echo.

cd frontend

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo [3/5] Testing build locally...
echo You can test with: npm start
echo.

echo [4/5] Ready to deploy!
echo.
echo Choose deployment option:
echo 1. Deploy to preview (testing)
echo 2. Deploy to production
echo 3. Skip deployment
echo.

set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Deploying to preview...
    call vercel
) else if "%choice%"=="2" (
    echo.
    echo Deploying to production...
    call vercel --prod
) else (
    echo.
    echo Deployment skipped.
    echo To deploy manually, run:
    echo   cd frontend
    echo   vercel --prod
)

echo.
echo [5/5] Done!
echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Test your deployment URL
echo 2. Add custom domain (optional)
echo 3. Enable analytics in Vercel dashboard
echo.
pause
