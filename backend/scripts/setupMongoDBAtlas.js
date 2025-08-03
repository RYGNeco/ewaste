const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas Setup Script for Rygneco E-Waste Tracker
async function setupMongoDBAtlas() {
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
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas successfully');

    // 1. Users Collection Schema
    console.log('\n📄 Creating Users collection...');
    const userSchema = new mongoose.Schema({
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
        trim: true,
        maxlength: 50
      },
      lastName: { 
        type: String,
        trim: true,
        maxlength: 50
      },
      userType: { 
        type: String, 
        enum: ['employee', 'partner', 'super_admin'], 
        required: true,
        index: true
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
        ],
        index: true
      },
      requestedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator', 'super_admin']
      }],
      roleApprovalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true
      },
      approvedRoles: [{
        type: String,
        enum: ['admin', 'inventory_manager', 'transporter', 'coordinator', 'super_admin']
      }],
      status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
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

    const User = mongoose.model('User', userSchema);

    // 2. Role Requests Collection Schema
    console.log('📄 Creating RoleRequests collection...');
    const roleRequestSchema = new mongoose.Schema({
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

    const RoleRequest = mongoose.model('RoleRequest', roleRequestSchema);

    // 3. Partners Collection Schema
    console.log('📄 Creating Partners collection...');
    const partnerSchema = new mongoose.Schema({
      organizationName: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 200,
        index: true
      },
      contactPerson: {
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
        email: { 
          type: String, 
          required: true,
          lowercase: true,
          trim: true,
          index: true
        },
        phone: { 
          type: String, 
          required: true,
          trim: true
        }
      },
      address: {
        street: { 
          type: String, 
          required: true,
          trim: true,
          maxlength: 200
        },
        city: { 
          type: String, 
          required: true,
          trim: true,
          maxlength: 100,
          index: true
        },
        state: { 
          type: String, 
          required: true,
          trim: true,
          maxlength: 100,
          index: true
        },
        zipCode: { 
          type: String, 
          required: true,
          trim: true
        },
        country: { 
          type: String, 
          required: true, 
          default: 'United States',
          trim: true,
          maxlength: 100
        },
        coordinates: {
          latitude: { type: Number },
          longitude: { type: Number }
        }
      },
      businessInfo: {
        businessType: { 
          type: String, 
          required: true,
          trim: true,
          maxlength: 100
        },
        industry: { 
          type: String, 
          required: true,
          trim: true,
          maxlength: 100,
          index: true
        },
        employeeCount: { 
          type: Number, 
          required: true,
          min: 1
        },
        website: { 
          type: String,
          trim: true
        },
        description: {
          type: String,
          maxlength: 1000
        }
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'suspended'],
        default: 'pending',
        index: true
      },
      pickupHistory: [{
        batchId: { type: String, required: true },
        pickupDate: { type: Date, required: true },
        status: { 
          type: String, 
          enum: ['scheduled', 'completed', 'cancelled'],
          default: 'scheduled'
        },
        weight: { type: Number, required: true, min: 0 },
        deviceCount: { type: Number, required: true, min: 0 },
        value: { type: Number, default: 0, min: 0 }
      }],
      totalPickups: { type: Number, default: 0, min: 0 },
      totalWeight: { type: Number, default: 0, min: 0 },
      totalDevices: { type: Number, default: 0, min: 0 },
      totalValue: { type: Number, default: 0, min: 0 },
      certifications: [{
        name: { type: String, required: true },
        number: { type: String, required: true },
        issuedDate: { type: Date, required: true },
        expiryDate: { type: Date }
      }]
    }, {
      timestamps: true,
      collection: 'partners'
    });

    // Add compound indexes
    partnerSchema.index({ 'contactPerson.email': 1 });
    partnerSchema.index({ organizationName: 1, status: 1 });
    partnerSchema.index({ 'address.city': 1, 'address.state': 1 });
    partnerSchema.index({ status: 1, createdAt: -1 });

    const Partner = mongoose.model('Partner', partnerSchema);

    // 4. E-Waste Items Collection Schema
    console.log('📄 Creating EWasteItems collection...');
    const ewasteItemSchema = new mongoose.Schema({
      itemId: {
        type: String,
        required: true,
        unique: true,
        index: true
      },
      qrCode: {
        type: String,
        required: true
      },
      deviceInfo: {
        type: {
          type: String,
          required: true,
          enum: [
            'desktop', 'laptop', 'tablet', 'smartphone', 'monitor',
            'printer', 'scanner', 'server', 'network_equipment',
            'other_electronics'
          ],
          index: true
        },
        brand: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100
        },
        model: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100
        },
        serialNumber: {
          type: String,
          trim: true,
          index: true
        },
        yearManufactured: {
          type: Number,
          min: 1980,
          max: new Date().getFullYear()
        }
      },
      condition: {
        type: String,
        enum: ['working', 'partially_working', 'broken', 'unknown'],
        required: true,
        index: true
      },
      estimatedValue: {
        type: Number,
        default: 0,
        min: 0
      },
      weight: {
        type: Number,
        required: true,
        min: 0
      },
      partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true,
        index: true
      },
      batchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        index: true
      },
      status: {
        type: String,
        enum: ['received', 'in_processing', 'data_wiped', 'disassembled', 'recycled', 'resold'],
        default: 'received',
        index: true
      },
      photos: [{
        url: { type: String, required: true },
        description: { type: String },
        uploadedAt: { type: Date, default: Date.now }
      }],
      certifications: [{
        type: {
          type: String,
          enum: ['data_destruction', 'recycling', 'disposal'],
          required: true
        },
        certificateNumber: { type: String, required: true },
        issuedDate: { type: Date, required: true },
        fileUrl: { type: String }
      }],
      processingNotes: [{
        note: { type: String, required: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        addedAt: { type: Date, default: Date.now }
      }]
    }, {
      timestamps: true,
      collection: 'ewasteItems'
    });

    // Add compound indexes
    ewasteItemSchema.index({ partnerId: 1, status: 1 });
    ewasteItemSchema.index({ batchId: 1, status: 1 });
    ewasteItemSchema.index({ 'deviceInfo.type': 1, condition: 1 });
    ewasteItemSchema.index({ createdAt: -1 });

    const EWasteItem = mongoose.model('EWasteItem', ewasteItemSchema);

    // 5. Batches Collection Schema
    console.log('📄 Creating Batches collection...');
    const batchSchema = new mongoose.Schema({
      batchNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
      },
      partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner',
        required: true,
        index: true
      },
      items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EWasteItem'
      }],
      status: {
        type: String,
        enum: ['pending', 'scheduled', 'picked_up', 'in_processing', 'completed'],
        default: 'pending',
        index: true
      },
      pickupDate: {
        type: Date,
        index: true
      },
      completionDate: {
        type: Date,
        index: true
      },
      summary: {
        totalWeight: { type: Number, default: 0, min: 0 },
        totalValue: { type: Number, default: 0, min: 0 },
        totalItems: { type: Number, default: 0, min: 0 },
        deviceBreakdown: [{
          type: { type: String, required: true },
          count: { type: Number, required: true, min: 0 },
          weight: { type: Number, required: true, min: 0 }
        }]
      },
      recyclingCertificate: {
        certificateNumber: { type: String },
        issuedDate: { type: Date },
        fileUrl: { type: String }
      },
      processingNotes: {
        type: String,
        maxlength: 1000
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
      }
    }, {
      timestamps: true,
      collection: 'batches'
    });

    // Add compound indexes
    batchSchema.index({ partnerId: 1, status: 1 });
    batchSchema.index({ status: 1, pickupDate: 1 });
    batchSchema.index({ assignedTo: 1, status: 1 });
    batchSchema.index({ createdAt: -1 });

    const Batch = mongoose.model('Batch', batchSchema);

    // 6. Analytics Collection Schema
    console.log('📄 Creating Analytics collection...');
    const analyticsSchema = new mongoose.Schema({
      type: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        index: true
      },
      date: {
        type: Date,
        required: true,
        index: true
      },
      metrics: {
        totalItems: { type: Number, default: 0 },
        totalWeight: { type: Number, default: 0 },
        totalValue: { type: Number, default: 0 },
        itemsProcessed: { type: Number, default: 0 },
        itemsRecycled: { type: Number, default: 0 },
        itemsResold: { type: Number, default: 0 },
        partnersActive: { type: Number, default: 0 },
        batchesCompleted: { type: Number, default: 0 }
      },
      environmentalImpact: {
        carbonFootprintReduced: { type: Number, default: 0 },
        energySaved: { type: Number, default: 0 },
        materialsRecovered: {
          copper: { type: Number, default: 0 },
          aluminum: { type: Number, default: 0 },
          steel: { type: Number, default: 0 },
          plastic: { type: Number, default: 0 },
          gold: { type: Number, default: 0 },
          silver: { type: Number, default: 0 }
        }
      },
      deviceBreakdown: [{
        type: { type: String, required: true },
        count: { type: Number, required: true },
        weight: { type: Number, required: true },
        value: { type: Number, required: true }
      }]
    }, {
      timestamps: true,
      collection: 'analytics'
    });

    // Add compound indexes
    analyticsSchema.index({ type: 1, date: -1 });
    analyticsSchema.index({ date: -1 });

    const Analytics = mongoose.model('Analytics', analyticsSchema);

    // Create all collections and indexes
    console.log('\n🔨 Creating collections and indexes...');
    
    await User.createCollection();
    console.log('✅ Users collection created');
    
    await RoleRequest.createCollection();
    console.log('✅ RoleRequests collection created');
    
    await Partner.createCollection();
    console.log('✅ Partners collection created');
    
    await EWasteItem.createCollection();
    console.log('✅ EWasteItems collection created');
    
    await Batch.createCollection();
    console.log('✅ Batches collection created');
    
    await Analytics.createCollection();
    console.log('✅ Analytics collection created');

    // Create additional indexes
    console.log('\n📊 Creating additional indexes...');
    
    await User.collection.createIndex({ email: 1, userType: 1 });
    await RoleRequest.collection.createIndex({ status: 1, createdAt: -1 });
    await Partner.collection.createIndex({ organizationName: "text", "contactPerson.email": "text" });
    await EWasteItem.collection.createIndex({ "deviceInfo.serialNumber": 1 });
    await Batch.collection.createIndex({ batchNumber: 1, status: 1 });
    
    console.log('✅ All indexes created successfully');

    // Insert sample data
    console.log('\n🌱 Creating sample data...');
    
    // Create super admin if not exists
    const existingSuperAdmin = await User.findOne({ userType: 'super_admin' });
    if (!existingSuperAdmin) {
      await User.create({
        name: 'Super Admin',
        email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com',
        firstName: 'Super',
        lastName: 'Admin',
        userType: 'super_admin',
        role: 'super_admin',
        roleApprovalStatus: 'approved',
        approvedRoles: ['super_admin'],
        status: 'active',
        profileCompleted: true
      });
      console.log('✅ Super Admin created');
    }

    // Create sample partner
    const existingPartner = await Partner.findOne({});
    if (!existingPartner) {
      await Partner.create({
        organizationName: 'TechCorp Solutions',
        contactPerson: {
          firstName: 'John',
          lastName: 'Manager',
          email: 'john.manager@techcorp.com',
          phone: '+1-555-0123'
        },
        address: {
          street: '123 Business Ave',
          city: 'San Francisco',
          state: 'California',
          zipCode: '94105',
          country: 'United States'
        },
        businessInfo: {
          businessType: 'Technology',
          industry: 'Software Development',
          employeeCount: 250,
          website: 'https://techcorp.com',
          description: 'Leading technology company specializing in software solutions'
        },
        status: 'active'
      });
      console.log('✅ Sample partner created');
    }

    console.log('\n🎉 MongoDB Atlas setup completed successfully!');
    console.log('\n📋 Collections created:');
    console.log('   • users - User accounts and authentication');
    console.log('   • roleRequests - Employee role approval requests');
    console.log('   • partners - Partner organizations');
    console.log('   • ewasteItems - Individual e-waste items');
    console.log('   • batches - Collection batches');
    console.log('   • analytics - Performance and environmental metrics');
    
    console.log('\n🔍 Indexes created for optimal query performance');
    console.log('💾 Sample data inserted for testing');
    
    // Display connection info
    console.log('\n📊 Database Information:');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Collections: ${Object.keys(mongoose.connection.collections).length}`);
    
  } catch (error) {
    console.error('❌ Error setting up MongoDB Atlas:', error);
    if (error.message.includes('MONGODB_URI')) {
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
setupMongoDBAtlas();
