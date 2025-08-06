# 🔧 Google Sign-In Troubleshooting Guide

## Current Issue: "Google Sign-In failed. Please try again."

This error typically occurs due to one of these common issues:

## 🔍 Step 1: Check Frontend Firebase Configuration

The frontend Firebase config has been updated. Verify it includes:
- ✅ Firebase Auth import
- ✅ Proper export of auth object
- ✅ All required Firebase config values

## 🔍 Step 2: Check Backend Firebase Admin Setup

**Most Common Issue:** Backend Firebase Admin not properly initialized.

### Check your `.env` file contains:
```bash
FIREBASE_PROJECT_ID=rygneco-f58e7
FIREBASE_API_KEY=AIzaSyA75Olwdvx6F7pwJCuPVBLz7iJtTxWQbJQ
```

### Firebase Service Account Setup (Required)
You need to set up Firebase Admin credentials. Choose one option:

**Option A: Environment Variable (Recommended)**
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key (downloads JSON file)
3. Add to `.env`:
```bash
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"rygneco-f58e7",...}'
```

**Option B: File Path**
1. Save service account JSON file as `backend/firebase-service-account.json`
2. Add to `.env`:
```bash
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json
```

## 🔍 Step 3: Verify Database Connection

Make sure MongoDB Atlas is accessible:
```bash
MONGODB_URI=mongodb+srv://RYGNeco:mongoRGYNeco.!@rygneco.zy8e7bz.mongodb.net/?retryWrites=true&w=majority&appName=RYGNeco
```

## 🔍 Step 4: Check Google OAuth Configuration

Verify in Google Cloud Console:
1. OAuth 2.0 Client ID: `305835480952-c53c5l3ki889vshl3pll0ntk7uk1ov6q.apps.googleusercontent.com`
2. Authorized origins include: `http://localhost:3000`
3. Authorized redirect URIs include: `http://localhost:3000`

## 🔍 Step 5: Debug Steps

1. **Run debug script:**
```bash
cd backend
node debug-auth.js
```

2. **Check browser console** when clicking Google sign-in
3. **Check backend terminal** for error messages
4. **Test API endpoint:** Visit `http://localhost:5000/api/test`

## 🚀 Quick Fix Commands

1. **Start backend:**
```bash
cd backend
npm start
```

2. **Start frontend:**
```bash
cd frontend  
npm run dev
```

3. **Check if servers are running:**
- Backend: http://localhost:5000/api/test
- Frontend: http://localhost:3000

## 📋 Common Error Messages & Solutions

### "Invalid ID token"
- Firebase service account not configured
- Wrong project ID in Firebase config
- Token from wrong Firebase project

### "Account not found" 
- User needs to register first (not sign in)
- Switch to "Sign Up" tab and try Google registration

### "Account pending approval"
- ✅ This is expected! User registered but needs admin approval
- Check email for admin notification

### "Failed to sign in"
- Check browser console for specific error
- Verify Firebase config matches Google OAuth setup
- Ensure both frontend and backend are running

## 🔧 Last Resort: Reset Firebase Setup

If nothing works:
1. Create new Firebase project
2. Update all config files with new project details  
3. Re-setup Google OAuth with new project
4. Update environment variables

## 📞 Need Help?

If you're still seeing "Google Sign-In failed":
1. Run the debug script: `node backend/debug-auth.js`
2. Share the output
3. Check browser console errors
4. Verify all environment variables are set correctly

The most likely issue is missing Firebase service account credentials in the backend.
