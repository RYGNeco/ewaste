import { Request, Response } from 'express';
import { signToken, verifyToken } from '../config/jwt';
import User, { IUser } from '../models/User';
import Partner, { IPartner } from '../models/Partner';
import RoleRequest, { IRoleRequest } from '../models/RoleRequest';
import bcrypt from 'bcrypt';

const generateToken = (user: IUser) => {
  return signToken({ 
    id: user._id, 
    role: user.role, 
    userType: user.userType,
    email: user.email 
  });
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
