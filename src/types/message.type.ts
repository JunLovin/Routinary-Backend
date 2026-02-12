import type { Message } from '@/generated/prisma/client.js';

export type CreateMessageDTO = Omit<Message, 'id' | 'createdAt'>;
