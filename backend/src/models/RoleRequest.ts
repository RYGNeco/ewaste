import mongoose, { Document, Schema } from 'mongoose';

export interface IRoleRequest extends Document {
  employeeId: Schema.Types.ObjectId;
  employeeEmail: string;
  employeeName: string;
  requestedRoles: string[];
  requestReason?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: Schema.Types.ObjectId;
  reviewedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const roleRequestSchema = new Schema<IRoleRequest>({
  employeeId: { 
    type: Schema.Types.ObjectId, 
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
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  reviewedAt: { 
    type: Date 
  },
  rejectionReason: { 
    type: String 
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
roleRequestSchema.index({ employeeId: 1 });
roleRequestSchema.index({ status: 1 });
roleRequestSchema.index({ createdAt: -1 });
roleRequestSchema.index({ employeeEmail: 1 });

export default mongoose.model<IRoleRequest>('RoleRequest', roleRequestSchema); 