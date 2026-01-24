import { AppError } from "@/utils/AppError.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authenticate = (req: Request, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authorization header missing", 401);
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      throw new AppError("Invalid authorization header format", 401);
    }

    const token = parts[1];

    // INFO: Here I obtain the payload passed in login service
    const decoded = jwt.verify(token!, JWT_SECRET) as { userId: string; email: string };

    req.user = { userId: decoded.userId, email: decoded.email }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Invalid token", 401));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new AppError("Token has expired", 401));
    } else {
      next(error);
    }
  }
}
