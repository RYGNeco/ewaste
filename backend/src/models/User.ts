import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId?: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: 'employee' | 'partner' | 'super_admin';
  role: string;
  requestedRoles: string[];
  roleApprovalStatus: 'pending' | 'approved' | 'rejected';
  approvedRoles: string[];
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
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
    enum: ['admin', 'inventory_manager', 'transporter', 'coordinator']
  }],
  roleApprovalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedRoles: [{
    type: String,
    enum: ['admin', 'inventory_manager', 'transporter', 'coordinator']
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  approvedAt: { type: Date },
  rejectionReason: { type: String }
}, {
  timestamps: true
});

// Index for efficient queries
userSchema.index({ email: 1 });
userSchema.index({ userType: 1, roleApprovalStatus: 1 });
userSchema.index({ googleId: 1 });

export default mongoose.model<IUser>('User', userSchema);
