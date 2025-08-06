import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Simple user interface for this script
interface IUser {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'super_admin' | 'admin' | 'employee' | 'partner';
  role: string;
  requestedRoles: string[];
  roleApprovalStatus: 'pending' | 'approved' | 'rejected';
  approvedRoles: string[];
  status: 'active' | 'inactive' | 'pending';
}

// Define schema directly in the script for simplicity
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  userType: { 
    type: String, 
    enum: ['super_admin', 'admin', 'employee', 'partner'], 
    required: true 
  },
  role: { type: String, required: true },
  requestedRoles: [{ type: String }],
  roleApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedRoles: [{ type: String }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

const setupSuperAdmin = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    console.log('Connected to MongoDB');

    // Check if Super Admin already exists
    const existingSuperAdmin = await User.findOne({ 
      userType: 'super_admin',
      email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com'
    });

    if (existingSuperAdmin) {
      console.log('Super Admin already exists');
      return;
    }

    // Create Super Admin user
    const superAdmin = new User({
      name: process.env.SUPER_ADMIN_NAME || 'Super Administrator',
      email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com',
      firstName: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
      lastName: process.env.SUPER_ADMIN_LAST_NAME || 'Administrator',
      userType: 'super_admin' as const,
      role: 'super_admin',
      requestedRoles: ['super_admin'],
      roleApprovalStatus: 'approved' as const,
      approvedRoles: ['super_admin'],
      status: 'active' as const
    });

    await superAdmin.save();
    console.log('Super Admin created successfully');
    console.log('Email:', superAdmin.email);
    console.log('Role:', superAdmin.role);

  } catch (error) {
    console.error('Error setting up Super Admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
if (require.main === module) {
  setupSuperAdmin().catch(console.error);
}

export default setupSuperAdmin; 