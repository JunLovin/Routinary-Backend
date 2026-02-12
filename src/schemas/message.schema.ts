import { z } from 'zod';

export const createMessageSchema = z.object({
  routineId: z.string('Routine ID is required').uuid('Invalid Routine ID format'),
  sender: z.enum(['USER'], 'Sender is required'),
  content: z.string('Content is required').min(1, 'Content cannot be empty').max(2000, 'Content is too long').trim(),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
