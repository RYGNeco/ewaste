#!/bin/bash
# Script to test Vercel build locally

# Navigate to project root
cd "$(dirname "$0")/.."

# Install dependencies if needed
if [ "$1" == "--install" ]; then
    echo "Installing dependencies..."
    npm install
    cd frontend && npm install && cd ..
fi

# Build frontend
echo "Building frontend..."
cd frontend && npm run build

# Check if the build was successful
if [ $? -eq 0 ] && [ -d "dist" ]; then
    echo "✅ Build successful! Output directory: $(pwd)/dist"
    echo "Files in dist directory:"
    ls -la dist
else
    echo "❌ Build failed or dist directory not found"
    exit 1
fi

echo "Verifying index.html exists..."
if [ -f "dist/index.html" ]; then
    echo "✅ index.html exists"
else
    echo "❌ index.html not found in dist directory"
    exit 1
fi
