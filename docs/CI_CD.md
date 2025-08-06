# CI/CD Pipeline Documentation

## Overview

The Rygneco E-Waste Tracker uses GitHub Actions for continuous integration and deployment. The pipeline includes:

1. **Backend Pipeline**: Tests and builds the backend application
2. **Frontend Pipeline**: Tests and builds the frontend application
3. **Security & Quality Checks**: Scans for vulnerabilities and code quality issues
4. **Build & Package**: Builds and pushes Docker images
5. **Backend Deployment**: Deploys to Render
6. **Frontend Deployment**: Deploys to Vercel

## Required GitHub Secrets

To ensure the CI/CD pipeline works correctly, the following secrets must be configured in the GitHub repository settings:

### Docker Configuration
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password or token

### Backend Deployment (Render)
- `RENDER_DEPLOY_HOOK_URL`: Webhook URL provided by Render to trigger deployments
- `RENDER_BACKEND_URL`: The URL of the backend service on Render

### Frontend Deployment (Vercel)
- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_PROJECT_ID`: ID of the Vercel project
- `VERCEL_ORG_ID`: ID of the Vercel organization
- `VERCEL_DEPLOYMENT_URL`: URL of the deployed frontend application

### Security Scanning
- `SNYK_TOKEN`: API token for Snyk vulnerability scanner
- `SEMGREP_APP_TOKEN`: API token for Semgrep static analysis tool (optional)

## Setting Up the Secrets

1. Navigate to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add each of the secrets listed above

## Workflow Execution

- The backend and frontend pipelines run on code changes in their respective directories
- The security and quality checks run on all pushes to main and develop branches
- The build & package workflow runs on pushes to the main branch
- Deployment workflows are triggered after successful completion of the build & package workflow
