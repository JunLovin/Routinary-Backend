import type { Routine } from "@/generated/prisma/client.js";
import { prisma } from "@/script.js";
import type { CreateRoutineDTO, UpdateRoutineDTO } from "@/types/routine.type.js";

export const getAll = async (): Promise<Routine[]> => {
  return await prisma.routine.findMany();
}

export const getById = async (id: string): Promise<Routine | undefined> => {
  const routine = await prisma.routine.findUnique({ where: { id } });

  if (!routine) return;

  return routine;
}

export const getByUserId = async (userId: string): Promise<Routine[]> => {
  return await prisma.routine.findMany({ where: { userId } });
}

export const create = async (data: CreateRoutineDTO): Promise<Routine> => {
  return await prisma.routine.create({ data });
}

export const update = async (id: string, data: UpdateRoutineDTO): Promise<Routine | undefined> => {
  return await prisma.routine.update({ where: { id }, data });
}

export const deleteById = async (id: string): Promise<Routine | undefined> => {
  return await prisma.routine.delete({ where: { id } });
}
