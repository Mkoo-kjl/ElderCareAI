import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";
import type { AuthResponse } from "@eldercare/shared";

const SALT_ROUNDS = 12;

/** Register a new user and return JWT */
export async function register(
  email: string,
  password: string,
  name: string,
): Promise<AuthResponse> {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(409, "A user with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // Generate JWT
  const token = signToken({ userId: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
    token,
  };
}

/** Login with email + password and return JWT */
export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = signToken({ userId: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
    token,
  };
}

/** Get user by ID (for /me endpoint) */
export async function getCurrentUser(userId: string): Promise<AuthResponse["user"]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
