import type { User } from "@/generated/prisma/client.js";
import { prisma } from "@/script.js";
import type { CreateUserDTO, UpdateUserDTO } from "@/types/user.type.js";

export const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany();
}

export const getById = async (id: string): Promise<User | undefined> => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return;

  return user;
}

export const create = async (data: CreateUserDTO): Promise<User> => {
  return await prisma.user.create({ data });
}

export const update = async (id: string, data: UpdateUserDTO): Promise<User | undefined> => {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    return undefined;
  }
}

export const deleteById = async (id: string): Promise<User | undefined> => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    return undefined;
  }
}
