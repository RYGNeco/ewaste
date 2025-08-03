import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Simple interfaces for the script
interface IRoleRequest {
  employeeName: string;
  employeeEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedRoles: string[];
  createdAt: Date;
  requestReason?: string;
}

interface IUser {
  name: string;
  email: string;
  userType: string;
  roleApprovalStatus: string;
}

// Simple schemas for this script
const roleRequestSchema = new mongoose.Schema<IRoleRequest>({
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  requestedRoles: [{ type: String }],
  requestReason: { type: String }
}, {
  timestamps: true
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String },
  email: { type: String },
  userType: { type: String },
  roleApprovalStatus: { type: String }
}, {
  timestamps: true
});

const RoleRequest = mongoose.model<IRoleRequest>('RoleRequest', roleRequestSchema);
const User = mongoose.model<IUser>('User', userSchema);

async function checkRoleRequests(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
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
      console.log('\n🔍 Pending Requests Details:');
      pendingRequests.forEach((req, index) => {
        console.log(`${index + 1}. ${req.employeeName}`);
        console.log(`   Email: ${req.employeeEmail}`);
        console.log(`   Requested: ${req.requestedRoles.join(', ')}`);
        console.log(`   Reason: ${req.requestReason || 'No reason provided'}`);
        console.log(`   Submitted: ${req.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }

    // Check users with pending approval status
    const pendingUsers = await User.find({ roleApprovalStatus: 'pending' });
    console.log(`\n👥 Users with pending approval: ${pendingUsers.length}`);
    
    if (pendingUsers.length > 0) {
      console.log('\n🔍 Pending Users:');
      pendingUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   Type: ${user.userType}`);
        console.log(`   Status: ${user.roleApprovalStatus}`);
        console.log('');
      });
    }

    console.log('✅ Role request check completed!');

  } catch (error) {
    console.error('❌ Error checking role requests:', (error as Error).message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the check
if (require.main === module) {
  checkRoleRequests().catch(console.error);
}

export default checkRoleRequests;
