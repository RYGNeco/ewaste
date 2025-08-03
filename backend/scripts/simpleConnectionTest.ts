import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function simpleTest(): Promise<void> {
  console.log('Testing MongoDB connection...');
  console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:]*@/, ':***@')); // Hide password
  
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco', {
      serverSelectionTimeoutMS: 10000
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = mongoose.connection.db;
    const admin = db.admin();
    const result = await admin.ping();
    
    console.log('✅ Database ping successful:', result);
    
    // List databases
    const databases = await admin.listDatabases();
    console.log('📊 Available databases:', databases.databases.map(d => d.name));
    
    // List collections in current database
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections in current database:', collections.map(c => c.name));
    
    if (collections.length === 0) {
      console.log('\n⚠️  No collections found! Creating roleRequests collection...');
      
      // Create the collection
      await db.createCollection('roleRequests');
      
      // Insert a test document
      await db.collection('roleRequests').insertOne({
        employeeEmail: 'test@example.com',
        employeeName: 'Test User',
        requestedRoles: ['admin'],
        requestReason: 'Test request',
        status: 'pending',
        createdAt: new Date()
      });
      
      console.log('✅ Test role request created!');
    }
    
    const roleRequestCount = await db.collection('roleRequests').countDocuments();
    console.log(`🔔 Role requests in database: ${roleRequestCount}`);
    
  } catch (error) {
    console.error('❌ Connection failed:', (error as Error).message);
    
    if ((error as Error).message.includes('ENOTFOUND')) {
      console.log('💡 DNS resolution failed - check your internet connection');
    } else if ((error as Error).message.includes('authentication failed')) {
      console.log('💡 Authentication failed - check your username/password');
    } else if ((error as Error).message.includes('MongooseServerSelectionError')) {
      console.log('💡 Server selection failed - your IP might not be whitelisted');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

simpleTest().catch(console.error);
