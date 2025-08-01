import { Request, Response } from 'express';
import { signToken } from '../config/jwt';
import { IUser } from '../models/User';

const generateToken = (user: IUser) => {
  return signToken({ id: user._id, role: user.role });
};

export const oauthCallback = (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Authentication failed' });

  const token = generateToken(req.user as IUser);

  // Store JWT as HttpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  });

  // Redirect user back to frontend
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

export function protectedRoute(req: Request, res: Response) {
  res.json({ message: 'Access granted', user: (req as any).user });
}

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Simple mock authentication for testing
  if (username === 'admin' && password === 'adminpass') {
    const mockUser = {
      _id: 'mock-user-id',
      role: 'admin',
      username: 'admin'
    } as unknown as IUser;
    
    const token = generateToken(mockUser);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
