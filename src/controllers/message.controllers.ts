import type { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/handlers/asyncHandler';
import * as MessageServices from '@/services/message.services.js';

export class MessageController {
  static getAll = asyncHandler(async (_: Request, res: Response) => {
    const messages = await MessageServices.getAll();
    res.json(messages);
  });

  static getByRoutine = asyncHandler(async (req: Request, res: Response) => {
    const { routineId } = req.params;
    const messages = await MessageServices.getByRoutineId(routineId as string);
    res.json(messages);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const { routineId, sender, content } = req.body;

    const message = await MessageServices.create({ routineId, sender, content, userId: userId! });

    res.status(201).json(message);
  });
}
