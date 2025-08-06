import { auth } from '../src/config/firebase';
import { logger } from '../src/utils/logger';

async function checkFirebaseSetup() {
  try {
    logger.info('🔍 Checking Firebase configuration...');
    
    // Log environment details
    logger.info(`Project ID: ${process.env.FIREBASE_PROJECT_ID}`);
    logger.info(`ADC Path: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
    
    // Try to list users (this will fail if Firebase is not properly configured)
    const listUsersResult = await auth.listUsers(1);
    logger.info('✅ Successfully connected to Firebase Auth');
    logger.info(`Current user count: ${listUsersResult.users.length}`);
    
    // Try to verify a custom token (this tests if the credentials have proper permissions)
    try {
      const customToken = await auth.createCustomToken('test-user');
      logger.info('✅ Successfully created custom token');
    } catch (error: any) {
      logger.error('❌ Custom token creation failed:', error.message);
      throw error;
    }
    
    logger.info('🎉 Firebase setup verification completed successfully!');
    
  } catch (error: any) {
    logger.error('❌ Firebase setup verification failed:', error);
    logger.error('Error code:', error.code);
    logger.error('Error message:', error.message);
    
    // Provide helpful troubleshooting tips
    logger.info('\n🔧 Troubleshooting tips:');
    logger.info('1. Verify GOOGLE_APPLICATION_CREDENTIALS path is correct');
    logger.info('2. Ensure you have run: gcloud auth application-default set-quota-project rygneco-f58e7');
    logger.info('3. Check if Firebase Admin SDK is enabled in Google Cloud Console');
    logger.info('4. Verify you have the necessary IAM permissions');
    
    process.exit(1);
  }
}

checkFirebaseSetup();
