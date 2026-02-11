import type { Message } from '@/generated/prisma/client';
import { prisma } from '@/script';
import type { CreateMessageDTO } from '@/types/message.type';
import * as GeminiService from '@/services/gemini.services';

export const getAll = async (): Promise<Message[]> => {
  return await prisma.message.findMany();
};

export const getByRoutineId = async (routineId: string): Promise<Message[]> => {
  return await prisma.message.findMany({
    where: {
      routineId
    }
  });
};

export const create = async (data: CreateMessageDTO): Promise<Message> => {
  const userMessage = await prisma.message.create({ data });

  const aiResponse = await GeminiService.getResponse(userMessage.content);

  const aiMessage = await prisma.message.create({
    data: {
      content: JSON.stringify(aiResponse),
      routineId: userMessage.routineId,
      sender: 'AI',
    }
  });

  return aiMessage;
};

export const deleteById = async (id: string): Promise<Message | null> => {
  return await prisma.message.delete({ where: { id } });
};
