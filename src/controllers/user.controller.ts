import type { NextFunction, Request, Response } from "express";
import * as UserServices from "@/services/user.services.js";
import { AppError } from "@/utils/AppError.js";

export class UserController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.getAll();

      res.json(users);
    } catch (error) {
      next(error); 
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      const user = await UserServices.getById(userId as string);

      if (!user) {
        throw new AppError("User not found", 404)
      } 

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;

      const user = await UserServices.getById(userId!);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { email, password, name } = req.body;

      const updatedUser = await UserServices.update(userId as string, { email, password, name });

      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) {
        throw new AppError("UserId is required", 400)
      } 

      const userDeleted = await UserServices.deleteById(userId as string);

      if (!userDeleted) {
        throw new AppError("User not found", 404);
      } 

      res.json({ deleted: userDeleted });
    } catch (error) {
      next(error)
    }
  }
}
