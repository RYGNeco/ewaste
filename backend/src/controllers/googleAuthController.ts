import { Request, Response } from 'express';
import User from '../models/User';

// Handle Google Sign In
export const handleGoogleSignIn = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // User doesn't exist - needs registration
      return res.status(404).json({
        needsRegistration: true,
        message: 'User not registered'
      });
    }

    // Check approval status
    if (user.roleApprovalStatus.toString() === 'pending') {
      return res.status(401).json({
        accountStatus: 'pending',
        message: 'Your account is pending approval'
      });
    }

    if (user.roleApprovalStatus.toString() === 'rejected') {
      return res.status(401).json({
        accountStatus: 'rejected',
        message: 'Your account request was rejected'
      });
    }

    // User exists and is approved
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      role: user.role,
      roleApprovalStatus: user.roleApprovalStatus
    };

    return res.json({
      success: true,
      user: userData
    });

  } catch (error) {
    console.error('Google sign in error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

// Handle Google Registration
export const handleGoogleRegistration = async (req: Request, res: Response) => {
  try {
    const {
      email,
      name,
      firstName,
      lastName,
      userType,
      requestedRole
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        accountStatus: existingUser.roleApprovalStatus
      });
    }

    // Create new user
    const user = new User({
      email,
      name,
      firstName,
      lastName,
      userType,
      role: requestedRole,
      roleApprovalStatus: 'pending',
      profileCompleted: true
    });

    await user.save();

    return res.json({
      success: true,
      message: 'Registration successful. Waiting for admin approval.',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        roleApprovalStatus: user.roleApprovalStatus
      }
    });

  } catch (error) {
    console.error('Google registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};
