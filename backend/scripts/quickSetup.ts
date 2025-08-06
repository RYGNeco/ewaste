import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const quickSetup = async (): Promise<void> => {
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
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application Configuration
NODE_ENV=development
PORT=3001

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads/
`;
        
        fs.writeFileSync(envPath, basicEnv);
        console.log('✅ Basic .env file created!');
      }
    } else {
      console.log('✅ .env file already exists');
    }

    // Check if package.json exists and install dependencies
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      console.log('\n📦 Installing dependencies...');
      try {
        execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        console.log('✅ Dependencies installed successfully');
      } catch (error) {
        console.log('⚠️  Failed to install dependencies. Please run "npm install" manually.');
      }
    }

    // Test database connection
    console.log('\n🔌 Testing database connection...');
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
    console.error('❌ Setup failed:', (error as Error).message);
    process.exit(1);
  }
};

// Run the setup
if (require.main === module) {
  quickSetup().catch(console.error);
}

export default quickSetup;
