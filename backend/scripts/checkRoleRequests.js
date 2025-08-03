const mongoose = require('mongoose');
const RoleRequest = require('../dist/models/RoleRequest').default;
const User = require('../dist/models/User').default;
require('dotenv').config();

async function checkRoleRequests() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check all role requests
    const allRequests = await RoleRequest.find({});
    console.log(`\n📊 Total role requests in database: ${allRequests.length}`);
    
    if (allRequests.length > 0) {
      console.log('\n📋 All Role Requests:');
      allRequests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.employeeName} (${req.employeeEmail})`);
        console.log(`   Status: ${req.status}`);
        console.log(`   Requested Roles: ${req.requestedRoles.join(', ')}`);
        console.log(`   Created: ${req.createdAt}`);
        console.log('');
      });
    }

    // Check pending requests specifically
    const pendingRequests = await RoleRequest.find({ status: 'pending' });
    console.log(`\n⏳ Pending role requests: ${pendingRequests.length}`);
    
    if (pendingRequests.length > 0) {
      console.log('\n✅ You should see these in the Role Approvals tab:');
      pendingRequests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.employeeName} - ${req.requestedRoles.join(', ')}`);
      });
    } else {
      console.log('\n❌ No pending requests found. This is why the Role Approvals tab is empty.');
      console.log('💡 Create some test data using the createTestRoleRequests.js script');
    }

    // Check users with pending status
    const pendingUsers = await User.find({ roleApprovalStatus: 'pending' });
    console.log(`\n👥 Users with pending approval status: ${pendingUsers.length}`);
    
    if (pendingUsers.length > 0) {
      pendingUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Requested: ${user.requestedRoles?.join(', ') || 'N/A'}`);
      });
    }

  } catch (error) {
    console.error('Error checking role requests:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkRoleRequests();
