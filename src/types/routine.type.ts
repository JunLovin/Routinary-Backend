import type { Routine } from "@/generated/prisma/client.js";

export type CreateRoutineDTO = Omit<Routine, "id" | "createdAt" | "updatedAt">;
export type UpdateRoutineDTO = Partial<Omit<Routine, "id" | "userId" | "user" | "createdAt" | "updatedAt">>;
