#!/usr/bin/env ts-node

import mongoose from 'mongoose';
import User from '../src/models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testGoogleAuth() {
  try {
    console.log('🧪 Testing Google Auth Setup...\n');

    // Test 1: Database Connection
    console.log('1. Testing MongoDB connection...');
    const mongoUrl = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error('❌ No MongoDB connection string found in environment variables');
    }

    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connected successfully');

    // Test 2: User Model Schema
    console.log('\n2. Testing User model schema...');
    const testUser = new User({
      googleId: 'test-google-id',
      email: 'test@example.com',
      name: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      profilePicture: 'https://example.com/pic.jpg',
      userType: 'employee',
      role: 'employee',
      requestedRoles: ['admin'],
      roleApprovalStatus: 'pending',
      approvedRoles: [],
      status: 'pending',
      profileCompleted: false,
      isActive: true
    });

    // Validate without saving
    await testUser.validate();
    console.log('✅ User model schema validation passed');

    // Test 3: Firebase Admin Configuration
    console.log('\n3. Testing Firebase Admin configuration...');
    try {
      const firebase = await import('../src/config/firebase');
      console.log('✅ Firebase Admin configuration loaded');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('⚠️  Firebase Admin not available:', errorMessage);
      console.log('   Make sure to install firebase-admin: npm install firebase-admin');
    }

    // Test 4: Controller Import
    console.log('\n4. Testing auth controller...');
    try {
      const authController = await import('../src/controllers/authController');
      console.log('✅ Auth controller imports successfully');
      
      // Check if new endpoints are exported
      const hasGoogleSignIn = 'googleSignIn' in authController;
      const hasCompleteProfileNew = 'completeProfileNew' in authController;
      
      if (hasGoogleSignIn && hasCompleteProfileNew) {
        console.log('✅ New Google Auth endpoints are available');
      } else {
        console.log('⚠️  Some Google Auth endpoints may be missing');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('❌ Auth controller import failed:', errorMessage);
    }

    // Test 5: Route Configuration
    console.log('\n5. Testing route configuration...');
    try {
      const authRoutes = await import('../src/routes/auth');
      console.log('✅ Auth routes import successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('❌ Auth routes import failed:', errorMessage);
    }

    console.log('\n🎉 Google Auth setup test completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Install firebase-admin: npm install firebase-admin');
    console.log('2. Set up Firebase service account credentials');
    console.log('3. Add FIREBASE_PROJECT_ID to your .env file');
    console.log('4. Test the authentication flow with the frontend');

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Test failed:', errorMessage);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 MongoDB disconnected');
  }
}

// Run the test
testGoogleAuth().catch(console.error);
