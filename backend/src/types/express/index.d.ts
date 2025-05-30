
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
    cleanBody?: any;
    role?: string;
    name?: string;
    email? : email
  }
}