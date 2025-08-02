# Rygneco E-Waste Tracker - Setup Guide

## 🚀 Quick Start

This guide will help you set up the complete authentication and role-based access control system for the Rygneco E-Waste Tracker application.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Google OAuth credentials
- Git

## 🔧 Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rygneco-ewaste-tracker
```

### 2. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/rygneco

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Google OAuth (Required for authentication)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Super Admin Setup
SUPER_ADMIN_EMAIL=superadmin@rygneco.com
SUPER_ADMIN_NAME=Super Administrator
SUPER_ADMIN_FIRST_NAME=Super
SUPER_ADMIN_LAST_NAME=Administrator

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
PORT=5000
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set up OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
7. Copy the Client ID and Client Secret to your `.env` file

## 🗄️ Database Setup

### 1. Start MongoDB
```bash
# Local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Verify Database Connection
```bash
cd backend
npm run test-setup
```

This will test the database connection and show current data.

## 👑 Super Admin Setup

### 1. Create Super Admin User
```bash
cd backend
npm run setup-super-admin
```

This creates the initial Super Admin user with full system access.

### 2. Verify Super Admin Creation
```bash
npm run test-setup
```

You should see:
```
✅ Super Admin found:
   Email: superadmin@rygneco.com
   Name: Super Administrator
   Role: super_admin
   Status: active
```

## 🚀 Start the Application

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Start Frontend Application
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🧪 Testing the Setup

### 1. Test API Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Rygneco E-Waste Tracker API is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development",
  "database": {
    "status": "connected",
    "name": "rygneco"
  },
  "version": "1.0.0"
}
```

### 2. Test Authentication Flow

1. Open `http://localhost:3000`
2. Click "Sign in with Google"
3. Complete the OAuth flow
4. You should be redirected to `/complete-profile`
5. Fill out the profile form
6. Test the role approval process

## 👥 User Types & Roles

### Super Admin
- **Access**: Full system access
- **Capabilities**: Approve/reject role requests, manage users
- **Setup**: Created via setup script

### Employees
- **Roles**: Admin, Inventory Manager, Transporter, Coordinator
- **Flow**: Request roles → Wait for approval → Access dashboard
- **Status**: pending → approved/rejected

### Partners
- **Role**: Partner
- **Flow**: Immediate access after registration
- **Capabilities**: Manage pickups, view batch history

## 🔐 Authentication Flow

### New User Registration
1. User clicks "Sign in with Google"
2. Google OAuth authentication
3. Redirect to `/complete-profile`
4. Select user type (Employee/Partner)
5. Fill required information
6. For employees: Role request created
7. For partners: Immediate access granted

### Existing User Login
1. User clicks "Sign in with Google"
2. System checks user status
3. Redirect based on role approval status:
   - Pending → `/pending-approval`
   - Approved → `/admin`
   - Rejected → `/role-rejected`
   - Partner → `/partner-dashboard`

## 🛠️ API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/complete-profile` - Complete profile
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Role Management (Super Admin Only)
- `GET /api/role-requests/pending` - Get pending requests
- `GET /api/role-requests` - Get all requests
- `PUT /api/role-requests/:id/approve` - Approve request
- `PUT /api/role-requests/:id/reject` - Reject request
- `GET /api/role-requests/stats` - Get statistics

## 🔍 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongosh
# or
mongo

# Check connection string in .env
echo $MONGODB_URI
```

#### 2. Google OAuth Errors
- Verify Client ID and Secret in `.env`
- Check redirect URIs in Google Cloud Console
- Ensure OAuth consent screen is configured

#### 3. JWT Token Issues
- Verify JWT_SECRET is set in `.env`
- Check cookie settings for domain/secure flags
- Clear browser cookies and try again

#### 4. Role Approval Not Working
```bash
# Check if Super Admin exists
npm run test-setup

# Create Super Admin if missing
npm run setup-super-admin
```

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm run dev

# Check logs for detailed error messages
```

## 📊 Database Models

### User Collection
- Stores user information, roles, and approval status
- Indexed by email and userType

### Partner Collection
- Stores organization information and pickup history
- Indexed by contact email and organization name

### RoleRequest Collection
- Tracks role approval requests
- Indexed by employee ID and status

## 🔒 Security Features

### JWT Token Management
- HttpOnly cookies for token storage
- Secure flag in production
- SameSite attribute configuration
- 1-hour token expiration

### Role-Based Access Control
- Middleware-based authorization
- Route-level protection
- User type validation
- Role approval workflow

### Data Validation
- Input sanitization
- Schema validation
- Role enumeration
- Status tracking

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Database Status
```bash
npm run test-setup
```

### Log Monitoring
- Check console logs for errors
- Monitor authentication attempts
- Track role approval/rejection events

## 🚀 Production Deployment

### Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=production-secret-key
FRONTEND_URL=https://yourdomain.com
```

### Security Checklist
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up proper MongoDB authentication
- [ ] Enable Google OAuth for production domain
- [ ] Set up monitoring and logging

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Run the test setup script
4. Check the logs for detailed error messages
5. Ensure MongoDB is running and accessible

For additional help, refer to the `AUTHENTICATION_FLOW.md` file for detailed technical documentation. 