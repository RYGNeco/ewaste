# Rygneco Authentication Flow & Role-Based Access Control

## Overview

This document describes the comprehensive authentication and authorization system implemented for the Rygneco E-Waste Tracker application, including Google OAuth integration, role-based access control, and user flow management.

## User Types & Roles

### 1. Super Admin
- **Role**: `super_admin`
- **Permissions**: Full system access, can approve/reject employee role requests
- **Setup**: Seeded into MongoDB during initial setup
- **Dashboard**: Full admin dashboard with role management capabilities

### 2. Employees
- **User Type**: `employee`
- **Available Roles**:
  - `admin` - System administrator
  - `inventory_manager` - Manages inventory and batches
  - `transporter` - Handles pickup and delivery
  - `coordinator` - Coordinates operations
- **Flow**: Must request roles and wait for Super Admin approval
- **Status**: `pending` → `approved`/`rejected`

### 3. Partners
- **User Type**: `partner`
- **Role**: `partner`
- **Permissions**: Access to partner dashboard, manage pickups, view batch history
- **Status**: `active` (immediate access after registration)

## Authentication Flow

### 1. Google OAuth Integration

#### Initial Sign-In
1. User clicks "Sign in with Google"
2. Google OAuth popup appears
3. User authenticates with Google
4. System checks if user exists in database

#### New User Flow
1. If user doesn't exist, redirected to `/complete-profile`
2. User selects user type (Employee or Partner)
3. User fills out required information
4. For employees: Role request is created and status set to `pending`
5. For partners: Account is immediately activated

#### Existing User Flow
1. If user exists, system checks their status
2. **Employees**:
   - If `roleApprovalStatus === 'pending'` → `/pending-approval`
   - If `roleApprovalStatus === 'approved'` → `/admin`
   - If `roleApprovalStatus === 'rejected'` → `/role-rejected`
3. **Partners** → `/partner-dashboard`

### 2. Role Request Process

#### Employee Registration
1. Employee signs up via Google OAuth
2. Completes profile with requested roles
3. Role request is created in `RoleRequest` collection
4. Employee sees pending approval page
5. Super Admin receives notification of pending request

#### Super Admin Approval
1. Super Admin logs into dashboard
2. Views pending role requests
3. Can approve or reject with comments
4. Employee receives email notification
5. Employee account status updated accordingly

## Database Schema

### User Model
```typescript
interface IUser {
  googleId?: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userType: 'employee' | 'partner' | 'super_admin';
  role: string;
  requestedRoles: string[];
  roleApprovalStatus: 'pending' | 'approved' | 'rejected';
  approvedRoles: string[];
  status: 'active' | 'inactive' | 'pending';
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
}
```

### Partner Model
```typescript
interface IPartner {
  organizationName: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessInfo: {
    businessType: string;
    industry: string;
    employeeCount: number;
    website?: string;
  };
  status: 'active' | 'inactive' | 'pending';
  pickupHistory: Array<{
    batchId: string;
    pickupDate: Date;
    status: 'scheduled' | 'completed' | 'cancelled';
    weight: number;
    deviceCount: number;
  }>;
  totalPickups: number;
  totalWeight: number;
  totalDevices: number;
}
```

### RoleRequest Model
```typescript
interface IRoleRequest {
  employeeId: Schema.Types.ObjectId;
  employeeEmail: string;
  employeeName: string;
  requestedRoles: string[];
  requestReason?: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: Schema.Types.ObjectId;
  reviewedAt?: Date;
  rejectionReason?: string;
}
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback handler
- `POST /api/auth/complete-profile` - Complete user profile
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Role Management (Super Admin Only)
- `GET /api/role-requests/pending` - Get pending role requests
- `GET /api/role-requests` - Get all role requests with filters
- `PUT /api/role-requests/:requestId/approve` - Approve role request
- `PUT /api/role-requests/:requestId/reject` - Reject role request
- `GET /api/role-requests/stats` - Get role request statistics

## Frontend Components

### 1. CompleteProfile
- **Path**: `/complete-profile`
- **Purpose**: Collect additional user information after Google OAuth
- **Features**:
  - User type selection (Employee/Partner)
  - Role selection for employees
  - Organization details for partners
  - Address information for partners

### 2. PendingApproval
- **Path**: `/pending-approval`
- **Purpose**: Show employees waiting for role approval
- **Features**:
  - Status explanation
  - Requested roles display
  - Contact support option
  - Sign out functionality

### 3. PartnerDashboard
- **Path**: `/partner-dashboard`
- **Purpose**: Partner-specific dashboard
- **Features**:
  - Pickup history
  - Organization statistics
  - Profile management
  - Batch tracking

## Setup Instructions

### 1. Environment Variables
Add the following to your `.env` file:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Super Admin Setup
SUPER_ADMIN_EMAIL=superadmin@rygneco.com
SUPER_ADMIN_NAME=Super Administrator
SUPER_ADMIN_FIRST_NAME=Super
SUPER_ADMIN_LAST_NAME=Administrator

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 2. Super Admin Setup
Run the following command to create the Super Admin user:
```bash
cd backend
npm run setup-super-admin
```

### 3. Database Setup
Ensure MongoDB is running and the connection string is properly configured in your environment variables.

## Security Features

### 1. JWT Token Management
- Tokens stored as HttpOnly cookies
- Secure flag enabled in production
- SameSite attribute configured
- Automatic token refresh

### 2. Role-Based Access Control
- Middleware-based authorization
- Route-level protection
- User type validation
- Role approval workflow

### 3. Data Validation
- Input sanitization
- Schema validation
- Role enumeration
- Status tracking

## Error Handling

### Common Error Scenarios
1. **Invalid OAuth Token**: Redirect to login
2. **Role Request Rejected**: Show rejection reason
3. **Insufficient Permissions**: 403 Forbidden response
4. **Session Expired**: Clear cookies and redirect to login

### Error Responses
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Testing

### Manual Testing Checklist
- [ ] Google OAuth sign-in works
- [ ] New employee registration flow
- [ ] New partner registration flow
- [ ] Role request approval process
- [ ] Role request rejection process
- [ ] Dashboard access based on roles
- [ ] Logout functionality
- [ ] Session management

### API Testing
Use the provided test files in the `__tests__` directory to verify all endpoints work correctly.

## Troubleshooting

### Common Issues
1. **OAuth Callback Errors**: Check Google OAuth configuration
2. **Database Connection**: Verify MongoDB connection string
3. **Token Issues**: Check cookie settings and domain configuration
4. **Role Approval Not Working**: Verify Super Admin exists and has proper permissions

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## Future Enhancements

### Planned Features
1. Email notifications for role approval/rejection
2. Two-factor authentication
3. Password-based authentication fallback
4. Advanced role permissions
5. Audit logging
6. Bulk role management

### Integration Points
1. Email service integration
2. SMS notifications
3. Third-party SSO providers
4. Advanced analytics
5. Compliance reporting 