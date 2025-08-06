<<<<<<< HEAD
// This file will be implemented in the future
export {};
=======
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
