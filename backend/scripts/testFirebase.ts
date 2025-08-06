import { auth } from '../src/config/firebase';
import { logger } from '../src/utils/logger';

async function testFirebase() {
  try {
    logger.info('🔥 Testing Firebase Admin SDK configuration...');
    
    // Log environment
    logger.info(`Environment: ${process.env.NODE_ENV}`);
    logger.info(`Project ID: ${process.env.FIREBASE_PROJECT_ID}`);
    
    // Create a test user
    const userEmail = 'test@rygneco.com';
    try {
      // Try to create a test user
      const userRecord = await auth.createUser({
        email: userEmail,
        emailVerified: false,
        password: 'testpassword123',
        displayName: 'Test User',
      });
      logger.info('✅ Successfully created test user:', userRecord.uid);
      
      // Clean up - delete the test user
      await auth.deleteUser(userRecord.uid);
      logger.info('✅ Successfully deleted test user');
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        logger.info('✅ Test user already exists (this is fine)');
      } else {
        throw error;
      }
    }

    // Test listing users
    const listUsersResult = await auth.listUsers(1);
    logger.info('✅ Successfully connected to Firebase Auth');
    logger.info(`Found ${listUsersResult.users.length} users`);

    logger.info('🎉 Firebase configuration test completed successfully!');
  } catch (error) {
    logger.error('❌ Firebase test failed:', error);
    console.error(error);
    process.exit(1);
  }
}

testFirebase();
