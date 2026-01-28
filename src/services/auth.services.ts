import type { User } from "@/generated/prisma/client.js";
import { prisma } from "@/script.js";
import type { CreateUserDTO } from "@/types/user.type.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) throw new Error("JWT doesn't found in .env")

export const register = async (data: CreateUserDTO): Promise<Omit<User, "password"> | undefined> => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

  if (existingUser) throw new Error("Email already exists");

  const salt = 10;
  const passwordHashed = await bcrypt.hash(data.password, salt);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: passwordHashed,
    }
  });

  return removePassword(newUser);
}

export const login = async (email: string, password: string): Promise<{ token: string; user: Omit<User, "password"> }> => {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) throw new Error("Invalid credentials");

  const passwordVerification = await bcrypt.compare(password, existingUser.password);

  if (!passwordVerification) throw new Error("Invalid credentials");

  // INFO: payload = data saved in the token
  const payload = {
    userId: existingUser.id,
    email: existingUser.email,
  }

  const token = jwt.sign(
    payload, 
    JWT_SECRET, 
    { expiresIn: "1h" }
  )

  return { token, user: removePassword(existingUser) }
}

export const removePassword = (user: User): Omit<User, "password"> => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
