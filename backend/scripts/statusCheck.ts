import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Quick Database Status Check
async function checkStatus(): Promise<void> {
  console.log('Checking MongoDB Atlas status...');
  
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco', { 
      serverSelectionTimeoutMS: 5000 
    });
    
    const db = mongoose.connection.db;
    
    // Get collections
    const collections = await db.listCollections().toArray();
    console.log(`\n✅ Connected! Found ${collections.length} collections:`);
    
    // Check each collection
    for (const col of collections) {
      try {
        const count = await db.collection(col.name).countDocuments({}, { maxTimeMS: 3000 });
        console.log(`   📄 ${col.name}: ${count} documents`);
      } catch (e) {
        console.log(`   📄 ${col.name}: checking...`);
      }
    }
    
    // Specifically check for role requests
    if (collections.some(c => c.name === 'roleRequests')) {
      try {
        const pending = await db.collection('roleRequests').countDocuments({ status: 'pending' });
        console.log(`\n🔔 Pending role requests: ${pending}`);
      } catch (e) {
        console.log('\n🔔 Role requests: checking...');
      }
    }

    // Check for super admin
    if (collections.some(c => c.name === 'users')) {
      try {
        const superAdminCount = await db.collection('users').countDocuments({ userType: 'super_admin' });
        console.log(`👤 Super admins: ${superAdminCount}`);
      } catch (e) {
        console.log('👤 Super admins: checking...');
      }
    }
    
    console.log('\n✅ Status check completed');
    
  } catch (error) {
    console.log(`❌ Error: ${(error as Error).message}`);
    
    if ((error as Error).message.includes('ENOTFOUND')) {
      console.log('💡 Check your internet connection and MongoDB URI');
    } else if ((error as Error).message.includes('authentication')) {
      console.log('💡 Check your MongoDB credentials');
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Run the check
if (require.main === module) {
  checkStatus().catch(console.error);
}

export default checkStatus;
