# 🔐 Google OAuth & Two-Factor Authentication Implementation Documentation

## 📋 Project Overview

**Project Name:** Rygneco E-Waste Tracker  
**Implementation Date:** August 4, 2025  
**Version:** 1.0.0  
**Security Level:** Enterprise-Grade  

This document provides comprehensive documentation for the Google OAuth and Two-Factor Authentication (2FA) implementation in the Rygneco E-Waste Tracker application, a modern web-based e-waste management system built with React, TypeScript, Node.js, and MongoDB.

---

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose
- **Authentication:** Firebase Auth, Google OAuth 2.0, JWT
- **2FA:** TOTP (Time-based One-Time Password), QR Codes
- **Email:** Nodemailer with Gmail SMTP
- **Security:** bcrypt, helmet, CORS, rate limiting

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   React App     │◄──►│   Express API   │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • Login UI      │    │ • Auth Routes   │    │ • Google OAuth  │
│ • 2FA Setup     │    │ • 2FA Service   │    │ • Firebase      │
│ • Security Page │    │ • Email Service │    │ • Gmail SMTP    │
│ • QR Scanner    │    │ • JWT Tokens    │    │ • MongoDB       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🔒 Security Features Implemented

### 1. Google OAuth Integration
- **Firebase Authentication** for secure Google sign-in
- **ID Token Verification** on backend
- **Seamless User Experience** with popup-based authentication
- **Automatic Account Creation** for new users
- **Profile Synchronization** with Google account data

### 2. Two-Factor Authentication (2FA)
- **TOTP-based Authentication** using industry-standard algorithms
- **QR Code Generation** for easy authenticator app setup
- **Backup Codes** for account recovery (10 single-use codes)
- **Compatible** with Google Authenticator, Authy, Microsoft Authenticator
- **Optional Setup** - users can enable/disable as needed

### 3. Account Security
- **Account Lockout Protection** - 5 failed attempts = 30-minute lockout
- **Login Attempt Tracking** with automatic reset on success
- **Email Notifications** for all security events
- **Secure Storage** with hashed backup codes
- **Rate Limiting** to prevent brute force attacks

### 4. Email Security Notifications
- **2FA Enabled/Disabled** notifications
- **Backup Code Usage** alerts
- **Account Lockout** notifications
- **New Login Detection** with IP and device info
- **Suspicious Activity** alerts

---

## 📁 File Structure & Implementation

### Backend Implementation

#### Models
```
backend/src/models/
├── User.ts                 # Enhanced user model with 2FA fields
├── RoleRequest.ts         # Role approval system
├── Partner.ts             # Partner organization data
└── Log.ts                 # System audit logging
```

#### Services
```
backend/src/services/
├── twoFactorService.ts    # Core 2FA functionality
└── emailService.ts        # Email notifications system
```

#### Controllers
```
backend/src/controllers/
├── authController.ts      # Enhanced auth with 2FA integration
└── twoFactorController.ts # 2FA management endpoints
```

#### Routes
```
backend/src/routes/
├── auth.ts               # Authentication routes
└── twoFactor.ts          # 2FA-specific routes
```

#### Middleware
```
backend/src/middleware/
├── auth.ts               # JWT authentication middleware
└── roleCheck.ts          # Role-based access control
```

### Frontend Implementation

#### Components
```
frontend/src/components/auth/twoFactor/
├── Setup2FA.tsx          # 2FA setup wizard with QR code
├── Verify2FA.tsx         # 2FA verification during login
└── TwoFactorSettings.tsx # 2FA management interface
```

#### Pages
```
frontend/src/pages/auth/
├── Login.tsx             # Enhanced login with 2FA flow
├── TwoFactorPage.tsx     # Dedicated 2FA verification page
└── SecurityPage.tsx      # Security settings dashboard
```

---

## 🔧 Technical Implementation Details

### Database Schema

#### Enhanced User Model
```typescript
interface IUser extends Document {
  // Basic fields
  googleId?: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType?: 'employee' | 'partner' | 'super_admin';
  role?: string;
  
  // 2FA fields
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  twoFactorBackupCodes: string[];
  
  // Security fields
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
}
```

