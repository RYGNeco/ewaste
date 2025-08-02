const { execSync } = require('child_process');

const testBasic = async () => {
  console.log('🧪 Testing basic setup...');
  
  try {
    // Test if the app can start without database
    console.log('📝 Testing app startup...');
    
    // Set test environment
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-secret-key';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/rygneco-test';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    
    // Import the app
    const app = require('../src/app');
    
    console.log('✅ App imported successfully');
    console.log('✅ Basic setup test passed!');
    
  } catch (error) {
    console.error('❌ Basic setup test failed:', error.message);
    process.exit(1);
  }
};

// Run the test
if (require.main === module) {
  testBasic();
}

module.exports = testBasic; 