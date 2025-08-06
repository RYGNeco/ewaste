# 🔐 Google OAuth & Two-Factor Authentication Implementation Guide

## 📋 Overview

This guide provides step-by-step instructions to set up Google OAuth and Two-Factor Authentication (2FA) for the Rygneco E-Waste Tracker application.

## 🛠️ Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- MongoDB running (local or Atlas)
- A Google Cloud Console account
- A Gmail account (for email notifications)

## 🔧 Setup Instructions

### Step 1: Install Dependencies

Navigate to the backend directory and install the new dependencies:

```bash
cd backend
npm install speakeasy otplib nodemailer
npm install --save-dev @types/speakeasy @types/nodemailer
```

### Step 2: Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable APIs**:
   - Go to "APIs & Services" → "Library"
   - Enable "Google+ API" or "Google Identity API"
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (development)
     - `https://yourdomain.com/api/auth/google/callback` (production)
   - Note down the **Client ID** and **Client Secret**

### Step 3: Firebase Setup

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Create a new project** or use existing Google Cloud project
3. **Enable Authentication**:
   - Go to "Authentication" → "Sign-in method"
   - Enable "Google" provider
   - Add your domain to authorized domains
4. **Get Firebase Config**:
   - Go to Project Settings → General
   - Add a web app if you haven't already
   - Copy the Firebase configuration
5. **Create Service Account**:
   - Go to Project Settings → Service Accounts
   - Generate new private key
   - Download the JSON file
   - Save it as `backend/firebase-service-account.json`

### Step 4: Email Configuration (Gmail)

1. **Enable 2-Step Verification** on your Gmail account
2. **Create App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Note down the generated password

### Step 5: Environment Configuration

#### Backend Environment (`backend/.env`)

```bash
# Copy from .env.example and update these values:

# Google OAuth
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-16-character-app-password-here
SMTP_FROM=your-gmail-address@gmail.com
APP_NAME=Rygneco E-Waste Tracker

# Other required variables
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rygneco
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

#### Frontend Environment (`frontend/.env`)

```bash
# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-firebase-app-id

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### Step 6: Initialize Email Service

The email service needs to be initialized in your server startup. This is already handled in the implementation, but ensure your SMTP settings are correct.

### Step 7: Database Migration

The User model has been updated with 2FA fields. Existing users will automatically get the new fields with default values when they next log in.

### Step 8: Start the Application

```bash
# Start backend (in backend directory)
npm run dev

# Start frontend (in frontend directory)
npm run dev
```

## 🔒 Security Features Implemented

### Two-Factor Authentication (TOTP)
- ✅ QR Code generation for easy setup
- ✅ TOTP verification using authenticator apps
- ✅ Backup codes for account recovery
- ✅ Account lockout after failed attempts
- ✅ Email notifications for security events

### Enhanced Login Flow
- ✅ Google OAuth integration with Firebase
- ✅ 2FA verification step when enabled
- ✅ Account lockout protection
- ✅ Email notifications for logins
- ✅ Backup code support

### Email Notifications
- ✅ 2FA enabled/disabled notifications
- ✅ Backup code usage alerts
- ✅ Account lockout notifications
- ✅ New login notifications

## 📱 User Experience Flow

### First-Time Setup
1. User signs in with Google
2. Completes profile if new user
3. Can optionally enable 2FA in security settings

### Login with 2FA Enabled
1. User signs in with Google
2. System detects 2FA is enabled
3. User enters 6-digit TOTP code or backup code
4. Access granted upon successful verification

### 2FA Management
- Users can enable/disable 2FA in security settings
- Generate new backup codes when needed
- View 2FA status and remaining backup codes

## 🛡️ Security Best Practices Implemented

1. **Rate Limiting**: Account lockout after 5 failed attempts
2. **Secure Storage**: Backup codes are hashed before storage
3. **Email Notifications**: All security events are logged and notified
4. **Token Management**: Separate JWT tokens for different authentication states
5. **Input Validation**: All inputs are validated and sanitized
6. **HTTPS Required**: Production setup should use HTTPS only

## 🚀 Testing the Implementation

### Testing 2FA Setup
1. Log in to the application
2. Go to Security Settings
3. Click "Enable 2FA"
4. Scan QR code with Google Authenticator or Authy
5. Enter verification code to confirm setup
6. Save backup codes in a secure location

### Testing 2FA Login
1. Log out of the application
2. Sign in with Google
3. Enter 6-digit code from authenticator app
4. Verify successful login

### Testing Backup Codes
1. During 2FA verification, click "Use backup code instead"
2. Enter one of your backup codes
3. Verify successful login
4. Check email for backup code usage notification

## 🔧 Troubleshooting

### Common Issues

**Google OAuth not working:**
- Verify Client ID and Secret in environment variables
- Check authorized redirect URIs in Google Cloud Console
- Ensure Firebase project is linked to Google Cloud project

**2FA QR code not generating:**
- Verify backend server is running
- Check JWT token is valid
- Ensure user is properly authenticated

**Email notifications not sending:**
- Verify Gmail app password is correct (16 characters, no spaces)
- Check SMTP settings in environment variables
- Ensure 2-step verification is enabled on Gmail account

**Database connection issues:**
- Verify MongoDB is running
- Check MONGODB_URI in environment variables
- Ensure firewall allows MongoDB connections

## 📚 Additional Resources

- [Google OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Google Authenticator](https://support.google.com/accounts/answer/1066447)

## 🎯 Next Steps

After successful setup, consider:
1. Implementing backup authentication methods
2. Adding SMS-based 2FA as an alternative
3. Implementing device trust and remember device options
4. Adding security audit logs
5. Implementing progressive security based on user risk levels

## ⚠️ Important Security Notes

1. **Never commit sensitive data** like private keys or passwords to version control
2. **Use HTTPS in production** to protect authentication flows
3. **Regularly rotate secrets** and app passwords
4. **Monitor failed authentication attempts** for potential security threats
5. **Keep dependencies updated** to patch security vulnerabilities

---

**🔐 Your application now has enterprise-grade authentication and security!**