### API Endpoints

#### Authentication Endpoints
```
POST /api/auth/google-signin          # Google OAuth login
POST /api/auth/complete-2fa-login     # Complete 2FA verification
GET  /api/auth/me                     # Get current user
POST /api/auth/logout                 # Logout user
```

#### 2FA Management Endpoints
```
GET  /api/2fa/status                  # Get 2FA status
POST /api/2fa/setup                   # Get QR code for setup
POST /api/2fa/enable                  # Enable 2FA with verification
POST /api/2fa/disable                 # Disable 2FA
POST /api/2fa/verify                  # Verify 2FA token
POST /api/2fa/backup-codes            # Generate new backup codes
```

### Security Implementation

#### TOTP Algorithm
```typescript
// Uses industry-standard TOTP (RFC 6238)
// 6-digit codes, 30-second validity window
// SHA-1 algorithm with Base32 encoding
const token = authenticator.generate(secret);
const isValid = authenticator.verify({ token, secret, window: 2 });
```

#### Backup Code System
```typescript
// 10 codes, 8 characters each, formatted as XXXX-XXXX
// Hashed with SHA-256 before storage
// Single-use with automatic removal after verification
const codes = generateBackupCodes(); // Returns 10 codes
const hashedCodes = codes.map(code => crypto.createHash('sha256').update(code).digest('hex'));
```

#### Account Lockout Logic
```typescript
// Progressive lockout system
// 5 failed attempts = 30-minute lockout
// Automatic unlock after timeout
// Email notification on lockout
if (user.loginAttempts >= 5) {
  user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
}
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google Cloud Console account
- Gmail account with app password
- Firebase project

### Step-by-Step Setup

#### 1. Install Dependencies
```bash
# Backend
cd backend
npm install speakeasy otplib nodemailer
npm install --save-dev @types/speakeasy @types/nodemailer

# Frontend (already includes qrcode.react)
cd frontend
npm install
```

#### 2. Google Cloud Console Configuration
1. Create new project or select existing
2. Enable Google+ API or Google Identity API
3. Create OAuth 2.0 Client ID credentials
4. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - Production domain callback URL
5. Note Client ID and Client Secret

#### 3. Firebase Console Setup
1. Create Firebase project (can link to Google Cloud project)
2. Enable Authentication → Google provider
3. Get Firebase configuration from Project Settings
4. Create service account and download JSON
5. Save as `backend/firebase-service-account.json`

#### 4. Gmail Configuration
1. Enable 2-Step Verification on Gmail account
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Create password for "Mail"
   - Note the 16-character password

#### 5. Environment Configuration

**Backend `.env`:**
```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=your-gmail@gmail.com

# Database & JWT
MONGODB_URI=mongodb://localhost:27017/rygneco
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

**Frontend `.env`:**
```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-firebase-app-id

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

#### 6. Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 7. Test Implementation
```bash
# Run 2FA functionality test
cd backend
npm run test-2fa
```

---

## 📱 User Experience Flows

### New User Registration Flow
```
1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. User authenticates with Google
4. System creates new user account
5. User redirected to profile completion
6. User selects account type (employee/partner)
7. Profile completion and role assignment
8. Optional 2FA setup in security settings
```

### Existing User Login Flow
```
1. User clicks "Sign in with Google"
2. Google OAuth authentication
3. System checks if 2FA is enabled
   ├─ If 2FA disabled: Direct login success
   └─ If 2FA enabled: Redirect to 2FA verification
