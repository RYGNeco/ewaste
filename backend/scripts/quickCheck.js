const mongoose = require('mongoose');
require('dotenv').config();

// Simple MongoDB Atlas Check
async function quickCheck() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected successfully!');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log(`\nFound ${collections.length} collections:`);
    collections.forEach((col, i) => {
      console.log(`${i + 1}. ${col.name}`);
    });
    
    // Quick document count
    for (const col of collections) {
      try {
        const count = await db.collection(col.name).countDocuments();
        console.log(`   ${col.name}: ${count} documents`);
      } catch (e) {
        console.log(`   ${col.name}: 0 documents`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected.');
    process.exit(0);
  }
}

quickCheck();
