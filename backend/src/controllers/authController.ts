import { Request, Response } from 'express';
import { users } from '../models/User';
import { signToken } from '../config/jwt';

export function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken({ id: user.id, username: user.username, role: user.role });
  res.json({ token });
}

export function protectedRoute(req: Request, res: Response) {
  res.json({ message: 'Access granted', user: (req as any).user });
}
