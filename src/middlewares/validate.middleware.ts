import { AppError } from '@/utils/AppError.js';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod/v3';

export const validate = (schema: any) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        return next(new AppError(firstError?.message!, 400));
      }
      next(error);
    }
  };
};