4. User enters 6-digit TOTP code or backup code
5. System verifies code
6. Login success, redirect to dashboard
```

### 2FA Setup Flow
```
1. User navigates to Security Settings
2. Clicks "Enable 2FA"
3. System generates secret and QR code
4. User scans QR code with authenticator app
5. User enters verification code
6. System validates code
7. 2FA enabled, backup codes generated
8. User downloads backup codes
```

### Account Recovery Flow
```
1. User loses authenticator device
2. During login, clicks "Use backup code instead"
3. User enters one of their backup codes
4. System validates and removes used code
5. Email notification sent about backup code usage
6. User can generate new backup codes in settings
```

---

## 🛡️ Security Considerations

### Data Protection
- **Encryption at Rest:** All sensitive data encrypted in MongoDB
- **Encryption in Transit:** HTTPS for all communications
- **Hashed Storage:** Backup codes stored as SHA-256 hashes
- **No Plaintext Secrets:** 2FA secrets encrypted in database
- **Secure Headers:** Helmet.js for security headers

### Authentication Security
- **JWT Tokens:** Short-lived tokens with secure signing
- **Token Validation:** All requests validate JWT signature
- **Session Management:** Stateless authentication system
- **CSRF Protection:** SameSite cookies and CORS configuration
- **Rate Limiting:** API rate limiting to prevent abuse

### 2FA Security
- **TOTP Standard:** RFC 6238 compliant implementation
- **Time Synchronization:** 30-second time windows with drift tolerance
- **Secret Generation:** Cryptographically secure random secrets
- **QR Code Security:** Temporary QR codes, not stored permanently
- **Backup Security:** Single-use codes with automatic cleanup

### Email Security
- **App Passwords:** Using Gmail app passwords, not account passwords
- **Template Security:** HTML email templates with XSS protection
- **Delivery Reliability:** Proper error handling and retry logic
- **Privacy Protection:** No sensitive data in email content
- **Audit Trail:** Email sending logged for security audits

---

## 🔍 Testing & Validation

### Automated Testing
```bash
# Test 2FA functionality
npm run test-2fa

# Test database connection
npm run verify-mongodb

# Test Google authentication
npm run test-google-auth

