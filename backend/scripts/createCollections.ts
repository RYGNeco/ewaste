import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Interface for Super Admin user
interface ISuperAdmin {
  name: string;
  email: string;
  userType: 'super_admin';
  role: string;
  roleApprovalStatus: 'approved';
  status: 'active';
}

// Manual Collection Creation Script
async function createCollectionsManually(): Promise<void> {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    
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
        console.log(`❌ ${collectionName} - Error: ${(error as Error).message}`);
      }
    }
    
    // Create some basic indexes
    console.log('\n🔍 Creating basic indexes...');
    
    try {
      // Users collection indexes
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      await db.collection('users').createIndex({ userType: 1 });
      await db.collection('users').createIndex({ roleApprovalStatus: 1 });
      console.log('✅ Users indexes created');
      
      // RoleRequests collection indexes
      await db.collection('roleRequests').createIndex({ employeeEmail: 1 });
      await db.collection('roleRequests').createIndex({ status: 1 });
      await db.collection('roleRequests').createIndex({ createdAt: -1 });
      console.log('✅ RoleRequests indexes created');
      
      // Partners collection indexes
      await db.collection('partners').createIndex({ organizationName: 1 });
      await db.collection('partners').createIndex({ status: 1 });
      console.log('✅ Partners indexes created');
      
      // EwasteItems collection indexes
      await db.collection('ewasteItems').createIndex({ itemName: 1 });
      await db.collection('ewasteItems').createIndex({ category: 1 });
      await db.collection('ewasteItems').createIndex({ status: 1 });
      console.log('✅ EwasteItems indexes created');
      
      // Batches collection indexes
      await db.collection('batches').createIndex({ batchNumber: 1 }, { unique: true });
      await db.collection('batches').createIndex({ status: 1 });
      await db.collection('batches').createIndex({ createdAt: -1 });
      console.log('✅ Batches indexes created');
      
    } catch (indexError) {
      console.log(`⚠️  Index creation warning: ${(indexError as Error).message}`);
    }
    
    // Create Super Admin if not exists
    console.log('\n👤 Checking for Super Admin...');
    
    const superAdminSchema = new mongoose.Schema<ISuperAdmin>({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      userType: { type: String, required: true },
      role: { type: String, required: true },
      roleApprovalStatus: { type: String, required: true },
      status: { type: String, required: true }
    });
    
    const SuperAdminModel = mongoose.model<ISuperAdmin>('User', superAdminSchema);
    
    const existingSuperAdmin = await SuperAdminModel.findOne({ 
      userType: 'super_admin' 
    });
    
    if (!existingSuperAdmin) {
      const superAdmin = new SuperAdminModel({
        name: process.env.SUPER_ADMIN_NAME || 'Super Administrator',
        email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com',
        userType: 'super_admin' as const,
        role: 'super_admin',
        roleApprovalStatus: 'approved' as const,
        status: 'active' as const
      });
      
      await superAdmin.save();
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
    console.error('❌ Error:', (error as Error).message);
    
    if ((error as Error).message.includes('ENOTFOUND') || (error as Error).message.includes('ECONNREFUSED')) {
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
if (require.main === module) {
  createCollectionsManually().catch(console.error);
}

export default createCollectionsManually;
