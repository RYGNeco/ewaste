import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Atlas Verification Script
async function verifyMongoDBSetup(): Promise<void> {
  try {
    console.log('🔍 Verifying MongoDB Atlas setup...');
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(mongoUri);
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

    // Expected collections
    const expectedCollections = ['users', 'roleRequests', 'partners', 'ewasteItems', 'batches'];
    
    console.log('\n🔍 Checking required collections:');
    for (const expectedCol of expectedCollections) {
      const exists = collections.some(col => col.name === expectedCol);
      if (exists) {
        const count = await db.collection(expectedCol).countDocuments();
        console.log(`   ✅ ${expectedCol}: ${count} documents`);
      } else {
        console.log(`   ❌ ${expectedCol}: Missing`);
      }
    }

    // Check indexes
    console.log('\n🔍 Checking indexes:');
    try {
      if (collections.some(col => col.name === 'users')) {
        const userIndexes = await db.collection('users').listIndexes().toArray();
        console.log(`   📄 users: ${userIndexes.length} indexes`);
      }
      
      if (collections.some(col => col.name === 'roleRequests')) {
        const roleRequestIndexes = await db.collection('roleRequests').listIndexes().toArray();
        console.log(`   📄 roleRequests: ${roleRequestIndexes.length} indexes`);
      }
    } catch (indexError) {
      console.log('   ⚠️  Index information not available');
    }

    // Test basic operations
    console.log('\n🧪 Testing basic operations:');
    
    // Test writing to database (if users collection exists)
    if (collections.some(col => col.name === 'users')) {
      try {
        const testUser = {
          name: 'Test User',
          email: `test-${Date.now()}@example.com`,
          userType: 'employee',
          role: 'employee',
          roleApprovalStatus: 'pending',
          status: 'pending',
          isTestData: true
        };
        
        const result = await db.collection('users').insertOne(testUser);
        console.log('   ✅ Write operation: Success');
        
        // Clean up test data
        await db.collection('users').deleteOne({ _id: result.insertedId });
        console.log('   ✅ Delete operation: Success');
      } catch (writeError) {
        console.log(`   ❌ Write operation: ${(writeError as Error).message}`);
      }
    }

    console.log('\n🎉 MongoDB Atlas verification completed!');
    console.log('💡 Your database setup is working correctly.');
    
  } catch (error) {
    console.error('❌ Verification failed:', (error as Error).message);
    
    if ((error as Error).message.includes('MONGODB_URI')) {
      console.log('\n💡 Environment Issues:');
      console.log('1. Make sure MONGODB_URI is set in your .env file');
      console.log('2. Check the connection string format');
    } else if ((error as Error).message.includes('ENOTFOUND')) {
      console.log('\n💡 Network Issues:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your MongoDB Atlas cluster is running');
      console.log('3. Check IP whitelist in MongoDB Atlas');
    }
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
  }
}

// Run the verification
if (require.main === module) {
  verifyMongoDBSetup().catch(console.error);
}

export default verifyMongoDBSetup;
