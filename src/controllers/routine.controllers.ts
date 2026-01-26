import type { NextFunction, Request, Response } from "express";
import * as RoutineServices from "@/services/routine.services.js";
import { AppError } from "@/utils/AppError.js";

export class RoutineController {
  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const routines = await RoutineServices.getAll();

      res.json(routines);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { routineId } = req.params;
     
      const routine = await RoutineServices.getById(routineId as string);

      if (!routine) {
        throw new AppError("Routine not found", 404);
      } 

      res.json(routine);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentRoutines(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;

      const routines = await RoutineServices.getByUserId(userId as string);

      res.json(routines);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      const {
        title,
        description,
        prompt,
        icsContent,
      } = req.body;


      // TODO: Do validation with zod
      
      const newRoutine = await RoutineServices.create({
        userId: userId!,
        title,
        description,
        prompt,
        icsContent,
      });

      res.status(201).json(newRoutine);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { routineId } = req.params;
      const userId = req.user?.userId;

      const routine = await RoutineServices.getById(routineId as string);

      if (!routine) {
        throw new AppError("Routine not found", 404);
      } 
      if (routine.userId !== userId) {
        throw new AppError("Forbidden: You don't own this routine", 403);
      } 
      
      const { 
        title,
        description, 
        prompt, 
        icsContent 
      } = req.body;

      const updatedRoutine = await RoutineServices.update(routineId as string, {
        title,
        description,
        prompt,
        icsContent
      });

      res.json(updatedRoutine);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { routineId } = req.params;
      const userId = req.user?.userId;

      const routineToDelete = await RoutineServices.getById(routineId as string);

      if (!routineToDelete) {
        throw new AppError("Routine not found", 404);
      } 
      if (routineToDelete.userId !== userId) {
        throw new AppError("Forbidden: You don't own this routine", 403);
      } 
      
      const routine = await RoutineServices.deleteById(routineId as string);

      res.json({ deleted: routine });
    } catch (error) {
      next(error);
    }
  }
}
