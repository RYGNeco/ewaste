const mongoose = require('mongoose');
require('dotenv').config();

// Manual Collection Creation Script
async function createCollectionsManually() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected successfully!');
    
    const db = mongoose.connection.db;
    
    // List of collections to create
    const collections = [
      'users',
      'roleRequests',
      'partners', 
      'ewasteItems',
      'batches',
      'analytics'
    ];
    
    console.log('\n📊 Creating collections...');
    
    for (const collectionName of collections) {
      try {
        // Check if collection already exists
        const existingCollections = await db.listCollections({ name: collectionName }).toArray();
        
        if (existingCollections.length > 0) {
          console.log(`✅ ${collectionName} - Already exists`);
        } else {
          // Create collection
          await db.createCollection(collectionName);
          console.log(`✅ ${collectionName} - Created successfully`);
        }
      } catch (error) {
        console.log(`❌ ${collectionName} - Error: ${error.message}`);
      }
    }
    
    // Create some basic indexes
    console.log('\n🔍 Creating basic indexes...');
    
    try {
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      await db.collection('users').createIndex({ userType: 1 });
      await db.collection('users').createIndex({ roleApprovalStatus: 1 });
      console.log('✅ Users indexes created');
    } catch (error) {
      console.log('❌ Users indexes error:', error.message);
    }
    
    try {
      await db.collection('roleRequests').createIndex({ employeeId: 1 });
      await db.collection('roleRequests').createIndex({ status: 1 });
      console.log('✅ RoleRequests indexes created');
    } catch (error) {
      console.log('❌ RoleRequests indexes error:', error.message);
    }
    
    try {
      await db.collection('partners').createIndex({ organizationName: 1 });
      await db.collection('partners').createIndex({ 'contactPerson.email': 1 });
      console.log('✅ Partners indexes created');
    } catch (error) {
      console.log('❌ Partners indexes error:', error.message);
    }
    
    // Insert super admin if not exists
    console.log('\n👤 Checking for Super Admin...');
    
    const superAdminExists = await db.collection('users').findOne({ 
      userType: 'super_admin' 
    });
    
    if (!superAdminExists) {
      const superAdmin = {
        name: 'Super Admin',
        email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com',
        firstName: 'Super',
        lastName: 'Admin',
        userType: 'super_admin',
        role: 'super_admin',
        roleApprovalStatus: 'approved',
        approvedRoles: ['super_admin'],
        status: 'active',
        profileCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await db.collection('users').insertOne(superAdmin);
      console.log('✅ Super Admin created');
    } else {
      console.log('✅ Super Admin already exists');
    }
    
    // Final verification
    console.log('\n📋 Final verification:');
    const allCollections = await db.listCollections().toArray();
    
    collections.forEach(name => {
      const exists = allCollections.some(col => col.name === name);
      console.log(`${exists ? '✅' : '❌'} ${name}`);
    });
    
    console.log('\n🎉 MongoDB Atlas setup completed!');
    console.log('💡 Your database is ready for the e-waste tracker application.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Connection Issues:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your MongoDB Atlas connection string');
      console.log('3. Ensure your IP address is whitelisted in MongoDB Atlas');
      console.log('4. Check if your cluster is running');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
    process.exit(0);
  }
}

// Run the script
createCollectionsManually();
