import { Request, Response } from 'express';
import { signToken, verifyToken } from '../config/jwt';
import User, { IUser } from '../models/User';
import Partner, { IPartner } from '../models/Partner';
import RoleRequest, { IRoleRequest } from '../models/RoleRequest';
import bcrypt from 'bcrypt';
import { auth } from '../config/firebase';
import { TwoFactorService } from '../services/twoFactorService';
import { sendEmail } from '../services/emailService';
import { AdminNotificationService } from '../services/adminNotificationService';

const generateToken = (user: IUser) => {
  return signToken({ 
    id: user._id, 
    role: user.role, 
    userType: user.userType,
    email: user.email 
  });
};

// New Google Sign-In endpoint for Firebase Auth
export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { idToken, googleId, email, name, profilePicture, emailVerified } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify Firebase ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
      console.log('✅ Token verified successfully');
    } catch (error: any) {
      console.error('❌ Token verification failed:', error);
      return res.status(401).json({ 
        error: 'Invalid ID token',
        details: error.message 
      });
    }
    
    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid ID token' });
    }
    
    // Verify email matches
    if (decodedToken.email !== email) {
      console.error('❌ Email mismatch:', { tokenEmail: decodedToken.email, providedEmail: email });
      return res.status(401).json({ error: 'Email verification failed' });
    }

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [
        { email: email },
        { googleId: googleId }
      ]
    });

    let isNewUser = false;

    if (!user) {
      console.log('👤 New user detected, returning registration required response');
      // For new users, don't create account automatically - they need to register
      return res.status(404).json({ 
        error: 'Account not found',
        status: 'registration_required',
        isNewUser: true,
        message: 'Please complete account registration first',
        needsRegistration: true
      });
    } else {
      console.log('✅ Existing user found:', user.email);
      
      // Check account approval status
      if ((user.accountStatus as string) === 'pending') {
        return res.status(403).json({
          error: 'Account pending approval',
          message: 'Your account request is pending admin approval. Please wait for confirmation.',
          accountStatus: 'pending',
          canLogin: false
        });
      }
      
      if ((user.accountStatus as string) === 'rejected') {
        return res.status(403).json({
          error: 'Account rejected',
          message: 'Your account request has been rejected. Please contact support for more information.',
          accountStatus: 'rejected',
          rejectionReason: user.rejectionReason,
          canLogin: false
        });
      }
      
      if ((user.accountStatus as string) !== 'approved') {
        return res.status(403).json({
          error: 'Account access denied',
          message: 'Your account does not have the required approval status.',
          accountStatus: user.accountStatus,
          canLogin: false
        });
      }
    }

    // Generate JWT token
    const token = generateToken(user);

    // Check if 2FA is enabled
    const requires2FA = user.twoFactorEnabled || false;

    // Send login notification email
    try {
      await sendEmail({
        to: user.email,
        subject: 'New Login to Your Account',
        template: 'login-notification',
        data: {
          name: user.name,
          timestamp: new Date().toISOString(),
          ipAddress: req.ip || req.connection.remoteAddress || 'Unknown',
          userAgent: req.headers['user-agent'] || 'Unknown'
        }
      });
    } catch (emailError) {
      console.warn('Failed to send login notification email:', emailError);
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        userType: user.userType,
        role: user.role,
        roleApprovalStatus: user.roleApprovalStatus,
        profileCompleted: user.profileCompleted || false,
        isActive: user.isActive,
        twoFactorEnabled: user.twoFactorEnabled || false
      },
      token: requires2FA ? null : token, // Don't provide token if 2FA is required
      isNewUser,
      needsProfileCompletion: !user.profileCompleted || !user.userType,
      requires2FA,
      message: requires2FA ? 'Please provide 2FA verification code' : 'Login successful'
    });

  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    return res.status(500).json({ 
      error: 'Google sign-in failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Complete Profile endpoint (updated)
export const completeProfileNew = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { 
      userType, 
      firstName, 
      lastName, 
      phone, 
      requestedRoles,
      organization,
      businessType,
      address 
    } = req.body;

    // Find and update user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile
    user.userType = userType as any;
    user.firstName = firstName;
    user.lastName = lastName;
    user.name = `${firstName} ${lastName}`;
    user.phone = phone;
    user.profileCompleted = true;

    if (userType === 'employee') {
      user.roleApprovalStatus = 'pending';
      user.requestedRoles = requestedRoles || [];
      user.status = 'pending';

      // Create role request if roles are specified
      if (requestedRoles && requestedRoles.length > 0) {
        const roleRequest = new RoleRequest({
          employeeId: user._id,
          employeeEmail: user.email,
          employeeName: user.name,
          requestedRoles: requestedRoles,
          requestReason: 'Profile completion role request',
          status: 'pending',
          priority: 'medium'
        });
        await roleRequest.save();
      }
    } else if (userType === 'partner') {
      user.roleApprovalStatus = 'approved';
      user.role = 'partner';
      user.status = 'active';
      user.organization = organization;

      // Create partner record if needed
      const existingPartner = await Partner.findOne({ email: user.email });
      if (!existingPartner) {
        const partner = new Partner({
          name: user.name,
          email: user.email,
          phone: user.phone,
          organizationName: organization || user.name,
          businessType: businessType || 'Other',
          address: address,
          status: 'active',
          userId: user._id
        });
        await partner.save();
      }
    }

    await user.save();

    console.log('✅ Profile completed for user:', user.email);

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        role: user.role,
        roleApprovalStatus: user.roleApprovalStatus,
        profileCompleted: user.profileCompleted,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('❌ Profile completion error:', error);
    return res.status(500).json({ 
      error: 'Profile completion failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get profile status
export const getProfileStatus = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      profileCompleted: user.profileCompleted || false,
      needsApproval: user.userType === 'employee' && user.roleApprovalStatus === 'pending',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        roleApprovalStatus: user.roleApprovalStatus,
        profileCompleted: user.profileCompleted
      }
    });

  } catch (error) {
    console.error('❌ Profile status check error:', error);
    return res.status(500).json({ error: 'Failed to check profile status' });
  }
};

