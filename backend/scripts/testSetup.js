const mongoose = require('mongoose');
const User = require('../src/models/User');
const Partner = require('../src/models/Partner');
const RoleRequest = require('../src/models/RoleRequest');
require('dotenv').config();

const testSetup = async () => {
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
      console.log(`   Role: ${superAdmin.role}`);
      console.log(`   Status: ${superAdmin.status}`);
    } else {
      console.log('❌ No Super Admin found. Run "npm run setup-super-admin" to create one.');
    }

    // Test pending role requests
    console.log('\n🧪 Checking pending role requests...');
    const pendingRequests = await RoleRequest.find({ status: 'pending' });
    console.log(`📊 Pending role requests: ${pendingRequests.length}`);

    if (pendingRequests.length > 0) {
      console.log('📋 Pending requests:');
      pendingRequests.forEach((request, index) => {
        console.log(`   ${index + 1}. ${request.employeeName} (${request.employeeEmail})`);
        console.log(`      Requested roles: ${request.requestedRoles.join(', ')}`);
        console.log(`      Requested on: ${request.createdAt.toDateString()}`);
      });
    }

    console.log('\n✅ Setup test completed successfully!');

  } catch (error) {
    console.error('❌ Setup test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run the test
if (require.main === module) {
  testSetup();
}

module.exports = testSetup; 