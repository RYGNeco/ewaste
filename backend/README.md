# Rygneco E-Waste Tracker - Backend

This is the backend API for the Rygneco E-Waste Tracker application, providing authentication, role management, and data management services.

## 🚀 Quick Start

### 1. Quick Setup (Recommended)
```bash
npm run quick-setup
```

This will:
- Create a `.env` file from template
- Check MongoDB connection
- Install dependencies
- Test database connection
- Provide next steps

### 2. Manual Setup

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Google OAuth credentials

#### Installation
```bash
# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env with your values
# - MONGODB_URI
# - JWT_SECRET
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET

# Setup Super Admin
npm run setup-super-admin

# Start development server
npm run dev
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run quick-setup` - Quick setup wizard
- `npm run setup-super-admin` - Create Super Admin user
- `npm run test-setup` - Test database connection

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/rygneco

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth (Required)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Super Admin
SUPER_ADMIN_EMAIL=superadmin@rygneco.com
SUPER_ADMIN_NAME=Super Administrator

# Application
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=5000
```

## 🗄️ Database Setup

### Start MongoDB
```bash
# Local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Test Connection
```bash
npm run test-setup
```

## 🔐 Authentication Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:5000/api/auth/google/callback`
6. Copy Client ID and Secret to `.env`

### Super Admin Setup
```bash
npm run setup-super-admin
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Test database connection
npm run test-setup
```

## 📚 Documentation

- [Setup Guide](../SETUP_GUIDE.md) - Complete setup instructions
- [Authentication Flow](../AUTHENTICATION_FLOW.md) - Technical authentication details
- [API Documentation](../docs/API.md) - API endpoint documentation

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure production MongoDB
4. Set up Google OAuth for production domain
5. Enable HTTPS
6. Configure CORS properly

## 🔍 Troubleshooting

### Common Issues

#### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

#### Google OAuth Errors
- Verify Client ID and Secret in `.env`
- Check redirect URIs in Google Cloud Console
- Ensure OAuth consent screen is configured

#### JWT Token Issues
- Verify JWT_SECRET is set in `.env`
- Check cookie settings
- Clear browser cookies

#### Tests Failing
```bash
# Check database connection
npm run test-setup

# Run tests with verbose output
VERBOSE=true npm test
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Run the test setup script
4. Check the logs for detailed error messages
5. Ensure MongoDB is running and accessible

For additional help, refer to the documentation files in the project root. 