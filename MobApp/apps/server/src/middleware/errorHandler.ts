import type { Request, Response, NextFunction } from "express";

/** Custom application error with HTTP status code */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/** Centralized error handling middleware */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(`[Error] ${err.message}`, err.stack);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // Prisma known errors
  if (err.name === "PrismaClientKnownRequestError") {
    res.status(409).json({
      success: false,
      error: "DatabaseError",
      message: "A database constraint was violated.",
      statusCode: 409,
    });
    return;
  }

  // Fallback for unknown errors
  res.status(500).json({
    success: false,
    error: "InternalServerError",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
    statusCode: 500,
  });
}
