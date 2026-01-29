import type { User } from '@/generated/prisma/client.js';
import { prisma } from '@/script.js';
import type { CreateUserDTO, UpdateUserDTO } from '@/types/user.type.js';

export const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const create = async (data: CreateUserDTO): Promise<User> => {
  return await prisma.user.create({ data });
};

export const update = async (id: string, data: UpdateUserDTO): Promise<User | null> => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteById = async (id: string): Promise<User | null> => {
  return await prisma.user.delete({ where: { id } });
};
