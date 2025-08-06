// Debug script to test Firebase and authentication setup
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Debugging Authentication Setup...\n');

// Check environment variables
console.log('1. Environment Variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Present' : '❌ Missing'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Present' : '❌ Missing'}`);
console.log(`   FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID}`);
console.log(`   FIREBASE_API_KEY: ${process.env.FIREBASE_API_KEY ? '✅ Present' : '❌ Missing'}`);
console.log(`   GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? '✅ Present' : '❌ Missing'}`);
console.log(`   GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ Present' : '❌ Missing'}\n`);

// Test MongoDB connection
console.log('2. Testing MongoDB Connection...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('   ✅ MongoDB connected successfully');
    testFirebase();
  })
  .catch(err => {
    console.log('   ❌ MongoDB connection failed:', err.message);
    testFirebase();
  });

// Test Firebase Admin
async function testFirebase() {
  console.log('\n3. Testing Firebase Admin...');
  try {
    const admin = require('firebase-admin');
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID || 'rygneco-f58e7'
      });
    }
    
    // Test token verification with a dummy token
    console.log('   ✅ Firebase Admin initialized');
    console.log('   Note: Actual token verification will happen during auth requests');
    
  } catch (error) {
    console.log('   ❌ Firebase Admin error:', error.message);
    console.log('   Solution: Set up Firebase service account key or credentials');
  }
  
  console.log('\n4. Starting test server...');
  startTestServer();
}

// Start a simple test server
function startTestServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Test endpoint
  app.get('/api/test', (req, res) => {
    res.json({ 
      message: '✅ Backend server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });
  
  // Test Firebase auth endpoint
  app.post('/api/test-firebase', async (req, res) => {
    try {
      const admin = require('firebase-admin');
      const { idToken } = req.body;
      
      if (!idToken) {
        return res.status(400).json({ error: 'ID token required for testing' });
      }
      
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      res.json({ 
        success: true, 
        message: '✅ Firebase token verification successful',
        uid: decodedToken.uid,
        email: decodedToken.email
      });
      
    } catch (error) {
      res.status(500).json({ 
        error: '❌ Firebase token verification failed',
        details: error.message 
      });
    }
  });
  
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`   ✅ Test server running on port ${port}`);
    console.log(`   📍 Test endpoint: http://localhost:${port}/api/test`);
    console.log(`   📍 Firebase test: http://localhost:${port}/api/test-firebase`);
    console.log('\n5. Next Steps:');
    console.log('   - Open http://localhost:3000 in browser');
    console.log('   - Try Google sign-in');
    console.log('   - Check browser console for errors');
    console.log('   - Check this terminal for backend logs');
  });
}