// Google OAuth callback handler
export const oauthCallback = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  const googleUser = req.user as any;
  
  try {
    // Check if user already exists
    let user = await User.findOne({ email: googleUser.emails[0].value });
    
    if (!user) {
      // User doesn't exist, redirect to complete profile
      const token = signToken({ 
        email: googleUser.emails[0].value,
        googleId: googleUser.id,
        isNewUser: true
      });
      
      res.cookie('tempToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 10 * 60 * 1000 // 10 minutes
      });
      
      return res.redirect(`${process.env.FRONTEND_URL}/complete-profile`);
    }

    // User exists, generate proper token and redirect
    const token = generateToken(user);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    });

    // Redirect based on user type and status
    if (user.userType === 'employee') {
      if (user.roleApprovalStatus === 'pending') {
        return res.redirect(`${process.env.FRONTEND_URL}/pending-approval`);
      } else if (user.roleApprovalStatus === 'approved') {
        return res.redirect(`${process.env.FRONTEND_URL}/admin`);
      } else {
        return res.redirect(`${process.env.FRONTEND_URL}/role-rejected`);
      }
    } else if (user.userType === 'partner') {
      return res.redirect(`${process.env.FRONTEND_URL}/partner-dashboard`);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Complete profile after Google OAuth
export const completeProfile = async (req: Request, res: Response) => {
  try {
    const { userType, firstName, lastName, requestedRoles, organizationName, businessInfo } = req.body;
    
    // Verify temp token
    const tempToken = req.cookies.tempToken;
    if (!tempToken) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    // Decode token to get user info
    const decoded = verifyToken(tempToken) as any;
    
    if (userType === 'employee') {
      // Create employee user
      const user = new User({
        googleId: decoded.googleId,
        email: decoded.email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        userType: 'employee',
        requestedRoles,
        roleApprovalStatus: 'pending',
        status: 'pending'
      });

      await user.save();

      // Create role request
      const roleRequest = new RoleRequest({
        employeeId: user._id,
        employeeEmail: user.email,
        employeeName: user.name,
        requestedRoles,
        status: 'pending'
      });

      await roleRequest.save();

      // Clear temp token and set proper token
      res.clearCookie('tempToken');
      const token = generateToken(user);
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
      });

      res.json({ 
        message: 'Profile completed successfully',
        redirectTo: '/pending-approval'
      });

    } else if (userType === 'partner') {
      // Create partner user and partner profile
      const user = new User({
        googleId: decoded.googleId,
        email: decoded.email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        userType: 'partner',
        role: 'partner',
        status: 'active'
      });

      await user.save();

      const partner = new Partner({
        organizationName,
        contactPerson: {
          firstName,
          lastName,
          email: decoded.email,
          phone: req.body.phone || ''
        },
        address: req.body.address,
        businessInfo,
        status: 'active'
      });

      await partner.save();

      // Clear temp token and set proper token
      res.clearCookie('tempToken');
      const token = generateToken(user);
      
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
      });

      res.json({ 
        message: 'Profile completed successfully',
        redirectTo: '/partner-dashboard'
      });
    }

  } catch (error) {
    console.error('Complete profile error:', error);
    res.status(500).json({ error: 'Failed to complete profile' });
  }
};

