const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const quickSetup = async () => {
  console.log('🚀 Rygneco E-Waste Tracker - Quick Setup');
  console.log('=====================================\n');

  try {
    // Check if .env file exists
    const envPath = path.join(__dirname, '..', '.env');
    const envExamplePath = path.join(__dirname, '..', 'env.example');
    
    if (!fs.existsSync(envPath)) {
      console.log('📝 Creating .env file from template...');
      
      if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ .env file created successfully!');
        console.log('⚠️  Please edit .env file with your actual values:');
        console.log('   - MONGODB_URI (database connection)');
        console.log('   - JWT_SECRET (random secret key)');
        console.log('   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (for OAuth)');
      } else {
        console.log('❌ env.example file not found. Creating basic .env file...');
        
        const basicEnv = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rygneco

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Google OAuth Configuration (Required for authentication)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Super Admin Configuration
SUPER_ADMIN_EMAIL=superadmin@rygneco.com
SUPER_ADMIN_NAME=Super Administrator
SUPER_ADMIN_FIRST_NAME=Super
SUPER_ADMIN_LAST_NAME=Administrator

# Application Configuration
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=5000
`;
        
        fs.writeFileSync(envPath, basicEnv);
        console.log('✅ Basic .env file created!');
      }
    } else {
      console.log('✅ .env file already exists');
    }

    // Check if MongoDB is running
    console.log('\n🗄️  Checking MongoDB connection...');
    try {
      execSync('mongosh --eval "db.runCommand(\'ping\')" --quiet', { stdio: 'pipe' });
      console.log('✅ MongoDB is running');
    } catch (error) {
      console.log('⚠️  MongoDB connection failed. Please ensure MongoDB is running:');
      console.log('   - Start MongoDB: mongod');
      console.log('   - Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
    }

    // Install dependencies if node_modules doesn't exist
    const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      console.log('\n📦 Installing dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      console.log('✅ Dependencies installed');
    } else {
      console.log('\n✅ Dependencies already installed');
    }

    // Test database connection
    console.log('\n🧪 Testing database connection...');
    try {
      execSync('npm run test-setup', { stdio: 'pipe' });
      console.log('✅ Database connection successful');
    } catch (error) {
      console.log('⚠️  Database connection failed. This is normal if MongoDB is not running.');
    }

    console.log('\n🎉 Setup completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Edit .env file with your actual values');
    console.log('2. Set up Google OAuth credentials (see SETUP_GUIDE.md)');
    console.log('3. Run: npm run setup-super-admin');
    console.log('4. Start the server: npm run dev');
    console.log('5. Start the frontend: cd ../frontend && npm run dev');
    
    console.log('\n📚 For detailed setup instructions, see:');
    console.log('   - SETUP_GUIDE.md');
    console.log('   - AUTHENTICATION_FLOW.md');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
};

// Run the setup
if (require.main === module) {
  quickSetup();
}

module.exports = quickSetup; 