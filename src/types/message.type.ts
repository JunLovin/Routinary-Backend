import type { Message } from "@/generated/prisma/client";

export type CreateMessageDTO = Omit<Message, "id" | "createdAt">;
