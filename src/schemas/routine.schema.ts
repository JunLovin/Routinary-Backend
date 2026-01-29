import { z } from 'zod';

export const createRoutineSchema = z.object({
  prompt: z
    .string('Prompt is required')
    .min(10, 'Prompt must be at least 10 characters')
    .max(2000, 'Prompt is too long')
    .trim(),
});

export const updateRoutineSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title is too long')
    .trim()
    .optional(),

  description: z
    .string()
    .max(500, 'Description is too long')
    .trim()
    .optional(),

  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(2000, 'Prompt is too long')
    .trim()
    .optional(),
});

export type CreateRoutineInput = z.infer<typeof createRoutineSchema>;
export type UpdateRoutineInput = z.infer<typeof updateRoutineSchema>;
