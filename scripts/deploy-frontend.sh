#!/bin/bash
# Script to deploy frontend to Vercel

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check for required environment variables
if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "Error: VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID must be set"
    exit 1
fi

# Navigate to project root
cd "$(dirname "$0")/.."

# Verify frontend dist directory exists
if [ ! -d "frontend/dist" ] || [ ! -f "frontend/dist/index.html" ]; then
    echo "Frontend dist directory is missing or incomplete. Building frontend..."
    cd frontend
    npm install
    npm run build
    cd ..
fi

echo "Verifying frontend build output..."
ls -la frontend/dist

# Pull vercel environment variables
echo "Pulling Vercel environment information..."
vercel pull --yes --environment=production --token="$VERCEL_TOKEN"

# Build project
echo "Building project with vercel..."
vercel build --prod --token="$VERCEL_TOKEN"

# Deploy to Vercel
echo "Deploying to Vercel..."
DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod --token="$VERCEL_TOKEN")

# Output deployment URL
echo "Deployment URL: $DEPLOYMENT_URL"

# Health check
echo "Running health check..."
max_attempts=5
attempt=1

until curl -sf "$DEPLOYMENT_URL" > /dev/null; do
    if [ $attempt -eq $max_attempts ]; then
        echo "Health check failed after $max_attempts attempts"
        exit 1
    fi
    echo "Attempt $attempt failed, waiting 15 seconds..."
    sleep 15
    ((attempt++))
done

echo "Health check passed!"
echo "Frontend deployment completed successfully!"
