#!/usr/bin/env pwsh
# test-frontend-pipeline.ps1 - Script to test the frontend pipeline locally

$ErrorActionPreference = "Stop"
Write-Host "Starting Frontend Pipeline Test" -ForegroundColor Green

# Step 1: Navigate to frontend directory
Write-Host "Step 1: Navigating to frontend directory" -ForegroundColor Cyan
Set-Location -Path $PSScriptRoot\frontend

# Step 2: Install dependencies if needed
Write-Host "Step 2: Checking and installing dependencies" -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Dependencies already installed. Skipping." -ForegroundColor Green
}

# Step 3: Check ESLint configuration
Write-Host "Step 3: Checking ESLint configuration" -ForegroundColor Cyan
if (-not (Test-Path ".eslintrc.cjs")) {
    Write-Host "Creating ESLint config file..." -ForegroundColor Yellow
    @'
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
};
'@ | Out-File -FilePath ".eslintrc.cjs" -Encoding utf8
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
    Write-Host "ESLint found issues. See errors above." -ForegroundColor Yellow
}

# Step 5: Run Prettier check
Write-Host "Step 5: Running Prettier check" -ForegroundColor Cyan
try {
    npx prettier --check src/
    Write-Host "Prettier checks passed!" -ForegroundColor Green
} catch {
    Write-Host "Formatting issues found. Running Prettier to fix..." -ForegroundColor Yellow
    npx prettier --write src/
}

# Step 6: Run tests
Write-Host "Step 6: Running tests" -ForegroundColor Cyan
try {
    npm run test -- --coverage --watchAll=false
    Write-Host "Tests completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Tests failed. See errors above." -ForegroundColor Red
    exit 1
}

# Step 7: Build application
Write-Host "Step 7: Building the application" -ForegroundColor Cyan
try {
    npm run build
    Write-Host "Build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Build failed. See errors above." -ForegroundColor Red
    exit 1
}

Write-Host "Frontend Pipeline Test Completed Successfully!" -ForegroundColor Green
Write-Host "Build output is available in the dist/ directory." -ForegroundColor Green
