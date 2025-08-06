import mongoose from 'mongoose';
import User from '../src/models/User';
import { TwoFactorService } from '../src/services/twoFactorService';
import dotenv from 'dotenv';

dotenv.config();

const test2FA = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    console.log('✅ Connected to MongoDB');

    // Create a test user
    const testUser = new User({
      googleId: 'test-google-id',
      name: 'Test User',
      email: 'test@example.com',
      userType: 'employee',
      role: 'admin',
      profileCompleted: true,
      status: 'active',
      roleApprovalStatus: 'approved'
    });

    await testUser.save();
    console.log('✅ Test user created');

    // Test 2FA secret generation
    const secret = TwoFactorService.generateSecret(testUser.email);
    console.log('✅ 2FA secret generated:', secret);

    // Test QR code generation
    const qrCode = await TwoFactorService.generateQRCode(testUser.email, secret);
    console.log('✅ QR code generated');

    // Test backup codes generation
    const backupCodes = TwoFactorService.generateBackupCodes();
    console.log('✅ Backup codes generated:', backupCodes.length, 'codes');

    // Clean up
    await testUser.deleteOne();
    console.log('✅ Test user cleaned up');

    console.log('\n🎉 All 2FA tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  }
};

// Run the test
test2FA();
