import type { NextFunction, Request, Response } from "express";
import * as RoutineServices from "@/services/routine.services.js";
import { AppError } from "@/utils/AppError.js";
import { asyncHandler } from "@/handlers/asyncHandler.js";
import { parsePromptToEvents } from "@/services/gemini.services";
import { generateICS } from "@/utils/icsGenerator";

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
    const { prompt } = req.body;

    const events = await parsePromptToEvents(prompt as string);
    const parsedEvent = generateICS(events);
    
    const newRoutine = await RoutineServices.create({
      userId: userId!,
      title: events.suggestedTitle || "My Routine",
      description: "",
      prompt,
      icsContent: parsedEvent,
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
      const events = await parsePromptToEvents(prompt);
      icsContent = generateICS(events);
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
