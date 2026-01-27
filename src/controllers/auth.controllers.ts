import { AppError } from "@/utils/AppError.js";
import type { NextFunction, Request, Response } from "express";
import * as AuthService from "@/services/auth.services.js";
import { asyncHandler } from "@/handlers/asyncHandler.js";

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !email.trim() || !password || !password.trim()) throw new AppError("Email or password missing", 400);

    if (!(email as string).match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) throw new AppError("Enter a valid email", 400);

    if (password.length < 8) throw new AppError("Please enter a stronger password", 400);

    const newUser = await AuthService.register({ email, password, name });

    res.status(201).json(newUser);
  })

  static login = asyncHandler(async (req: Request, res: Response) => {
      const { email, password } = req.body;

      if (!email || !email.trim() || !password || !password.trim()) throw new AppError("Email or password missing", 400);

      const credentials = await AuthService.login(email, password);

      res.status(200).json(credentials);
  })
}
