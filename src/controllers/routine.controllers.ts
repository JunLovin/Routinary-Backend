import type { NextFunction, Request, Response } from "express";
import * as RoutineServices from "@/services/routine.services.js";
import { AppError } from "@/utils/AppError.js";
import { asyncHandler } from "@/handlers/asyncHandler.js";

export class RoutineController {
  static getAll = asyncHandler(async (_: Request, res: Response) => {
    const routines = await RoutineServices.getAll();
    res.json(routines);
  })

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { routineId } = req.params;

    const routine = await RoutineServices.getById(routineId as string);

    if (!routine) {
      throw new AppError("Routine not found", 404);
    } 

    res.json(routine);
  })

  static getCurrentRoutines = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    const routines = await RoutineServices.getByUserId(userId as string);

    res.json(routines);
  })

  static create = asyncHandler(async (req: Request, res: Response) => {
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
  })

  static update = asyncHandler(async (req: Request, res: Response) => {
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
  })
 
  static delete = asyncHandler(async (req: Request, res: Response) => {
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
  })
}
