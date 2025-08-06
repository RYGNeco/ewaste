# Google Authentication Setup Guide

This document explains how to set up and use the Google Authentication flow with post-login field collection.

## 🔧 Backend Setup

### 1. Install Dependencies
The following packages are required:
```bash
cd backend
npm install firebase-admin
```

### 2. Environment Variables
Add these environment variables to your `.env` file:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/service-account-key.json
```

### 3. Firebase Service Account
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Generate a new private key
5. Download the JSON file and save it securely
6. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the file path

## 🎯 How It Works

### Authentication Flow
1. **Google Sign-In**: User clicks "Sign in with Google" button
2. **Firebase Auth**: User authenticates with Google via Firebase
3. **Backend Verification**: ID token is sent to backend for verification
4. **User Creation/Update**: Backend creates or updates user in MongoDB
5. **Profile Check**: System checks if user needs to complete profile
6. **Profile Completion**: If needed, user fills out additional fields
7. **Final Save**: Complete profile is saved to database

### API Endpoints

#### POST `/auth/google-signin`
Handles Google authentication with Firebase ID token.

**Request Body:**
```json
{
  "idToken": "firebase-id-token",
  "googleId": "google-user-id",
  "email": "user@example.com",
  "name": "User Name",
  "profilePicture": "https://...",
  "emailVerified": true
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "userType": "employee",
    "profileCompleted": true,
    "roleApprovalStatus": "pending"
  },
  "token": "jwt-token",
  "isNewUser": false,
  "needsProfileCompletion": false
}
```

#### POST `/auth/complete-profile-new`
Completes user profile after Google authentication.

**Headers:**
```
Authorization: Bearer jwt-token
```

**Request Body:**
```json
{
  "userType": "employee",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "requestedRoles": ["admin", "inventory_manager"]
}
```

#### GET `/auth/profile-status`
Checks current profile completion status.

**Headers:**
```
Authorization: Bearer jwt-token
```

## 🎨 Frontend Integration

### Components Created
1. **GoogleSignInButton.tsx** - Reusable Google sign-in button
2. **Enhanced CompleteProfile.tsx** - Profile completion form
3. **Updated Login.tsx** - Login page with Google auth

### Usage Example
```tsx
import { GoogleSignInButton } from '../components/GoogleSignInButton';

function LoginPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <GoogleSignInButton />
    </div>
  );
}
```

## 🔄 User Journey

### For New Users (Employee)
1. Click "Sign in with Google"
2. Authenticate with Google
3. Redirected to profile completion form
4. Fill out employee details and role requests
5. Submit → Profile completed, awaiting admin approval

### For New Users (Partner)
1. Click "Sign in with Google"
2. Authenticate with Google
3. Redirected to profile completion form
4. Fill out partner/organization details
5. Submit → Profile completed, automatically approved

### For Returning Users
1. Click "Sign in with Google"
2. Authenticate with Google
3. Redirected to appropriate dashboard based on role

## 🛡️ Security Features

- **Firebase ID Token Verification**: All Google sign-ins verified server-side
- **JWT Authentication**: Secure token-based session management
- **Role-Based Access**: Different permissions for employees/partners
- **Admin Approval**: Employee role requests require admin approval

## 🧪 Testing

To test the Google Auth flow:

1. Start the backend server
2. Start the frontend development server
3. Navigate to the login page
4. Click "Sign in with Google"
5. Complete the authentication flow
6. Verify user is created in database
7. Test profile completion if needed

## 🔍 Troubleshooting

### Common Issues

**"Invalid ID token"**
- Check Firebase project configuration
- Verify service account credentials
- Ensure FIREBASE_PROJECT_ID is correct

**"Cannot find module 'firebase-admin'"**
- Run `npm install firebase-admin` in backend directory

**Profile completion not working**
- Check JWT token is being sent in Authorization header
- Verify user is authenticated before accessing protected endpoints

**User not being created**
- Check MongoDB connection
- Verify User model schema matches interface
- Check backend logs for specific errors
