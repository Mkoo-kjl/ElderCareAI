import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "./errorHandler";

/** Extend Express Request with authenticated user info */
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

/** JWT authentication middleware — extracts and verifies Bearer token */
export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Token not provided");
    }

    const payload = verifyToken(token);
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError(401, "Invalid or expired token"));
  }
}
