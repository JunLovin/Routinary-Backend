import type { NextFunction, Request, Response } from 'express';
import * as AuthService from '@/services/auth.services.js';
import { asyncHandler } from '@/handlers/asyncHandler.js';

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const newUser = await AuthService.register({ email, password, name }); 
    res.status(201).json(newUser);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const credentials = await AuthService.login(email, password);
    res.status(200).json(credentials);
  });
}
