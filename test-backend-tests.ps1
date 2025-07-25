#!/usr/bin/env pwsh
# test-backend-tests.ps1 - Script to test only the backend tests

$ErrorActionPreference = "Stop"
Write-Host "Testing Backend Tests" -ForegroundColor Green

# Navigate to backend directory
Set-Location -Path $PSScriptRoot\backend

# Set environment variables for testing
$env:NODE_ENV = "test"
$env:JWT_SECRET = "test-secret"

# Run the tests with --passWithNoTests flag
Write-Host "Running tests with --passWithNoTests flag..." -ForegroundColor Cyan
npm run test

Write-Host "Test completed." -ForegroundColor Green
