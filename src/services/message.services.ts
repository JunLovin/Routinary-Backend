import type { Message } from "@/generated/prisma/client";
import { prisma } from "@/script";
import type { CreateMessageDTO } from "@/types/message.type";

export const getAll = async (): Promise<Message[]> => {
  return await prisma.message.findMany();
}

export const getByRoutineId = async (routineId: string): Promise<Message[]> => {
  return await prisma.message.findMany({
 where: {
      routineId
    }
  });
}

export const create = async (data: CreateMessageDTO): Promise<Message> => {
  return await prisma.message.create({ data });
}

export const deleteById = async (id: string): Promise<Message | null> => {
  return await prisma.message.delete({ where: { id } });
}
