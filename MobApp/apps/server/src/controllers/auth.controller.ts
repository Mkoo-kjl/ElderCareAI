import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import * as authService from "../services/auth.service";
import type { ApiResponse, AuthResponse, User } from "@eldercare/shared";

// ─── Validation Schemas ──────────────────────────────────

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// ─── Controllers ─────────────────────────────────────────

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data.email, data.password, data.name);

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: result,
      message: "User registered successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data.email, data.password);

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: result,
      message: "Login successful",
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const user = await authService.getCurrentUser(userId);

    const response: ApiResponse<User> = {
      success: true,
      data: user,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
