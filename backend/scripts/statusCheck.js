const mongoose = require('mongoose');
require('dotenv').config();

// Quick Database Status Check
async function checkStatus() {
  console.log('Checking MongoDB Atlas status...');
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
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
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkStatus();
