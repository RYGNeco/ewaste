import mongoose from 'mongoose';
import User from '../src/models/User';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const setupSuperAdmin = async () => {
  try {
    console.log('🚀 Starting Super Admin setup...');
    
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco';
    console.log('📊 MongoDB URI:', mongoUri.replace(/:[^:@]*@/, ':***@')); // Hide password in logs
    
    // Connect to MongoDB with timeout
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    });
    console.log('✅ Connected to MongoDB successfully');

    // Check if Super Admin already exists
    console.log('🔍 Checking for existing Super Admin...');
    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com';
    const existingSuperAdmin = await User.findOne({ 
      userType: 'super_admin',
      email: adminEmail
    });

    if (existingSuperAdmin) {
      console.log('⚠️  Super Admin already exists:');
      console.log('   📧 Email:', existingSuperAdmin.email);
      console.log('   👤 Name:', existingSuperAdmin.name);
      console.log('   🎯 Role:', existingSuperAdmin.role);
      console.log('   📈 Status:', existingSuperAdmin.status);
      console.log('');
      console.log('✅ Setup complete - you can now login with this Super Admin account');
      return;
    }

    // Create Super Admin user
    console.log('👨‍💼 Creating new Super Admin...');
    const superAdmin = new User({
      name: process.env.SUPER_ADMIN_NAME || 'Super Administrator',
      email: adminEmail,
      firstName: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
      lastName: process.env.SUPER_ADMIN_LAST_NAME || 'Administrator',
      userType: 'super_admin',
      role: 'super_admin',
      requestedRoles: ['super_admin'],
      roleApprovalStatus: 'approved',
      approvedRoles: ['super_admin'],
      status: 'active'
    });

    await superAdmin.save();
    console.log('');
    console.log('🎉 Super Admin created successfully!');
    console.log('   📧 Email:', superAdmin.email);
    console.log('   👤 Name:', superAdmin.name);
    console.log('   🎯 Role:', superAdmin.role);
    console.log('   📈 Status:', superAdmin.status);
    console.log('');
    console.log('✅ You can now login to the admin dashboard with this account');

  } catch (error: any) {
    console.error('');
    console.error('❌ Error setting up Super Admin:');
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('🔌 MongoDB Connection Failed!');
      console.error('');
      console.error('Possible solutions:');
      console.error('1. Make sure MongoDB is running locally on port 27017');
      console.error('2. Or update MONGODB_URI in your .env file to use MongoDB Atlas');
      console.error('3. Or install MongoDB locally from: https://www.mongodb.com/try/download/community');
      console.error('');
      console.error('For quick setup with MongoDB Atlas:');
      console.error('- Create a free account at https://cloud.mongodb.com');
      console.error('- Create a cluster and get the connection string');
      console.error('- Update MONGODB_URI in your .env file');
    } else if (error.code === 11000) {
      console.error('📧 Duplicate email error - Super Admin might already exist with this email');
    } else {
      console.error('Details:', error.message);
    }
    
    process.exit(1);
  } finally {
    try {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB');
    } catch (err) {
      console.log('Warning: Error disconnecting from MongoDB');
    }
  }
};

// Run the script
if (require.main === module) {
  setupSuperAdmin();
}

export default setupSuperAdmin;
