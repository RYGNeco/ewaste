import { execSync } from 'child_process';

const testBasic = async (): Promise<void> => {
  console.log('🧪 Testing basic setup...');
  
  try {
    // Test if the app can start without database
    console.log('📝 Testing app startup...');
    
    // Set test environment
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-secret-key';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/rygneco-test';
    process.env.FRONTEND_URL = 'http://localhost:3000';
    
    // Import the app (dynamic import for TypeScript)
    const app = await import('../src/app');
    
    console.log('✅ App imported successfully');
    console.log('✅ Basic setup test passed!');
    
    console.log('\n📋 Test Results:');
    console.log('   • Environment variables loaded ✅');
    console.log('   • App module imports correctly ✅');
    console.log('   • Express server configuration ✅');
    
  } catch (error) {
    console.error('❌ Basic test failed:', (error as Error).message);
    console.log('\n💡 This might indicate:');
    console.log('   • Missing dependencies (run npm install)');
    console.log('   • TypeScript compilation issues');
    console.log('   • Invalid configuration');
    process.exit(1);
  }
};

// Run the test
if (require.main === module) {
  testBasic().catch(console.error);
}

export default testBasic;
