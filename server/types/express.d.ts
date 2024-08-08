// types/express.d.ts

import { Request } from 'express';

// Extend the Request interface with the `id` property
declare global {
  namespace Express {
    interface Request {
      id?: string; // You can replace `string` with the appropriate type if different
    }
  }
}