# Run full test suite
npm test
```

### Manual Testing Checklist

#### Google OAuth Testing
- [ ] Google sign-in popup appears
- [ ] User can authenticate with Google account
- [ ] New users are created automatically
- [ ] Existing users are recognized
- [ ] Profile data synced from Google
- [ ] Error handling for OAuth failures

#### 2FA Setup Testing
- [ ] QR code generates successfully
- [ ] Authenticator apps can scan QR code
- [ ] Verification code validation works
- [ ] 2FA enables after successful verification
- [ ] Backup codes are generated and downloadable
- [ ] Email notification sent on 2FA enable

#### 2FA Login Testing
- [ ] 2FA verification page appears for enabled users
- [ ] TOTP codes from authenticator apps work
- [ ] Backup codes work for recovery
- [ ] Invalid codes are rejected
- [ ] Account locks after 5 failed attempts
- [ ] Email notifications sent for security events

#### Account Security Testing
- [ ] Account lockout works after failed attempts
- [ ] Lockout automatically expires after 30 minutes
- [ ] Email notifications sent for lockouts
- [ ] Backup code usage removes codes from database
- [ ] New backup codes can be generated
- [ ] 2FA can be disabled with password confirmation

---

## 📊 Monitoring & Analytics

### Security Metrics to Monitor
- **Login Success/Failure Rates**
- **2FA Adoption Rate** (percentage of users with 2FA enabled)
- **Account Lockout Frequency**
- **Backup Code Usage Patterns**
- **Email Notification Delivery Rates**
- **Failed Authentication Attempts by IP**

### Logging Implementation
```typescript
// Security event logging
console.log('✅ 2FA enabled for user:', user.email);
console.log('⚠️ Account locked for user:', user.email);
console.log('🔑 Backup code used by user:', user.email);
console.log('🚫 Invalid 2FA attempt for user:', user.email);
```

### Error Tracking
- **Authentication Failures** logged with context
- **2FA Setup Errors** tracked and reported
- **Email Delivery Failures** monitored
- **Database Connection Issues** alerted
- **API Rate Limit Violations** logged

---

## 🚀 Production Deployment

### Environment Requirements
- **HTTPS Required** for all production deployments
- **MongoDB Atlas** recommended for production database
- **Firebase Project** configured for production domain
- **Gmail Business Account** for reliable email delivery
- **Load Balancer** for high availability
- **CDN** for static asset delivery

### Security Configuration
```bash
# Production environment variables
NODE_ENV=production
PORT=443
HTTPS=true
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rygneco
JWT_SECRET=extremely-long-random-secret-for-production
CORS_ORIGIN=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com
```

### Deployment Checklist
- [ ] HTTPS certificates installed and configured
- [ ] Environment variables set for production
- [ ] Firebase authorized domains updated
- [ ] Google OAuth redirect URIs updated
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Email service configured with production credentials
- [ ] Monitoring and alerting systems activated
- [ ] Backup and disaster recovery plans tested

---

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### Google OAuth Issues
**Problem:** "OAuth error: invalid_client"
**Solution:** 
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env
- Check authorized redirect URIs in Google Cloud Console
- Ensure Firebase project is properly linked

**Problem:** "Firebase authentication failed"
**Solution:**
- Verify firebase-service-account.json file exists
- Check FIREBASE_PROJECT_ID matches your project
- Ensure Firebase Authentication is enabled

#### 2FA Issues
**Problem:** QR code not generating
**Solution:**
- Check if user is properly authenticated
- Verify 2FA service is initialized correctly
- Check server logs for any errors

**Problem:** "Invalid verification code"
**Solution:**
- Ensure device time is synchronized
- Check if authenticator app is using correct secret
- Verify TOTP algorithm settings (6 digits, 30 seconds)

#### Email Issues
**Problem:** Email notifications not sending
**Solution:**
- Verify Gmail app password (16 characters, no spaces)
- Check SMTP settings in environment variables
- Ensure 2-step verification is enabled on Gmail
- Test SMTP connection manually

#### Database Issues
**Problem:** MongoDB connection failures
**Solution:**
- Verify MONGODB_URI connection string
- Check MongoDB service is running
- Verify network connectivity and firewall settings
- Test connection with MongoDB Compass

---

## 📚 Additional Resources

### Documentation Links
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [TOTP RFC 6238 Specification](https://tools.ietf.org/html/rfc6238)
- [Gmail App Passwords Setup](https://support.google.com/accounts/answer/185833)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/security/)

### Recommended Authenticator Apps
- **Google Authenticator** (iOS/Android)
- **Authy** (iOS/Android/Desktop)
- **Microsoft Authenticator** (iOS/Android)
- **1Password** (Cross-platform with premium)
- **Bitwarden** (Cross-platform)

### Security Best Practices
- **Regular Security Audits** of authentication flows
- **Dependency Updates** to patch security vulnerabilities
- **Penetration Testing** of authentication systems
- **User Education** about 2FA benefits and setup
- **Incident Response Plan** for security breaches

---

## 🎯 Future Enhancements

### Planned Features
- **SMS-based 2FA** as alternative to TOTP
- **Device Trust System** to remember trusted devices
- **Biometric Authentication** for supported devices
- **Advanced Threat Detection** with IP geolocation
- **Security Audit Dashboard** for administrators
- **API Key Management** for programmatic access

### Scalability Improvements
- **Redis Caching** for session management
- **Database Sharding** for large user bases
- **Microservices Architecture** for auth service
- **Load Balancing** for high availability
- **CDN Integration** for global performance

### Compliance Features
- **GDPR Compliance** tools for data management
- **SOC 2 Audit** trail and logging
- **HIPAA Compliance** for healthcare data
- **ISO 27001** security management system
- **Regular Security Assessments** and reports

---

## 📞 Support & Maintenance

### Contact Information
- **Development Team:** Rygneco Engineering Team
- **Security Team:** security@rygneco.com
- **Support Email:** support@rygneco.com
- **Emergency Contact:** +1-XXX-XXX-XXXX

### Maintenance Schedule
- **Security Updates:** Monthly or as needed
- **Dependency Updates:** Quarterly
- **Performance Optimization:** Bi-annually
- **Security Audits:** Annually
- **Disaster Recovery Testing:** Quarterly

### Version History
- **v1.0.0** (August 4, 2025): Initial implementation with Google OAuth and 2FA
- **Future versions:** Will include additional authentication methods and security enhancements

---

**📄 Document Version:** 1.0.0  
**Last Updated:** August 4, 2025  
**Next Review Date:** November 4, 2025  

---

*This document serves as the complete reference for the Google OAuth and Two-Factor Authentication implementation in the Rygneco E-Waste Tracker application. For technical support or questions, please contact the development team.*