// Get current user info
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      role: user.role,
      requestedRoles: user.requestedRoles,
      roleApprovalStatus: user.roleApprovalStatus,
      approvedRoles: user.approvedRoles,
      status: user.status
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};

// Logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.clearCookie('tempToken');
  res.json({ message: 'Logged out successfully' });
};

// Protected route middleware
export function protectedRoute(req: Request, res: Response) {
  res.json({ message: 'Access granted', user: (req as any).user });
}

// Legacy login (for non-Google auth)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For now, skip password verification since we're using Google OAuth
    // In production, you'd want to implement proper password hashing
    
    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    });

    res.json({ 
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        role: user.role,
        roleApprovalStatus: user.roleApprovalStatus
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Complete 2FA Login Process
export const complete2FALogin = async (req: Request, res: Response) => {
  try {
    const { userId, twoFactorCode, isBackupCode } = req.body;

    if (!userId || !twoFactorCode) {
      return res.status(400).json({ error: 'User ID and 2FA code are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.twoFactorEnabled) {
      return res.status(400).json({ error: '2FA is not enabled for this user' });
    }

    // Check if account is locked
    if (TwoFactorService.isAccountLocked(user)) {
      return res.status(423).json({ 
        error: 'Account is temporarily locked due to failed attempts',
        lockedUntil: user.lockedUntil?.toISOString()
      });
    }

    let isValid = false;

    if (isBackupCode) {
      // Verify backup code
      isValid = await TwoFactorService.verifyBackupCode(userId, twoFactorCode);
    } else {
      // Verify TOTP token
      if (!user.twoFactorSecret) {
        return res.status(400).json({ error: '2FA secret not found' });
      }
      isValid = TwoFactorService.verifyToken(twoFactorCode, user.twoFactorSecret);
    }

    if (!isValid) {
      // Handle failed attempt
      await TwoFactorService.handleFailedAttempt(userId);
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Reset login attempts on successful verification
    await TwoFactorService.resetLoginAttempts(userId);

    // Generate final JWT token
    const token = generateToken(user);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        userType: user.userType,
        role: user.role,
        roleApprovalStatus: user.roleApprovalStatus,
        profileCompleted: user.profileCompleted || false,
        isActive: user.isActive,
        twoFactorEnabled: user.twoFactorEnabled || false
      },
      message: '2FA verification successful, login complete'
    });

  } catch (error) {
    console.error('Complete 2FA login error:', error);
    return res.status(500).json({ error: 'Failed to complete 2FA login' });
  }
};

// Manual Registration endpoint
export const manualRegister = async (req: Request, res: Response) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      confirmPassword,
      userType,
      requestedRole,
      organization 
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    if (!userType || !['employee', 'partner'].includes(userType)) {
      return res.status(400).json({ error: 'Valid user type is required' });
    }

    if (!requestedRole) {
      return res.status(400).json({ error: 'Requested role is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with pending status
    const user = new User({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      userType,
      requestedRoles: [requestedRole],
      organization: organization || '',
      accountStatus: 'pending',
      status: 'pending',
      profileCompleted: true,
      registrationMethod: 'manual',
      roleApprovalStatus: 'pending',
      isActive: true
    });

    await user.save();
    console.log('✅ New manual registration:', user.email);

    // Send notification to super admins
    try {
      await AdminNotificationService.notifyAdminsNewAccountRequest(user);
    } catch (emailError) {
      console.warn('Failed to send admin notification email:', emailError);
    }

    return res.status(201).json({
      success: true,
      message: 'Account request submitted successfully. Please wait for admin approval.',
      data: {
        email: user.email,
        name: user.name,
        userType: user.userType,
        requestedRole: requestedRole,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('❌ Manual registration error:', error);
    return res.status(500).json({ 
      error: 'Registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Google OAuth Registration (for new users)
export const googleRegister = async (req: Request, res: Response) => {
  try {
    const { 
      idToken, 
      googleId, 
      email, 
      name, 
      profilePicture,
      userType,
      requestedRole,
      organization 
    } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid ID token' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email },
        { googleId: googleId }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    if (!userType || !['employee', 'partner'].includes(userType)) {
      return res.status(400).json({ error: 'Valid user type is required' });
    }

    if (!requestedRole) {
      return res.status(400).json({ error: 'Requested role is required' });
    }

    // Create new user with pending status
    const user = new User({
      googleId: googleId,
      name: name,
      firstName: name?.split(' ')[0] || '',
      lastName: name?.split(' ').slice(1).join(' ') || '',
      email: email,
      profilePicture: profilePicture,
      userType,
      requestedRoles: [requestedRole],
      organization: organization || '',
      accountStatus: 'pending',
      status: 'pending',
      profileCompleted: true,
      registrationMethod: 'google',
      roleApprovalStatus: 'pending',
      isActive: true,
      emailVerified: true
    });

    await user.save();
    console.log('✅ New Google registration:', user.email);

    // Send notification to super admins
    try {
      await AdminNotificationService.notifyAdminsNewAccountRequest(user);
    } catch (emailError) {
      console.warn('Failed to send admin notification email:', emailError);
    }

    return res.status(201).json({
      success: true,
      message: 'Account request submitted successfully. Please wait for admin approval.',
      data: {
        email: user.email,
        name: user.name,
        userType: user.userType,
        requestedRole: requestedRole,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('❌ Google registration error:', error);
    return res.status(500).json({ 
      error: 'Google registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get pending account requests (Super Admin only)
export const getPendingRequests = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    
    if (!currentUser || currentUser.userType !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Super admin privileges required.' });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const result = await AdminNotificationService.getPendingRequests(limit, skip);

    return res.json({
      success: true,
      data: result.requests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(result.total / limit),
        totalRequests: result.total,
        hasMore: result.hasMore
      }
    });

  } catch (error) {
    console.error('❌ Get pending requests error:', error);
    return res.status(500).json({ error: 'Failed to fetch pending requests' });
  }
};

// Approve user account (Super Admin only)
export const approveUserAccount = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const { userId } = req.params;
    const { role } = req.body;

    if (!currentUser || currentUser.userType !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Super admin privileges required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.accountStatus !== 'pending') {
      return res.status(400).json({ error: 'User account is not pending approval' });
    }

    // Update user status
    user.accountStatus = 'approved';
    user.status = 'active';
    user.roleApprovalStatus = 'approved';
    const assignedRole = role || user.requestedRoles[0] || 'employee';
    user.role = assignedRole;
    user.approvedRoles = [assignedRole];
    user.approvedBy = currentUser.id;
    user.approvedAt = new Date();

    await user.save();

    // Send approval notification to user
    try {
      const approver = await User.findById(currentUser.id);
      if (approver) {
        await AdminNotificationService.notifyUserAccountApproved(user, approver);
      }
    } catch (emailError) {
      console.warn('Failed to send approval notification email:', emailError);
    }

    console.log(`✅ User account approved: ${user.email} by ${currentUser.email}`);

    return res.json({
      success: true,
      message: 'User account approved successfully',
      data: {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        approvedAt: user.approvedAt
      }
    });

  } catch (error) {
    console.error('❌ Approve user account error:', error);
    return res.status(500).json({ error: 'Failed to approve user account' });
  }
};

// Reject user account (Super Admin only)
export const rejectUserAccount = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    const { userId } = req.params;
    const { rejectionReason } = req.body;

    if (!currentUser || currentUser.userType !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Super admin privileges required.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.accountStatus !== 'pending') {
      return res.status(400).json({ error: 'User account is not pending approval' });
    }

    // Update user status
    user.accountStatus = 'rejected';
    user.status = 'inactive';
    user.roleApprovalStatus = 'rejected';
    user.rejectionReason = rejectionReason || 'No reason provided';
    user.approvedBy = currentUser.id;
    user.approvedAt = new Date();

    await user.save();

    // Send rejection notification to user
    try {
      await AdminNotificationService.notifyUserAccountRejected(user, rejectionReason);
    } catch (emailError) {
      console.warn('Failed to send rejection notification email:', emailError);
    }

    console.log(`✅ User account rejected: ${user.email} by ${currentUser.email}`);

    return res.json({
      success: true,
      message: 'User account rejected successfully',
      data: {
        userId: user._id,
        email: user.email,
        name: user.name,
        rejectionReason: user.rejectionReason,
        rejectedAt: user.approvedAt
      }
    });

  } catch (error) {
    console.error('❌ Reject user account error:', error);
    return res.status(500).json({ error: 'Failed to reject user account' });
  }
};

// Check approval status
export const getApprovalStatus = async (req: Request, res: Response) => {
  try {
    const currentUser = (req as any).user;
    
    if (!currentUser) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await User.findById(currentUser.id)
      .select('accountStatus status roleApprovalStatus rejectionReason approvedAt createdAt');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      success: true,
      data: {
        accountStatus: user.accountStatus,
        status: user.status,
        roleApprovalStatus: user.roleApprovalStatus,
        rejectionReason: user.rejectionReason,
        approvedAt: user.approvedAt,
        requestDate: user.createdAt,
        canAccessDashboard: user.accountStatus === 'approved' && user.status === 'active'
      }
    });

  } catch (error) {
    console.error('❌ Get approval status error:', error);
    return res.status(500).json({ error: 'Failed to get approval status' });
  }
};
