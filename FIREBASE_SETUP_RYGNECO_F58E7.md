# 🔥 Firebase Setup Guide for Rygneco E-Waste Tracker

## 📋 Your Firebase Project Information
- **Project ID:** `rygneco-f58e7`
- **Project Number:** `761945196987`
- **API Key:** `AIzaSyA75Olwdvx6F7pwJCuPVBLz7iJtTxWQbJQ`
- **Client ID:** `305835480952-c53c5l3ki889vshl3pll0ntk7uk1ov6q.apps.googleusercontent.com`

## ✅ Configuration Status
- ✅ **Frontend .env file created** with your Firebase credentials
- ✅ **Backend .env file created** with your project configuration
- ✅ **Firebase config updated** in both frontend and backend

## 🔧 Next Manual Steps Required

### Step 1: Complete Google Cloud Console Setup
Since you have the Firebase project, you need to complete the Google Cloud Console configuration:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: `rygneco-f58e7`
3. **Find your OAuth Client**:
   - Go to "APIs & Services" → "Credentials"
   - Look for Client ID: `305835480952-c53c5l3ki889vshl3pll0ntk7uk1ov6q.apps.googleusercontent.com`
   - Copy the **Client Secret** and update your backend `.env` file

### Step 2: Create Firebase Service Account Key
1. **Go to Firebase Console**: https://console.firebase.google.com/project/rygneco-f58e7
2. **Go to Project Settings** (gear icon)
3. **Service Accounts tab**
4. **Generate new private key**
5. **Download the JSON file**
6. **Save it as**: `backend/firebase-service-account.json`

### Step 3: Enable Firebase Authentication
1. **In Firebase Console**: https://console.firebase.google.com/project/rygneco-f58e7
2. **Go to Authentication** → **Sign-in method**
3. **Enable Google provider**:
   - Click on Google
   - Enable the toggle
   - Use the existing Client ID: `305835480952-c53c5l3ki889vshl3pll0ntk7uk1ov6q.apps.googleusercontent.com`
   - Add your project support email
   - Save

4. **Add Authorized Domains**:
   - In Authentication → Settings → Authorized domains
   - Add: `localhost` (for development)
   - Add your production domain when ready

### Step 4: Configure Email for 2FA Notifications
1. **Set up Gmail App Password**:
   - Go to your Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Update `SMTP_USER` and `SMTP_PASS` in backend `.env`

### Step 5: Test the Configuration
```bash
# In the backend directory
npm run test-2fa

# Start the development servers
# Terminal 1
cd backend
npm run dev

# Terminal 2  
cd frontend
npm run dev
```

## 📝 Environment Files Created

### Frontend `.env` (✅ Created)
```bash
VITE_FIREBASE_API_KEY=AIzaSyA75Olwdvx6F7pwJCuPVBLz7iJtTxWQbJQ
VITE_FIREBASE_AUTH_DOMAIN=rygneco-f58e7.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rygneco-f58e7
VITE_FIREBASE_STORAGE_BUCKET=rygneco-f58e7.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=761945196987
VITE_FIREBASE_APP_ID=1:761945196987:android:41ab8a0de7228b88f45c9e
VITE_API_URL=http://localhost:5000/api
```

### Backend `.env` (✅ Created)
```bash
# Your specific Firebase configuration
FIREBASE_PROJECT_ID=rygneco-f58e7
FIREBASE_API_KEY=AIzaSyA75Olwdvx6F7pwJCuPVBLz7iJtTxWQbJQ
GOOGLE_CLIENT_ID=761945196987-81vop3ohnoofrdik91p5oql06teqg1p5.apps.googleusercontent.com

# You need to add these manually:
GOOGLE_CLIENT_SECRET=your-client-secret-from-google-cloud-console
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
MONGODB_URI=mongodb+srv://RYGNeco:mongoRGYNeco.!@rygneco.zy8e7bz.mongodb.net/?retryWrites=true&w=majority&appName=RYGNeco
```

## 🔐 Security Checklist

### Required Manual Actions:
- [ ] Get Google Client Secret from Google Cloud Console
- [ ] Download Firebase service account JSON file
- [ ] Set up Gmail app password for email notifications  
- [ ] Enable Firebase Authentication with Google provider
- [ ] Add authorized domains in Firebase Console
- [ ] Test the complete authentication flow

### Optional but Recommended:
- [ ] Set up MongoDB Atlas for production database
- [ ] Configure custom email templates
- [ ] Set up monitoring and logging
- [ ] Configure HTTPS for production deployment

## 🚀 Quick Start Commands

After completing the manual steps above:

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start development
npm run dev  # In root directory (starts both frontend and backend)

# Test the implementation
cd backend && npm run test-2fa
```

## 🔗 Useful Links

- **Firebase Console**: https://console.firebase.google.com/project/rygneco-f58e7
- **Google Cloud Console**: https://console.cloud.google.com/
- **Your Firebase Auth Domain**: https://rygneco-f58e7.firebaseapp.com
- **Local Development**: http://localhost:3000

## ⚠️ Important Notes

1. **Never commit sensitive files** like `firebase-service-account.json` to version control
2. **The `.env` files are already in `.gitignore`** to protect your credentials
3. **Use different credentials for production** deployment
4. **Enable 2FA on your own Google account** for additional security

## 🛠️ Troubleshooting

**If Google Sign-in doesn't work:**
- Check that Google Cloud Console OAuth is configured
- Verify authorized domains in Firebase Authentication
- Ensure Client ID matches between Firebase and Google Cloud Console

**If 2FA setup fails:**
- Verify Firebase service account JSON is in the correct location
- Check that Firebase Admin SDK can authenticate
- Ensure MongoDB is running and accessible

**If emails don't send:**
- Verify Gmail app password is correct (16 characters, no spaces)
- Check that 2-step verification is enabled on your Gmail account
- Test SMTP connection manually

---

**🎉 Your Firebase project `rygneco-f58e7` is now configured for Google OAuth and 2FA!**

Complete the manual steps above and you'll have a fully functional authentication system with enterprise-grade security.
