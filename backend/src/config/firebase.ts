import admin from 'firebase-admin';
import { AppOptions } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const config: AppOptions = {
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID || 'rygneco-f58e7',
    };

    // Add proxy configuration if needed (uncomment if behind a proxy)
    // process.env.HTTPS_PROXY = 'your-proxy-if-needed';
    
    // Initialize with retries
    const initializeWithRetry = async (retries = 3): Promise<void> => {
      try {
        admin.initializeApp(config);
        console.log('✅ Firebase Admin initialized successfully');
        
        // Test the connection
        await admin.auth().listUsers(1);
        console.log('✅ Firebase Auth connection verified');
      } catch (error: unknown) {
        const firebaseError = error as { code?: string };
        if (retries > 0 && (firebaseError.code === 'app/network-error' || firebaseError.code === 'ECONNREFUSED')) {
          console.log(`Retrying Firebase initialization... (${retries} attempts remaining)`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          return initializeWithRetry(retries - 1);
        }
        throw error;
      }
    };

    // Start initialization
    initializeWithRetry().catch((error: unknown) => {
      const firebaseError = error as { message?: string, code?: string };
      console.error('❌ Firebase Admin initialization failed:', firebaseError.message || error);
      console.log('\nTroubleshooting steps:');
      console.log('1. Check internet connection');
      console.log('2. Verify Firebase APIs are enabled: firebase.googleapis.com');
      console.log('3. Verify IAM permissions for the service account');
      console.log('4. Check if behind a proxy and configure HTTPS_PROXY if needed');
    });
  } catch (error: unknown) {
    const firebaseError = error as { message?: string };
    console.error('❌ Firebase Admin initialization failed:', firebaseError.message || error);
    console.log('Note: Make sure Firebase service account is properly configured');
  }
}

export { admin };
export const auth = admin.auth();
export default admin;
