const mongoose = require('mongoose');
const User = require('../dist/models/User').default;
const RoleRequest = require('../dist/models/RoleRequest').default;
require('dotenv').config();

async function createTestRoleRequests() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test employee users
    const testEmployees = [
      {
        email: 'employee1@test.com',
        name: 'John Doe',
        firstName: 'John',
        lastName: 'Doe',
        userType: 'employee',
        role: 'employee',
        roleApprovalStatus: 'pending',
        requestedRoles: ['admin', 'inventory_manager'],
        status: 'active'
      },
      {
        email: 'employee2@test.com',
        name: 'Jane Smith',
        firstName: 'Jane',
        lastName: 'Smith',
        userType: 'employee',
        role: 'employee',
        roleApprovalStatus: 'pending',
        requestedRoles: ['coordinator', 'transporter'],
        status: 'active'
      },
      {
        email: 'employee3@test.com',
        name: 'Mike Johnson',
        firstName: 'Mike',
        lastName: 'Johnson',
        userType: 'employee',
        role: 'employee',
        roleApprovalStatus: 'pending',
        requestedRoles: ['admin'],
        status: 'active'
      }
    ];

    // Create users and role requests
    for (const employeeData of testEmployees) {
      // Check if user already exists
      let user = await User.findOne({ email: employeeData.email });
      
      if (!user) {
        user = new User(employeeData);
        await user.save();
        console.log(`Created user: ${user.email}`);
      } else {
        console.log(`User already exists: ${user.email}`);
      }

      // Check if role request already exists
      let roleRequest = await RoleRequest.findOne({ employeeId: user._id, status: 'pending' });
      
      if (!roleRequest) {
        roleRequest = new RoleRequest({
          employeeId: user._id,
          employeeEmail: user.email,
          employeeName: user.name,
          requestedRoles: employeeData.requestedRoles,
          status: 'pending',
          createdAt: new Date()
        });
        await roleRequest.save();
        console.log(`Created role request for: ${user.email}`);
      } else {
        console.log(`Role request already exists for: ${user.email}`);
      }
    }

    console.log('\n✅ Test role requests created successfully!');
    console.log('🎯 Now login as Super Admin and check the Role Approvals tab');
    
  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createTestRoleRequests();
