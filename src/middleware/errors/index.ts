import { NextFunction, Request, Response } from 'express';
import { Error } from '../../@types';
import consola from 'consola';

interface OptionalError {
  status: number;
  message: string;
  stack?: string;
}

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  // Log error
  consola.error(err);
  const error: OptionalError = {
    status: err.status || 500,
    message: err.message
  };

  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  res.status(err.status || 500).json(error);
}