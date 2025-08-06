import { auth } from '../config/firebase';

import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const updateUserClaims = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { uid, claims } = req.body;

    // Verify admin status
    if (!req.user?.uid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }
    const adminId = req.user.uid;
    const adminUser = await auth.getUser(adminId);
    const adminClaims = adminUser.customClaims || {};

    if (!adminClaims.role || adminClaims.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized. Only admins can update user claims.' 
      });
    }

    // Get current claims
    const user = await auth.getUser(uid);
    const currentClaims = user.customClaims || {};

    // Update claims
    await auth.setCustomUserClaims(uid, {
      ...currentClaims,
      ...claims,
      updatedAt: Date.now()
    });

    return res.json({ 
      success: true, 
      message: 'User claims updated successfully' 
    });
  } catch (error) {
    console.error('Error updating user claims:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update user claims' 
    });
  }
};
