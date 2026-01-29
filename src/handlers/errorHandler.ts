import { AppError } from '@/utils/AppError.js';
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('ERROR:', err);

  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};
