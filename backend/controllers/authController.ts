import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
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
