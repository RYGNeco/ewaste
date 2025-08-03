const mongoose = require('mongoose');
require('dotenv').config();

async function quickTest() {
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected successfully!');
    
    // Test if we can create a simple document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    await TestModel.create({ test: 'connection test' });
    console.log('✅ Database write successful!');
    
    await TestModel.deleteMany({ test: 'connection test' });
    console.log('✅ Database cleanup successful!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
    process.exit(0);
  }
}

quickTest();
