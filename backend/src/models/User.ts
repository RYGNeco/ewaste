import mongoose, { Document, Schema } from 'mongoose';
<<<<<<< HEAD
import { UserType, UserRole, ApprovalStatus, UserStatus, RegistrationMethod } from '../types/user.types';
=======
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86

export interface IUser extends Document {
  googleId?: string;
  name: string;
  email: string;
<<<<<<< HEAD
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profilePicture?: string;
  organization?: string;
  userType: UserType;
  role: UserRole;
  requestedRoles: UserRole[];
  roleApprovalStatus: ApprovalStatus;
  approvedRoles: UserRole[];
  status: UserStatus;
  accountStatus: ApprovalStatus;
  profileCompleted: boolean;
  isActive: boolean;
  registrationMethod: RegistrationMethod;
=======
  firstName?: string;
  lastName?: string;
  userType: 'employee' | 'partner' | 'super_admin';
  role: string;
  requestedRoles: string[];
  roleApprovalStatus: 'pending' | 'approved' | 'rejected';
  approvedRoles: string[];
  status: 'active' | 'inactive' | 'pending';
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
<<<<<<< HEAD

  // 2FA fields
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  twoFactorBackupCodes: string[];
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;

  // Security fields
  emailVerified: boolean;
  phoneVerified: boolean;
  securityQuestions?: Array<{
    question: string;
    answer: string;
  }>;
}

const userSchema = new Schema<IUser>({
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true,
    index: true 
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // For manual registration
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  profilePicture: { type: String },
  organization: { type: String },
  userType: { 
    type: String, 
    enum: ['employee', 'partner', 'super_admin'] as UserType[],
    required: true
  },
  role: { 
    type: String, 
    enum: ['super_admin', 'admin', 'inventory_manager', 'transporter', 'coordinator', 'partner'] as UserRole[],
    required: true
  },
  requestedRoles: [{
    type: String,
    enum: ['admin', 'inventory_manager', 'transporter', 'coordinator', 'super_admin'] as UserRole[]
  }],
  roleApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'] as ApprovalStatus[],
=======
}

const userSchema = new Schema<IUser>({
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
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
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
<<<<<<< HEAD
  accountStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  profileCompleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  registrationMethod: {
    type: String,
    enum: ['manual', 'google'],
    required: true
  },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  rejectionReason: { type: String },
  
  // 2FA fields
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  twoFactorBackupCodes: [{ type: String }],
  lastLoginAt: { type: Date },
  loginAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date },
  
  // Security fields
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  securityQuestions: [{
    question: { type: String },
    answer: { type: String }
  }]
=======
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  rejectionReason: { type: String }
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
}, {
  timestamps: true
});

// Index for efficient queries
userSchema.index({ email: 1 });
userSchema.index({ userType: 1, roleApprovalStatus: 1 });
userSchema.index({ googleId: 1 });

export default mongoose.model<IUser>('User', userSchema);
