import type { NextFunction, Request, Response } from "express";
import * as UserServices from "@/services/user.services.js";
import { AppError } from "@/utils/AppError.js";
import { asyncHandler } from "@/handlers/asyncHandler.js";

export class UserController {
  static getAll = asyncHandler(async (_: Request, res: Response) => {
    const users = await UserServices.getAll();
    res.json(users);
  })

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await UserServices.getById(userId as string);
    
    if (!user) {
      throw new AppError("User not found", 404)
    
    } 
    res.json(user);
  })

  static getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const user = await UserServices.getById(userId!);
    
    if (!user) {
      throw new AppError("User not found", 404);
    
    }
    res.json(user);

  })

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { email, password, name } = req.body;
    
    const updatedUser = await UserServices.update(userId as string, { email, password, name });
    
    if (!updatedUser) {
      throw new AppError("User not found", 404); 
    }

    res.json(updatedUser);
  })

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userDeleted = await UserServices.deleteById(userId as string);

    if (!userDeleted) {
      throw new AppError("User not found", 404);
    } 

    res.json({ deleted: userDeleted });
  })
}
