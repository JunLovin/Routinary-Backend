import type { Request, Response } from 'express';
import { asyncHandler } from '@/handlers/asyncHandler.js';
import * as MessageServices from '@/services/message.services.js';
import * as RoutineServices from '@/services/routine.services.js';
import { AppError } from '@/utils/AppError.js';
import { generateICS } from '@/utils/icsGenerator';
import type { ParsedRoutine } from '@/types/event.type';

export class MessageController {
  static getAll = asyncHandler(async (_: Request, res: Response) => {
    const messages = await MessageServices.getAll();
    res.json(messages);
  });

  static getByRoutine = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { routineId } = req.params;

    if (!userId) {
      throw new AppError('Unauthorized', 401);
    }
  
    const routine = await RoutineServices.getById(routineId as string); 

    if (!routine) {
      throw new AppError('Routine not found', 404);
    }

    if (routine.userId !== userId) {
      throw new AppError('Forbidden', 403);
    }
      
    const messages = await MessageServices.getByRoutineId(routineId as string);
    res.json(messages);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { routineId, sender, content } = req.body;

    if (!userId) {
      throw new AppError('Unauthorized', 404);
    }

    const routine = await RoutineServices.getById(routineId as string);

    if (!routine) {
      throw new AppError('Routine not found', 404);
    }

    if (routine.userId !== userId) {
      throw new AppError('Forbidden', 403);
    }

    const message = await MessageServices.create({ routineId, sender, content, userId: userId! });

    if (typeof message !== 'string') {
      const icsContent = generateICS(message.content as any);
      const updatedMessage = await MessageServices.update(message.id, icsContent);
      await RoutineServices.update(updatedMessage.routineId, { title: (JSON.parse(message.content) as ParsedRoutine).suggestedTitle || 'Daily Routine' });
      res.setHeader('Content-Type', 'text/calendar');
      res.setHeader('Content-Disposition', 'attachment; filename: event.ics');
      res.status(201).json(updatedMessage);
    } else {
      res.status(201).json(message);
    }
  });
}
