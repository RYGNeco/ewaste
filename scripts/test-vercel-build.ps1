# Script to test Vercel build locally

# Navigate to project root (assuming script is in scripts folder)
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Join-Path $scriptDir ".."
Set-Location $projectRoot

# Install dependencies if needed
if ($args[0] -eq "--install") {
    Write-Host "Installing dependencies..."
    npm install
    Set-Location frontend
    npm install
    Set-Location ..
}

# Build frontend
Write-Host "Building frontend..."
Set-Location frontend
npm run build

# Check if the build was successful
if ($LASTEXITCODE -eq 0 -and (Test-Path "dist")) {
    Write-Host "✅ Build successful! Output directory: $(Get-Location)\dist"
    Write-Host "Files in dist directory:"
    Get-ChildItem -Path "dist" | Format-Table Name, Length, LastWriteTime
} else {
    Write-Host "❌ Build failed or dist directory not found"
    exit 1
}

Write-Host "Verifying index.html exists..."
if (Test-Path "dist\index.html") {
    Write-Host "✅ index.html exists"
} else {
    Write-Host "❌ index.html not found in dist directory"
    exit 1
}
