import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

// Export as an object with both methods for compatibility
export const jwtUtils = {
  sign: signToken,
  verify: verifyToken
};
