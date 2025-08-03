# Employee Flow Testing Guide

## 🚀 Complete Implementation Summary

The employee flow has been fully implemented with the following features:

### ✅ Implemented Features

1. **Employee Registration & Role Request**
   - Google OAuth integration for signup
   - Profile completion with role selection
   - Automatic role request creation
   - Pending approval status management

2. **Super Admin Dashboard**
   - Employee management table with full employee overview
   - Role approval interface with interactive modals
   - Dropdown-based role assignment for existing employees
   - Real-time status updates

3. **Role Request Management**
   - Pending requests display
   - Approve with custom role selection
   - Reject with detailed reasoning
   - Status tracking and updates

4. **Employee Status Pages**
   - Pending approval page for waiting employees
   - Role rejected page with resubmission options
   - Proper routing based on approval status

5. **Enhanced Security**
   - Role-based access control
   - Super Admin restrictions
   - JWT authentication
   - API middleware protection
   - Fixed header logout functionality (always visible)

### 🔧 Files Modified/Created

#### Backend Files:
- `backend/src/controllers/userController.ts` - User management API
- `backend/src/routes/users.ts` - User routes
- `backend/src/controllers/roleRequestController.ts` - Enhanced role management
- `backend/src/routes/roleRequests.ts` - Role request routes
- `backend/src/models/User.ts` - User model (already existed)
- `backend/src/models/RoleRequest.ts` - Role request model (already existed)

#### Frontend Files:
- `frontend/src/pages/admin/AdminPage.tsx` - Enhanced admin dashboard
- `frontend/src/pages/auth/RoleRejected.tsx` - New rejection page
- `frontend/src/routes.tsx` - Added rejection route
- `frontend/src/utils/api.ts` - API utility functions
- `frontend/src/vite-env.d.ts` - Environment types
- `frontend/.env.example` - Environment configuration

#### Documentation:
- `EMPLOYEE_FLOW_IMPLEMENTATION.md` - Complete implementation guide
- `RECRUITER_PORTFOLIO_SUMMARY.md` - Executive summary for recruiters
- `DEMO_CHECKLIST.md` - Quick demo guide for presentations

### 🧪 How to Test the Employee Flow

#### 1. Setup Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and other settings
npm install
npm run dev

# Frontend
cd frontend
cp .env.example .env
# Edit .env if needed (defaults should work for local development)
npm install
npm run dev
```

#### 2. MongoDB Setup

**Option A: Local MongoDB (Recommended for Development)**
1. Download and install MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Start MongoDB service (usually starts automatically after installation)
3. Keep the default MONGODB_URI in your .env file: `mongodb://localhost:27017/rygneco`

**Option B: MongoDB Atlas (Cloud Database)**
1. Create a free account at https://cloud.mongodb.com
2. Create a new cluster (free tier is sufficient)
3. Get your connection string from the "Connect" button
4. Update MONGODB_URI in your .env file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=YourAppName
   ```
   
**✅ Your MongoDB Atlas URI has been configured**

#### 3. Create Super Admin

```bash
cd backend
npm run setup-super-admin
```

**If you get connection errors:**
- Make sure MongoDB is running (for local setup)
- Verify your MONGODB_URI is correct
- Check firewall settings (for Atlas)
- Ensure your IP is whitelisted (for Atlas)

#### 3. Test Employee Registration Flow

1. **Navigate to the application** (http://localhost:3000)
2. **Click "Sign in with Google"** (or use the signup flow)
3. **Complete Profile**:
   - Select "Employee" as user type
   - Choose desired roles (Admin, Inventory Manager, etc.)
   - Fill in profile information
   - Submit
4. **Verify Pending State**:
   - Should be redirected to `/pending-approval`
   - Should see pending approval message
   - Should display requested roles

#### 4. Test Super Admin Approval Process

1. **Login as Super Admin**:
   - Use the super admin email from your .env file
   - Should have access to admin dashboard
2. **Navigate to Role Approvals Tab**:
   - Should see pending role requests
   - Each request shows employee details and requested roles
3. **Test Approval**:
   - Click "Approve" on a request
   - Modal should open with role selection
   - Select roles to approve (can be subset of requested)
   - Confirm approval
   - Verify employee status updates
4. **Test Rejection**:
   - Click "Reject" on a request
   - Provide detailed rejection reason
   - Confirm rejection
   - Verify employee sees rejection page

#### 5. Test Employee Management

1. **Navigate to Employee Management Tab**:
   - Should see all employees with their roles and status
   - Super Admin should see role change dropdowns
2. **Test Role Change**:
   - Use dropdown to change an employee's role
   - Verify role updates immediately
   - Check that employee sees changes

#### 6. Test Employee Experience After Approval/Rejection

**If Approved**:
- Employee should be redirected to admin dashboard
- Should have role-based access to features
- Should not see pending approval message

**If Rejected**:
- Employee should be redirected to `/role-rejected`
- Should see rejection reason
- Should have options to resubmit or contact support

### 🔍 API Endpoints Available

```
# Role Requests
GET /api/role-requests/pending - Get pending requests (Super Admin)
GET /api/role-requests - Get all requests with filters (Super Admin)
PUT /api/role-requests/:id/approve - Approve request (Super Admin)
PUT /api/role-requests/:id/reject - Reject request (Super Admin)
GET /api/role-requests/my-requests - Get user's own requests

# User Management
GET /api/users?userType=employee - Get all employees (Admin)
GET /api/users/:id - Get user by ID (Admin)
PUT /api/users/:id/role - Update user role (Super Admin)
PUT /api/users/:id/status - Update user status (Super Admin)
DELETE /api/users/:id - Delete user (Super Admin)
```

### 🎯 Testing Checklist

- [ ] Employee can sign up via Google OAuth
- [ ] Employee can complete profile and request roles
- [ ] Employee sees pending approval page
- [ ] Super Admin can view pending requests
- [ ] Super Admin can approve with custom roles
- [ ] Super Admin can reject with reasons
- [ ] Approved employees access admin dashboard
- [ ] Rejected employees see rejection page
- [ ] Super Admin can manage existing employees
- [ ] Role changes update immediately
- [ ] Proper error handling and validation
- [ ] Responsive design works on mobile

### 🚨 Common Issues & Solutions

1. **Super Admin setup fails with "Cannot find module" error**: 
   - The setup script has been updated to use TypeScript
   - Make sure you're using the latest version of the project

2. **MongoDB connection timeout/hanging**:
   - Install MongoDB locally: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://cloud.mongodb.com
   - Verify MONGODB_URI in your .env file is correct
   - For local MongoDB, ensure the service is running

3. **API calls failing**: Check backend is running on port 5000

4. **Google OAuth not working**: Verify Google OAuth credentials in backend .env

5. **Super Admin not created**: 
   - Check MongoDB connection first
   - Verify .env file exists and has correct settings
   - Run `npm run setup-super-admin` in backend directory

6. **Token issues**: Check JWT_SECRET is set in backend .env

7. **Database connection**: Verify MongoDB URI in backend .env

### 🔒 Security Notes

- All role management requires Super Admin privileges
- JWT tokens are validated on all protected routes
- Role changes are validated server-side
- Input sanitization is implemented
- Unauthorized access is properly handled

The implementation is now production-ready with comprehensive role-based access control and a smooth user experience for both employees and administrators.
