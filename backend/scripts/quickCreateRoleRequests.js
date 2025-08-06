const mongoose = require('mongoose');
require('dotenv').config();

// Simple direct connection and data creation
async function createTestData() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    console.log('✅ Connected to MongoDB');

    // Define schemas directly in the script
    const userSchema = new mongoose.Schema({
      googleId: { type: String, unique: true, sparse: true },
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      firstName: { type: String },
      lastName: { type: String },
      userType: { 
        type: String, 
        enum: ['employee', 'partner', 'super_admin'], 
        required: true 
      },
      role: { 
        type: String, 
        default: 'employee',
        enum: [
          'super_admin',
          'admin', 
          'inventory_manager', 
          'transporter', 
          'coordinator',
          'partner'
        ]
      },
      requestedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator', 'super_admin']
      }],
      roleApprovalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      approvedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator', 'super_admin']
      }],
      status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
      },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      approvedAt: { type: Date },
      rejectionReason: { type: String }
    }, {
      timestamps: true
    });

    const roleRequestSchema = new mongoose.Schema({
      employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
      },
      employeeEmail: { 
        type: String, 
        required: true 
      },
      employeeName: { 
        type: String, 
        required: true 
      },
      requestedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator'],
        required: true
      }],
      requestReason: { 
        type: String 
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      reviewedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      },
      reviewedAt: { 
        type: Date 
      },
      approvedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator']
      }],
      rejectionReason: { 
        type: String 
      }
    }, {
      timestamps: true
    });

    const User = mongoose.model('User', userSchema);
    const RoleRequest = mongoose.model('RoleRequest', roleRequestSchema);

    console.log('📊 Checking existing data...');
    
    // Check existing role requests
    const existingRequests = await RoleRequest.find({});
    console.log(`Found ${existingRequests.length} existing role requests`);
    
    if (existingRequests.length > 0) {
      console.log('📋 Existing role requests:');
      existingRequests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.employeeName} (${req.employeeEmail}) - Status: ${req.status}`);
        console.log(`   Requested roles: ${req.requestedRoles.join(', ')}`);
      });
    }

    // Create test employees if they don't exist
    const testEmployees = [
      {
        email: 'demo.employee1@rygneco.com',
        name: 'Alice Cooper',
        firstName: 'Alice',
        lastName: 'Cooper',
        userType: 'employee',
        role: 'employee',
        roleApprovalStatus: 'pending',
        requestedRoles: ['admin', 'inventory_manager'],
        status: 'active'
      },
      {
        email: 'demo.employee2@rygneco.com',
        name: 'Bob Wilson',
        firstName: 'Bob',
        lastName: 'Wilson',
        userType: 'employee',
        role: 'employee',
        roleApprovalStatus: 'pending',
        requestedRoles: ['coordinator', 'transporter'],
        status: 'active'
      },
      {
        email: 'demo.employee3@rygneco.com',
        name: 'Carol Davis',
        firstName: 'Carol',
        lastName: 'Davis',
        userType: 'employee',
        role: 'employee',
        roleApprovalStatus: 'pending',
        requestedRoles: ['inventory_manager'],
        status: 'active'
      }
    ];

    console.log('👥 Creating test employees and role requests...');
    
    for (const employeeData of testEmployees) {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: employeeData.email });
        
        if (!user) {
          console.log(`Creating user: ${employeeData.name}`);
          user = await User.create(employeeData);
        } else {
          console.log(`User already exists: ${employeeData.name}`);
        }

        // Check if role request already exists
        const existingRequest = await RoleRequest.findOne({ 
          employeeId: user._id,
          status: 'pending'
        });

        if (!existingRequest) {
          console.log(`Creating role request for: ${employeeData.name}`);
          const roleRequest = await RoleRequest.create({
            employeeId: user._id,
            employeeEmail: user.email,
            employeeName: user.name,
            requestedRoles: employeeData.requestedRoles,
            requestReason: `Request for ${employeeData.requestedRoles.join(', ')} roles to support e-waste management operations.`,
            status: 'pending'
          });
          console.log(`✅ Created role request for ${employeeData.name} - ID: ${roleRequest._id}`);
        } else {
          console.log(`Role request already exists for: ${employeeData.name}`);
        }
      } catch (error) {
        console.error(`Error creating data for ${employeeData.name}:`, error.message);
      }
    }

    // Final check - show all pending role requests
    console.log('\n📋 Final check - All pending role requests:');
    const allPendingRequests = await RoleRequest.find({ status: 'pending' }).populate('employeeId', 'firstName lastName email');
    
    if (allPendingRequests.length === 0) {
      console.log('❌ No pending role requests found!');
    } else {
      console.log(`✅ Found ${allPendingRequests.length} pending role requests:`);
      allPendingRequests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.employeeName} (${req.employeeEmail})`);
        console.log(`   Requested: ${req.requestedRoles.join(', ')}`);
        console.log(`   Reason: ${req.requestReason}`);
        console.log(`   Created: ${req.createdAt.toLocaleDateString()}`);
        console.log('   ---');
      });
    }

    console.log('\n🎉 Test data creation completed!');
    console.log('💡 Now refresh your admin page and check the Role Approvals tab.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

createTestData();
