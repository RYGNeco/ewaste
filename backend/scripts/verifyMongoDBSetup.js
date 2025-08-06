const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas Verification Script
async function verifyMongoDBSetup() {
  try {
    console.log('🔍 Verifying MongoDB Atlas setup...');
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');

    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📊 Database Collections:');
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Total Collections: ${collections.length}`);
    
    collections.forEach((collection, index) => {
      console.log(`   ${index + 1}. ${collection.name}`);
    });

    // Check specific collections
    const expectedCollections = [
      'users',
      'roleRequests', 
      'partners',
      'ewasteItems',
      'batches',
      'analytics'
    ];

    console.log('\n✅ Expected Collections Status:');
    for (const collectionName of expectedCollections) {
      const exists = collections.some(col => col.name === collectionName);
      const status = exists ? '✅' : '❌';
      console.log(`   ${status} ${collectionName}`);
      
      if (exists) {
        // Get collection stats
        try {
          const stats = await db.collection(collectionName).stats();
          console.log(`      📄 Documents: ${stats.count || 0}`);
          console.log(`      💾 Size: ${Math.round((stats.size || 0) / 1024)} KB`);
        } catch (error) {
          console.log(`      📄 Documents: 0 (empty collection)`);
        }
      }
    }

    // Check indexes
    console.log('\n🔍 Checking Indexes:');
    for (const collectionName of expectedCollections) {
      const exists = collections.some(col => col.name === collectionName);
      if (exists) {
        try {
          const indexes = await db.collection(collectionName).indexes();
          console.log(`   📋 ${collectionName}: ${indexes.length} indexes`);
          indexes.forEach((index, i) => {
            const keys = Object.keys(index.key).join(', ');
            console.log(`      ${i + 1}. ${keys} ${index.unique ? '(unique)' : ''}`);
          });
        } catch (error) {
          console.log(`   ❌ ${collectionName}: Error checking indexes`);
        }
      }
    }

    // Check sample data
    console.log('\n📊 Sample Data Check:');
    
    // Check users
    const User = mongoose.model('User', new mongoose.Schema({}));
    const userCount = await User.countDocuments();
    const superAdminExists = await User.findOne({ userType: 'super_admin' });
    console.log(`   👥 Users: ${userCount} total`);
    console.log(`   🔑 Super Admin: ${superAdminExists ? 'EXISTS' : 'MISSING'}`);
    
    // Check role requests
    const RoleRequest = mongoose.model('RoleRequest', new mongoose.Schema({}));
    const roleRequestCount = await RoleRequest.countDocuments();
    const pendingRequests = await RoleRequest.countDocuments({ status: 'pending' });
    console.log(`   📝 Role Requests: ${roleRequestCount} total, ${pendingRequests} pending`);
    
    // Check partners
    const Partner = mongoose.model('Partner', new mongoose.Schema({}));
    const partnerCount = await Partner.countDocuments();
    console.log(`   🏢 Partners: ${partnerCount} total`);

    console.log('\n🎉 MongoDB Atlas verification completed!');
    
    if (collections.length === 0) {
      console.log('\n⚠️  No collections found. Run the setup script first:');
      console.log('   node scripts/setupMongoDBAtlas.js');
    } else if (!expectedCollections.every(name => collections.some(col => col.name === name))) {
      console.log('\n⚠️  Some expected collections are missing. Run the setup script:');
      console.log('   node scripts/setupMongoDBAtlas.js');
    } else {
      console.log('\n✅ All expected collections are present and ready to use!');
    }

  } catch (error) {
    console.error('❌ Error verifying MongoDB setup:', error);
    
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n💡 Setup Instructions:');
      console.log('1. Create a MongoDB Atlas account at https://cloud.mongodb.com');
      console.log('2. Create a new cluster (free tier is sufficient)');
      console.log('3. Get your connection string from "Connect" button');
      console.log('4. Add it to your .env file as:');
      console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rygneco');
      console.log('5. Make sure to whitelist your IP address');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
    process.exit(0);
  }
}

// Run the verification
verifyMongoDBSetup();
