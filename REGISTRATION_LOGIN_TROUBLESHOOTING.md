# 🔧 Registration/Login Issues - Troubleshooting Guide

## ✅ **Issues Fixed in Code:**

### 1. **Manual Registration Data Mismatch:**
- **Before:** Frontend sent `role`, backend expected `requestedRole`
- **After:** ✅ Frontend now sends `requestedRole`
- **Before:** Frontend sent `individual`, backend expected `partner`
- **After:** ✅ Frontend now sends `partner` for non-employees
- **Before:** Missing `confirmPassword` field
- **After:** ✅ Frontend now sends `confirmPassword`

### 2. **Google Registration Data Mismatch:**
- **Before:** Missing `idToken` (required for Firebase verification)
- **After:** ✅ Frontend now gets and sends Firebase `idToken`
- **Before:** Frontend sent `role`, backend expected `requestedRole`
- **After:** ✅ Frontend now sends `requestedRole`

### 3. **Google Sign-In Data Mismatch:**
- **Before:** Missing `idToken` for Firebase verification
- **After:** ✅ Frontend now gets and sends Firebase `idToken`

## 🚀 **Required Setup Steps:**

### **Step 1: Backend Environment (.env)**
Create `backend/.env` file with:
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rygneco

# JWT
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json

# Email (for admin notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-email@gmail.com

# Server
NODE_ENV=development
PORT=5000
```

### **Step 2: Frontend Environment (.env)**
Create `frontend/.env` file with:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="Rygneco E-Waste Tracker"
```

### **Step 3: Firebase Configuration**
1. **Download service account key** from Firebase Console
2. **Save as** `backend/firebase-service-account.json`
3. **Enable Authentication** in Firebase Console
4. **Add Google as sign-in provider**

### **Step 4: Firebase Frontend Config**
Check `frontend/src/firebase.js` or similar file has correct config:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

## 🧪 **Testing Steps:**

### **1. Test Backend Server:**
```bash
cd backend
npm install
npm run dev
```
- Should see: "✅ MongoDB connected successfully"
- Should see: "🚀 Server is running on port 5000"

### **2. Test Database Connection:**
Visit: `http://localhost:5000/api/health`
- Should return JSON with database status: "connected"

### **3. Test Manual Registration:**
```bash
cd frontend
npm install
npm run dev
```
- Fill registration form
- Should not get "All fields are required" error
- Check backend console for registration logs

### **4. Test Google Registration:**
- Click "Sign up with Google"
- Complete Google OAuth flow
- Should not get Firebase/idToken errors

## 🔍 **Common Issues & Solutions:**

### **"All fields are required" Error:**
- ✅ **Fixed:** Frontend now sends all required fields

### **"Invalid ID token" Error:**
- ✅ **Fixed:** Frontend now sends Firebase idToken
- **Also check:** Firebase service account key is correct

### **"Database connection failed" Error:**
- **Check:** MongoDB Atlas IP whitelist includes your IP
- **Check:** MongoDB URI is correct in .env

### **"Cannot connect to server" Error:**
- **Check:** Backend server is running on port 5000
- **Check:** Frontend .env has correct VITE_API_URL

### **Google Sign-In Opens But Fails:**
- **Check:** Firebase project has Google Auth enabled
- **Check:** OAuth consent screen is configured
- **Check:** Domain is added to authorized domains

## 📧 **Email Notifications:**

To enable super admin email notifications:
1. **Gmail:** Generate app password (not regular password)
2. **Add to backend/.env:** SMTP_USER and SMTP_PASS
3. **Test:** Registration should trigger admin emails

## 🎯 **Expected Behavior After Fixes:**

### **Manual Registration:**
1. Fill form → Submit
2. Backend creates user with `accountStatus: 'pending'`
3. Super admins get email notification
4. User sees success message

### **Google Registration:**
1. Click "Sign up with Google" → Google popup
2. Firebase authentication → Get idToken
3. Backend creates user with `accountStatus: 'pending'`
4. Super admins get email notification
5. User sees success message

### **Google Sign-In:**
1. Click "Sign in with Google" → Google popup
2. Firebase authentication → Get idToken
3. Backend checks approval status
4. If pending: Shows "pending approval" message
5. If approved: Logs in successfully

## 🔧 **Debug Commands:**

Check backend logs:
```bash
cd backend && npm run dev
```

Check frontend network tab:
- Open browser DevTools → Network
- Try registration/login
- Check for 400/500 errors in API calls

The code issues have been fixed! Now just ensure your environment is configured correctly.
