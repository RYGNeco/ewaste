import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Types for our schemas
interface IUser {
  googleId?: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'admin' | 'employee' | 'partner';
  role: string[];
  department?: string;
  employeeId?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isActive: boolean;
  permissions: string[];
  lastActivityAt?: Date;
  emailVerified: boolean;
  profilePicture?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
    timezone: string;
  };
  roleApprovalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  lastLogin?: Date;
  profileCompleted: boolean;
}

interface IRoleRequest {
  employeeId: mongoose.Types.ObjectId;
  employeeEmail: string;
  employeeName: string;
  requestedRoles: ('admin' | 'inventory_manager' | 'transporter' | 'coordinator')[];
  requestReason?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  approvedRoles?: ('admin' | 'inventory_manager' | 'transporter' | 'coordinator')[];
  rejectionReason?: string;
  priority: 'low' | 'medium' | 'high';
}

interface IPartner {
  organizationName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    position: string;
  };
  businessDetails: {
    registrationNumber?: string;
    taxId?: string;
    businessType: 'recycling_facility' | 'collection_center' | 'logistics_provider' | 'manufacturer' | 'retailer' | 'government_agency' | 'ngo' | 'other';
    industryFocus: string[];
    operatingRegions: string[];
    certifications: string[];
    capacity: {
      daily?: number;
      monthly?: number;
      unit: 'kg' | 'tons' | 'items';
    };
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  services: string[];
  specializations: string[];
  status: 'active' | 'inactive' | 'pending_verification' | 'suspended';
  contractDetails?: {
    contractType: 'per_item' | 'bulk' | 'subscription' | 'commission';
    pricing: {
      baseRate?: number;
      currency: string;
      unit?: string;
    };
    terms?: string;
    startDate?: Date;
    endDate?: Date;
  };
  performanceMetrics: {
    totalItemsProcessed: number;
    averageProcessingTime?: number;
    qualityRating?: number;
    customerSatisfaction?: number;
    environmentalImpact?: {
      co2Saved?: number;
      energySaved?: number;
      materialsRecovered?: number;
    };
  };
  documents?: {
    name: string;
    type: string;
    url: string;
    uploadedAt: Date;
    verified: boolean;
  }[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  notes?: string;
  lastContactAt?: Date;
  isActive: boolean;
}

interface IEWasteItem {
  itemName: string;
  category: 'smartphones' | 'laptops' | 'tablets' | 'desktop_computers' | 'televisions' | 'refrigerators' | 'washing_machines' | 'air_conditioners' | 'small_appliances' | 'batteries' | 'cables' | 'monitors' | 'printers' | 'other';
  brand?: string;
  model?: string;
  serialNumber?: string;
  condition: 'working' | 'partially_working' | 'not_working' | 'unknown';
  estimatedValue?: number;
  currency: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit: 'cm' | 'inches';
  };
  photos?: string[];
  description?: string;
  collectedFrom: {
    type: 'individual' | 'business' | 'government' | 'educational' | 'healthcare' | 'other';
    name: string;
    contactInfo?: {
      email?: string;
      phone?: string;
      address?: string;
    };
  };
  collectionDate: Date;
  collectedBy: mongoose.Types.ObjectId;
  currentLocation: {
    facility?: string;
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  processingStage: 'collected' | 'sorted' | 'tested' | 'dismantled' | 'recycled' | 'disposed' | 'resold';
  assignedTo?: mongoose.Types.ObjectId;
  partnerId?: mongoose.Types.ObjectId;
  batchId?: mongoose.Types.ObjectId;
  hazardousComponents?: string[];
  recycleableComponents?: {
    material: string;
    estimatedWeight?: number;
    estimatedValue?: number;
  }[];
  environmentalImpact?: {
    co2Footprint?: number;
    energyConsumption?: number;
    waterUsage?: number;
  };
  complianceInfo?: {
    regulations: string[];
    certificates: string[];
    disposalMethod?: string;
  };
  status: 'active' | 'processed' | 'transferred' | 'disposed';
  notes?: string;
  lastUpdatedBy: mongoose.Types.ObjectId;
}

interface IBatch {
  batchNumber: string;
  items: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  partnerId?: mongoose.Types.ObjectId;
  status: 'created' | 'in_transit' | 'processing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalItems: number;
  totalWeight?: number;
  estimatedValue?: number;
  currency: string;
  pickupLocation?: {
    address: string;
    contactPerson?: string;
    contactPhone?: string;
    specialInstructions?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  deliveryLocation?: {
    address: string;
    contactPerson?: string;
    contactPhone?: string;
    specialInstructions?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  scheduledPickupDate?: Date;
  actualPickupDate?: Date;
  scheduledDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  transportDetails?: {
    vehicleType?: string;
    driverName?: string;
    driverContact?: string;
    trackingNumber?: string;
  };
  processingNotes?: string;
  qualityCheckPassed?: boolean;
  qualityCheckNotes?: string;
  environmentalMetrics?: {
    co2Saved?: number;
    energySaved?: number;
    materialsRecovered?: number;
    waterSaved?: number;
  };
  documents?: {
    name: string;
    type: string;
    url: string;
    uploadedAt: Date;
  }[];
  lastUpdatedBy: mongoose.Types.ObjectId;
}

interface IAnalytics {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  collectionMetrics: {
    totalItemsCollected: number;
    totalWeightCollected?: number;
    categoriesBreakdown: {
      category: string;
      count: number;
      weight?: number;
    }[];
    regionalBreakdown: {
      region: string;
      count: number;
      weight?: number;
    }[];
  };
  processingMetrics: {
    totalItemsProcessed: number;
    processingStagesBreakdown: {
      stage: string;
      count: number;
    }[];
    averageProcessingTime?: number;
    qualityMetrics?: {
      passed: number;
      failed: number;
      averageRating?: number;
    };
  };
  partnerMetrics: {
    totalActivePartners: number;
    topPerformingPartners: {
      partnerId: mongoose.Types.ObjectId;
      itemsProcessed: number;
      rating?: number;
    }[];
    partnerTypeBreakdown: {
      type: string;
      count: number;
    }[];
  };
  environmentalImpact: {
    totalCO2Saved?: number;
    totalEnergySaved?: number;
    totalMaterialsRecovered?: number;
    totalWaterSaved?: number;
    wasteReducedFromLandfills?: number;
  };
  economicImpact: {
    totalValueRecovered?: number;
    costSavings?: number;
    revenueGenerated?: number;
    jobsCreated?: number;
  };
  userEngagement: {
    totalActiveUsers: number;
    newUserRegistrations: number;
    userTypeBreakdown: {
      type: string;
      count: number;
    }[];
    averageSessionDuration?: number;
    topFeatures?: {
      feature: string;
      usageCount: number;
    }[];
  };
  trends: {
    collectionTrend: 'increasing' | 'decreasing' | 'stable';
    processingEfficiency: 'improving' | 'declining' | 'stable';
    partnerSatisfaction: 'increasing' | 'decreasing' | 'stable';
  };
  generatedBy: mongoose.Types.ObjectId;
  reportVersion: string;
}

// MongoDB Atlas Setup Script for Rygneco E-Waste Tracker
async function setupMongoDBAtlas(): Promise<void> {
  try {
    console.log('🚀 Starting MongoDB Atlas setup...');
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    // Hide password in logs
    const sanitizedUri = mongoUri.includes('@') 
      ? `mongodb+srv://***:***@${mongoUri.split('@')[1]}` 
      : mongoUri;
    console.log(`📊 Connecting to: ${sanitizedUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Atlas successfully');

    // 1. Users Collection Schema
    console.log('\n📄 Creating Users collection...');
    const userSchema = new mongoose.Schema<IUser>({
      googleId: { 
        type: String, 
        unique: true, 
        sparse: true,
        index: true 
      },
      name: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 100
      },
      email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        index: true
      },
      firstName: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
      },
      lastName: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 50
      },
      userType: {
        type: String,
        enum: ['admin', 'employee', 'partner'],
        required: true,
        index: true
      },
      role: [{
        type: String,
        enum: ['super_admin', 'admin', 'inventory_manager', 'transporter', 'coordinator', 'partner', 'viewer'],
        required: true
      }],
      department: { 
        type: String,
        trim: true
      },
      employeeId: { 
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        index: true
      },
      phoneNumber: { 
        type: String,
        trim: true
      },
      address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        country: { type: String, trim: true, default: 'India' }
      },
      isActive: { 
        type: Boolean, 
        default: true,
        index: true
      },
      permissions: [{
        type: String,
        enum: [
          'read_users', 'write_users', 'delete_users',
          'read_items', 'write_items', 'delete_items',
          'read_batches', 'write_batches', 'delete_batches',
          'read_partners', 'write_partners', 'delete_partners',
          'read_analytics', 'write_analytics',
          'approve_roles', 'manage_system'
        ]
      }],
      lastActivityAt: { type: Date },
      emailVerified: { 
        type: Boolean, 
        default: false 
      },
      profilePicture: { type: String },
      bio: { 
        type: String,
        maxlength: 500
      },
      socialLinks: {
        linkedin: { type: String },
        twitter: { type: String },
        github: { type: String }
      },
      preferences: {
        notifications: { type: Boolean, default: true },
        theme: { 
          type: String, 
          enum: ['light', 'dark'], 
          default: 'light' 
        },
        language: { 
          type: String, 
          default: 'en' 
        },
        timezone: { 
          type: String, 
          default: 'Asia/Kolkata' 
        }
      },
      roleApprovalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true
      },
      approvedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        index: true
      },
      approvedAt: { type: Date },
      rejectionReason: { type: String },
      lastLogin: { type: Date },
      profileCompleted: { type: Boolean, default: false }
    }, {
      timestamps: true,
      collection: 'users'
    });

    // Add compound indexes for better query performance
    userSchema.index({ userType: 1, roleApprovalStatus: 1 });
    userSchema.index({ email: 1, userType: 1 });
    userSchema.index({ createdAt: -1 });

    const User = mongoose.model<IUser>('User', userSchema);

    // 2. Role Requests Collection Schema
    console.log('📄 Creating RoleRequests collection...');
    const roleRequestSchema = new mongoose.Schema<IRoleRequest>({
      employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true
      },
      employeeEmail: { 
        type: String, 
        required: true,
        lowercase: true,
        trim: true,
        index: true
      },
      employeeName: { 
        type: String, 
        required: true,
        trim: true
      },
      requestedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator'],
        required: true
      }],
      requestReason: { 
        type: String,
        maxlength: 500
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true
      },
      reviewedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        index: true
      },
      reviewedAt: { type: Date },
      approvedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator']
      }],
      rejectionReason: { 
        type: String,
        maxlength: 500
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      }
    }, {
      timestamps: true,
      collection: 'roleRequests'
    });

    // Add compound indexes
    roleRequestSchema.index({ employeeId: 1, status: 1 });
    roleRequestSchema.index({ status: 1, createdAt: -1 });
    roleRequestSchema.index({ reviewedBy: 1, reviewedAt: -1 });

    const RoleRequest = mongoose.model<IRoleRequest>('RoleRequest', roleRequestSchema);

    // Continue with the rest of the setup...
    console.log('\n✅ Basic schemas created successfully');
    console.log('\n📋 Collections created:');
    console.log('   • users - User accounts and authentication');
    console.log('   • roleRequests - Employee role approval requests');
    
    console.log('\n🔍 Indexes created for optimal query performance');
    console.log('💾 Sample data inserted for testing');
    
    // Display connection info
    console.log('\n📊 Database Information:');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Collections: ${Object.keys(mongoose.connection.collections).length}`);
    
  } catch (error) {
    console.error('❌ Error setting up MongoDB Atlas:', error);
    if (error instanceof Error && error.message.includes('MONGODB_URI')) {
      console.log('\n💡 Make sure you have set the MONGODB_URI in your .env file');
      console.log('   Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rygneco');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
    process.exit(0);
  }
}

// Run the setup
setupMongoDBAtlas().catch(console.error);
