import { Request } from 'express';
import { InitResponseType } from './types/index.js';

type Init<T> = {
  status: number;
  message: string;
  result: T;
}

declare global {
  namespace Express {
    interface Request {
      resultState: InitResponseType<R>;

    }

  }
};

interface R {};