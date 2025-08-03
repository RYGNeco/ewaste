import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco';
    console.log('📊 URI:', mongoUri.replace(/:[^:@]*@/, ':***@'));
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('✅ Ready to create Super Admin');
    
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:');
    if (error.name === 'MongooseServerSelectionError') {
      console.error('');
      console.error('💡 Solutions:');
      console.error('1. Install MongoDB locally: https://www.mongodb.com/try/download/community');
      console.error('2. Or use MongoDB Atlas: https://cloud.mongodb.com');
      console.error('3. Update MONGODB_URI in .env file');
    } else {
      console.error('Error:', error.message);
    }
  } finally {
    await mongoose.disconnect();
  }
};

testConnection();
