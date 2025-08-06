import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

interface IUser {
  googleId?: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: 'employee' | 'partner' | 'super_admin';
  role: string;
  requestedRoles?: string[];
  roleApprovalStatus: 'pending' | 'approved' | 'rejected';
  approvedRoles?: string[];
  status: 'active' | 'inactive' | 'pending';
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
}

interface IRoleRequest {
  employeeId: mongoose.Types.ObjectId;
  employeeEmail: string;
  employeeName: string;
  requestedRoles: string[];
  requestReason?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  approvedRoles?: string[];
  rejectionReason?: string;
}

// Simple direct connection and data creation
async function createTestData(): Promise<void> {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    console.log('✅ Connected to MongoDB');

    // Define schemas directly in the script
    const userSchema = new mongoose.Schema<IUser>({
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

    const roleRequestSchema = new mongoose.Schema<IRoleRequest>({
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

    const User = mongoose.model<IUser>('User', userSchema);
    const RoleRequest = mongoose.model<IRoleRequest>('RoleRequest', roleRequestSchema);

    console.log('👥 Creating test employees...');

    // Test employees data
    const testEmployees = [
      {
        name: 'Priya Sharma',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@rygneco.com',
        userType: 'employee' as const,
        role: 'employee',
        roleApprovalStatus: 'pending' as const,
        status: 'pending' as const
      },
      {
        name: 'Raj Patel',
        firstName: 'Raj',
        lastName: 'Patel',
        email: 'raj.patel@rygneco.com',
        userType: 'employee' as const,
        role: 'employee',
        roleApprovalStatus: 'pending' as const,
        status: 'pending' as const
      },
      {
        name: 'Anitha Kumar',
        firstName: 'Anitha',
        lastName: 'Kumar',
        email: 'anitha.kumar@rygneco.com',
        userType: 'employee' as const,
        role: 'employee',
        roleApprovalStatus: 'pending' as const,
        status: 'pending' as const
      }
    ];

    // Create or update users
    const createdUsers = [];
    for (const employeeData of testEmployees) {
      let user = await User.findOne({ email: employeeData.email });
      if (!user) {
        user = new User(employeeData);
        await user.save();
        console.log(`✅ Created user: ${user.name}`);
      } else {
        console.log(`👤 User already exists: ${user.name}`);
      }
      createdUsers.push(user);
    }

    console.log('📝 Creating role requests...');

    // Role request data
    const roleRequestData = [
      {
        employeeEmail: 'priya.sharma@rygneco.com',
        employeeName: 'Priya Sharma',
        requestedRoles: ['inventory_manager'],
        requestReason: 'I have 3 years of experience in inventory management and would like to take on more responsibilities in managing our e-waste inventory systems.',
        status: 'pending' as const
      },
      {
        employeeEmail: 'raj.patel@rygneco.com',
        employeeName: 'Raj Patel',
        requestedRoles: ['transporter', 'coordinator'],
        requestReason: 'I have a commercial driving license and experience in logistics coordination. I would like to handle transportation and coordinate collection activities.',
        status: 'pending' as const
      },
      {
        employeeEmail: 'anitha.kumar@rygneco.com',
        employeeName: 'Anitha Kumar',
        requestedRoles: ['admin'],
        requestReason: 'With my background in operations management and 5 years at the company, I believe I can contribute effectively as an administrator.',
        status: 'pending' as const
      }
    ];

    // Create role requests
    for (let i = 0; i < roleRequestData.length; i++) {
      const requestData = roleRequestData[i];
      const user = createdUsers[i];

      // Check if role request already exists
      const existingRequest = await RoleRequest.findOne({
        employeeEmail: requestData.employeeEmail,
        status: 'pending'
      });

      if (!existingRequest) {
        const roleRequest = new RoleRequest({
          ...requestData,
          employeeId: user._id
        });
        
        await roleRequest.save();
        console.log(`✅ Created role request for: ${requestData.employeeName}`);
      } else {
        console.log(`📋 Role request already exists for: ${requestData.employeeName}`);
      }
    }

    // Verify the data
    console.log('\n🔍 Verifying created data...');
    
    const allUsers = await User.find({ userType: 'employee' });
    console.log(`👥 Total employees in database: ${allUsers.length}`);
    
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

createTestData().catch(console.error);
