import mongoose, { Document, Schema } from 'mongoose';

export interface IPartner extends Document {
  organizationName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessInfo: {
    businessType: string;
    industry: string;
    employeeCount: number;
    website?: string;
  };
  status: 'active' | 'inactive' | 'pending';
  pickupHistory: Array<{
    batchId: string;
    pickupDate: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    weight: number;
    deviceCount: number;
  }>;
  totalPickups: number;
  totalWeight: number;
  totalDevices: number;
  createdAt: Date;
  updatedAt: Date;
}

const partnerSchema = new Schema<IPartner>({
  organizationName: { 
    type: String, 
    required: true,
    trim: true
  },
  contactPerson: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'United States' }
  },
  businessInfo: {
    businessType: { type: String, required: true },
    industry: { type: String, required: true },
    employeeCount: { type: Number, required: true },
    website: { type: String }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  pickupHistory: [{
    batchId: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    weight: { type: Number, required: true },
    deviceCount: { type: Number, required: true }
  }],
  totalPickups: { type: Number, default: 0 },
  totalWeight: { type: Number, default: 0 },
  totalDevices: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Indexes for efficient queries
partnerSchema.index({ 'contactPerson.email': 1 });
partnerSchema.index({ organizationName: 1 });
partnerSchema.index({ status: 1 });

// Virtual for full contact name
partnerSchema.virtual('contactPerson.fullName').get(function() {
  return `${this.contactPerson.firstName} ${this.contactPerson.lastName}`;
});

// Pre-save middleware to update totals
partnerSchema.pre('save', function(next) {
  if (this.pickupHistory && this.pickupHistory.length > 0) {
    this.totalPickups = this.pickupHistory.length;
    this.totalWeight = this.pickupHistory.reduce((sum, pickup) => sum + pickup.weight, 0);
    this.totalDevices = this.pickupHistory.reduce((sum, pickup) => sum + pickup.deviceCount, 0);
  }
  next();
});

export default mongoose.model<IPartner>('Partner', partnerSchema);
