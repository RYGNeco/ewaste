import { admin, auth } from '../src/config/firebase';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testFirebaseSetup() {
  console.log('🔍 Starting Firebase configuration test...\n');

  try {
    // 1. Check environment variables
    console.log('1️⃣ Checking environment variables:');
    console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('ADC Path:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
    console.log('✅ Environment variables loaded\n');

    // 2. Test Firebase Admin initialization
    console.log('2️⃣ Testing Firebase Admin initialization...');
    const app = admin.app();
    console.log('✅ Firebase Admin SDK initialized successfully\n');

    // 3. Test Auth functionality
    console.log('3️⃣ Testing Firebase Auth functionality...');
    
    // 3.1 Create a test user
    const userEmail = `test-${Date.now()}@rygneco.com`;
    const userPassword = 'Test123!@#';
    
    console.log('Creating test user...');
    const userRecord = await auth.createUser({
      email: userEmail,
      password: userPassword,
      displayName: 'Test User',
      emailVerified: false,
    });
    console.log('✅ Test user created successfully:', userRecord.uid);

    // 3.2 Get user by email
    console.log('Retrieving user by email...');
    const userByEmail = await auth.getUserByEmail(userEmail);
    console.log('✅ Retrieved user by email successfully');

    // 3.3 Update user
    console.log('Updating user...');
    await auth.updateUser(userRecord.uid, {
      emailVerified: true,
    });
    console.log('✅ Updated user successfully');

    // 3.4 Create custom token
    console.log('Creating custom token...');
    const customToken = await auth.createCustomToken(userRecord.uid);
    console.log('✅ Custom token created successfully');

    // 3.5 Verify ID token
    console.log('Testing ID token verification...');
    try {
      await auth.verifyIdToken('test-token');
    } catch (error: any) {
      if (error.code === 'auth/argument-error') {
        console.log('✅ Token verification working (expected error for test token)');
      } else {
        throw error;
      }
    }

    // 3.6 Clean up - Delete test user
    console.log('Cleaning up - deleting test user...');
    await auth.deleteUser(userRecord.uid);
    console.log('✅ Test user deleted successfully\n');

    // 4. Test user listing
    console.log('4️⃣ Testing user listing functionality...');
    const listUsersResult = await auth.listUsers(1);
    console.log(`✅ Successfully listed users (count: ${listUsersResult.users.length})\n`);

    console.log('🎉 All Firebase tests completed successfully!\n');
    
    console.log('Summary:');
    console.log('✅ Environment variables verified');
    console.log('✅ Firebase Admin SDK initialized');
    console.log('✅ Authentication operations tested');
    console.log('✅ User management tested');
    
  } catch (error) {
    console.error('\n❌ Firebase test failed:', error);
    console.error('\nTroubleshooting tips:');
    console.log('1. Verify GOOGLE_APPLICATION_CREDENTIALS is correctly set');
    console.log('2. Check if Firebase Admin SDK is enabled in Google Cloud Console');
    console.log('3. Verify you have the necessary IAM permissions');
    console.log('4. Try running: gcloud auth application-default set-quota-project rygneco-f58e7');
    process.exit(1);
  }
}

testFirebaseSetup();
