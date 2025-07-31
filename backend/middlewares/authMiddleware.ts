import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Check for token in cookies first, then in Authorization header
  const cookieToken = req.cookies?.token;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  
  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Authentication token is missing'
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable is not defined');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Authentication is not properly configured'
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('Authentication error:', error.message || 'Unknown error');
    return res.status(401).json({ 
      error: 'Invalid token',
      message: 'The provided authentication token is invalid or expired'
    });
  }
};
