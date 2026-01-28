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

  static generate = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { prompt, title } = req.body;

    // TODO: Here will be Gemini to generate .ics
    // const icsContent = await generateICSWithAI(prompt);
    
    const icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\n...";

    const newRoutine = await RoutineServices.create({
      userId: userId!,
      title: title || "My Routine",
      description: prompt,
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

    const { title, description, prompt } = req.body;

    let icsContent = routine.icsContent;

    if (prompt && prompt !== routine.prompt) {
      // TODO: Regenerate with AI
      // icsContent = await generateICSWithAI(prompt);
    }

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
