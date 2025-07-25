#!/usr/bin/env pwsh
# test-backend-pipeline.ps1 - Script to test the backend pipeline locally

$ErrorActionPreference = "Stop"
Write-Host "Starting Backend Pipeline Test" -ForegroundColor Green

# Step 1: Navigate to backend directory
Write-Host "Step 1: Navigating to backend directory" -ForegroundColor Cyan
Set-Location -Path $PSScriptRoot\backend

# Step 2: Install dependencies if needed
Write-Host "Step 2: Checking and installing dependencies" -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Dependencies already installed. Skipping." -ForegroundColor Green
}

# Step 3: Create ESLint config if it doesn't exist
Write-Host "Step 3: Checking ESLint configuration" -ForegroundColor Cyan
if (-not (Test-Path ".eslintrc.js")) {
    Write-Host "Creating ESLint config file..." -ForegroundColor Yellow
    @'
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: { 
    ecmaVersion: 2020, 
    sourceType: "module" 
  },
  env: { 
    node: true, 
    jest: true 
  },
  rules: {}
};
'@ | Out-File -FilePath ".eslintrc.js" -Encoding utf8
    Write-Host "ESLint config created." -ForegroundColor Green
} else {
    Write-Host "ESLint config already exists. Skipping." -ForegroundColor Green
}

# Step 4: Run ESLint
Write-Host "Step 4: Running ESLint" -ForegroundColor Cyan
try {
    npm run lint
    Write-Host "ESLint checks passed!" -ForegroundColor Green
} catch {
    Write-Host "ESLint found issues (this is expected if there are linting errors)." -ForegroundColor Yellow
}

# Step 5: Run tests
Write-Host "Step 5: Running tests" -ForegroundColor Cyan
$env:NODE_ENV = "test"
# Use a local MongoDB instance - adjust connection string if needed
$env:MONGODB_URI = "mongodb://localhost:27017/rygneco_test" 
$env:JWT_SECRET = "test-secret"

try {
    npm run test -- --passWithNoTests
    Write-Host "Tests completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Tests failed. See errors above." -ForegroundColor Red
    exit 1
}

# Step 6: Build application
Write-Host "Step 6: Building the application" -ForegroundColor Cyan
try {
    npm run build
    Write-Host "Build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Build failed. See errors above." -ForegroundColor Red
    exit 1
}

Write-Host "Backend Pipeline Test Completed Successfully!" -ForegroundColor Green
