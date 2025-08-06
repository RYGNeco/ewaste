# Firebase Authorized Domains Setup Guide

## Problem
The Firebase authorized domain `https://rygneco-ewaste-tracker.vercel.app` gets deleted from Firebase Authentication settings whenever you push to main or update your CI/CD pipeline.

## Root Causes
1. No Firebase configuration file (`firebase.json`) to preserve settings
2. CI/CD pipeline doesn't manage Firebase authorized domains
3. Manual domain management in Firebase Console gets reset

## Solutions Implemented

### 1. Firebase Configuration Files
- **`firebase.json`**: Contains authorized domains configuration
- **`.firebaserc`**: Links to the correct Firebase project

### 2. CI/CD Integration
The GitHub Actions workflow now includes:
- Firebase CLI setup
- Automatic domain management via Firebase Admin SDK
- Domain verification and restoration

### 3. Domain Management Script
- **`scripts/manage-firebase-domains.js`**: Programmatically manages authorized domains

## Setup Instructions

### Step 1: Generate Firebase Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rygneco-f58e7`
3. Go to Project Settings → Service Accounts
4. Click "Generate new private key"
5. Download the JSON file

### Step 2: Add GitHub Secret
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Create a new secret named `FIREBASE_SERVICE_ACCOUNT_KEY`
4. Paste the entire content of the service account JSON file

### Step 3: Verify Configuration
The following domains are now automatically managed:
- `rygneco-ewaste-tracker.vercel.app` (Vercel production)
- `rygneco-f58e7.firebaseapp.com` (Firebase hosting)
- `localhost` (development)

## Manual Verification
To manually verify the setup:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Check current authorized domains
firebase auth:export auth-config.json
cat auth-config.json | grep authorizedDomains
```

## Troubleshooting

### If domains still get deleted:
1. Check if the `FIREBASE_SERVICE_ACCOUNT_KEY` secret is properly set
2. Verify the service account has the necessary permissions
3. Check the GitHub Actions logs for any errors

### Required Firebase Permissions:
The service account needs these roles:
- Firebase Authentication Admin
- Firebase Hosting Admin

### Alternative Manual Fix:
If the automated process fails, you can manually add the domain:
1. Go to Firebase Console → Authentication → Settings
2. Add `rygneco-ewaste-tracker.vercel.app` to authorized domains
3. Save the changes

## Files Created/Modified
- `firebase.json` - Firebase configuration
- `.firebaserc` - Project linking
- `scripts/manage-firebase-domains.js` - Domain management script
- `.github/workflows/deploy-frontend.yml` - Updated CI/CD pipeline
- `package.json` - Added Firebase Admin SDK dependency 