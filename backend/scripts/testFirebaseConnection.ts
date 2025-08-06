import { admin } from '../src/config/firebase';
import http from 'http';
import https from 'https';
import { IncomingMessage } from 'http';

async function testFirebaseConnection(): Promise<void> {
  console.log('🔍 Testing Firebase connectivity...\n');

  // 1. Test basic internet connectivity
  console.log('1️⃣ Testing internet connectivity...');
  try {
    const response = await new Promise<IncomingMessage>((resolve, reject) => {
      https.get('https://www.google.com', resolve).on('error', reject);
    });
    console.log('✅ Internet connectivity verified\n');
  } catch (error: unknown) {
    const networkError = error as Error;
    console.error('❌ Internet connectivity test failed:', networkError.message);
    console.log('Please check your internet connection and proxy settings if applicable\n');
    process.exit(1);
  }

  // 2. Test Firebase APIs connectivity
  console.log('2️⃣ Testing Firebase APIs connectivity...');
  try {
    const response = await new Promise<IncomingMessage>((resolve, reject) => {
      https.get('https://firebase.googleapis.com', resolve).on('error', reject);
    });
    console.log('✅ Firebase APIs reachable\n');
  } catch (error: unknown) {
    const apiError = error as Error;
    console.error('❌ Firebase APIs connectivity test failed:', apiError.message);
    console.log('Please check if Firebase APIs are enabled and accessible\n');
    process.exit(1);
  }

  // 3. Test Firebase Admin SDK initialization
  console.log('3️⃣ Testing Firebase Admin SDK...');
  try {
    // Force a new app initialization if needed
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.FIREBASE_PROJECT_ID
      });
    }
    
    // Test auth functionality
    const auth = admin.auth();
    await auth.listUsers(1);
    console.log('✅ Firebase Admin SDK working properly\n');
  } catch (error: unknown) {
    const firebaseError = error as { message?: string, code?: string };
    console.error('❌ Firebase Admin SDK test failed:', firebaseError.message || error);
    console.log('\nTroubleshooting steps:');
    console.log('1. Run: gcloud services enable firebase.googleapis.com');
    console.log('2. Run: gcloud services enable identitytoolkit.googleapis.com');
    console.log('3. Verify project permissions in Google Cloud Console');
    console.log('4. Check application default credentials');
    process.exit(1);
  }

  console.log('🎉 All connectivity tests passed!');
  process.exit(0);
}

testFirebaseConnection().catch(console.error);
