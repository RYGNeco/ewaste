import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Simple model interfaces for testing
interface IUser {
  userType: string;
  name: string;
  email: string;
}

interface IPartner {
  organizationName: string;
}

interface IRoleRequest {
  status: string;
  employeeName: string;
}

// Simple schemas for testing
const userSchema = new mongoose.Schema<IUser>({
  userType: { type: String },
  name: { type: String },
  email: { type: String }
}, { timestamps: true });

const partnerSchema = new mongoose.Schema<IPartner>({
  organizationName: { type: String }
}, { timestamps: true });

const roleRequestSchema = new mongoose.Schema<IRoleRequest>({
  status: { type: String },
  employeeName: { type: String }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
const Partner = mongoose.model<IPartner>('Partner', partnerSchema);
const RoleRequest = mongoose.model<IRoleRequest>('RoleRequest', roleRequestSchema);

const testSetup = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    console.log('✅ Connected to MongoDB');

    // Test User model
    console.log('\n🧪 Testing User model...');
    const userCount = await User.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);

    // Test Partner model
    console.log('\n🧪 Testing Partner model...');
    const partnerCount = await Partner.countDocuments();
    console.log(`📊 Total partners in database: ${partnerCount}`);

    // Test RoleRequest model
    console.log('\n🧪 Testing RoleRequest model...');
    const roleRequestCount = await RoleRequest.countDocuments();
    console.log(`📊 Total role requests in database: ${roleRequestCount}`);

    // Check for Super Admin
    console.log('\n🧪 Checking for Super Admin...');
    const superAdmin = await User.findOne({ userType: 'super_admin' });
    if (superAdmin) {
      console.log('✅ Super Admin found:');
      console.log(`   Email: ${superAdmin.email}`);
      console.log(`   Name: ${superAdmin.name}`);
    } else {
      console.log('❌ No Super Admin found. Run setup-super-admin script first.');
    }

    // Check recent role requests
    console.log('\n🧪 Checking recent role requests...');
    const recentRequests = await RoleRequest.find({}).limit(5).sort({ createdAt: -1 });
    if (recentRequests.length > 0) {
      console.log(`✅ Found ${recentRequests.length} recent role request(s):`);
      recentRequests.forEach((req, index) => {
        console.log(`   ${index + 1}. ${req.employeeName} - Status: ${req.status}`);
      });
    } else {
      console.log('ℹ️  No role requests found');
    }

    console.log('\n🎉 Database connection test completed successfully!');

  } catch (error) {
    console.error('❌ Database test failed:', (error as Error).message);
    
    if ((error as any).code === 'ENOTFOUND') {
      console.log('\n💡 Network error. Check your internet connection and MongoDB URI.');
    } else if ((error as any).name === 'MongooseServerSelectionError') {
      console.log('\n💡 Cannot connect to MongoDB. Check if:');
      console.log('   - MongoDB is running (for local connection)');
      console.log('   - MONGODB_URI is correct in .env file');
      console.log('   - Network allows MongoDB connections');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the test
if (require.main === module) {
  testSetup().catch(console.error);
}

export default testSetup;
