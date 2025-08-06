import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function authorizeRoles(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
}

export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ error: 'Forbidden: Super Admin access required' });
  }
  next();
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'super_admin')) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
}

export function requireEmployee(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.userType !== 'employee') {
    return res.status(403).json({ error: 'Forbidden: Employee access required' });
  }
  next();
}

export function requirePartner(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.userType !== 'partner') {
    return res.status(403).json({ error: 'Forbidden: Partner access required' });
  }
  next();
}

export function requireApprovedEmployee(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.userType !== 'employee') {
    return res.status(403).json({ error: 'Forbidden: Employee access required' });
  }
  
  if (req.user.roleApprovalStatus !== 'approved') {
    return res.status(403).json({ error: 'Forbidden: Role approval required' });
  }
  
  next();
}
