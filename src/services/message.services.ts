import type { Message } from '@/generated/prisma/client.js';
import { prisma } from '@/script';
import type { CreateMessageDTO } from '@/types/message.type.js';
import * as GeminiService from '@/services/gemini.services.js';
import type { tryParseJSON } from '@/utils/utils';

export const getAll = async (): Promise<Message[]> => {
  return await prisma.message.findMany();
};

export const getByRoutineId = async (routineId: string): Promise<Message[]> => {
  return await prisma.message.findMany({ where: { routineId } });
};

export const create = async (data: CreateMessageDTO): Promise<Message> => {
  try {
    const userMessage = await prisma.message.create({ data });

    const aiResponse = await GeminiService.getResponse(userMessage.content);

    const aiMessage = await prisma.message.create({
      data: {
        content: typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse),
        routineId: userMessage.routineId,
        sender: 'AI',
      }
    });

    return aiMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};

export const update = async (id: string, content: string): Promise<Message> => {
  return await prisma.message.update({ where: { id }, data: { content } });
};

export const deleteById = async (id: string): Promise<Message> => {
  return await prisma.message.delete({ where: { id } });
};
