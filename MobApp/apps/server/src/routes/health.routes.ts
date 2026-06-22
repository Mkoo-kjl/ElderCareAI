import { Router } from "express";
import type { ApiResponse } from "@eldercare/shared";

const router = Router();

router.get("/", (_req, res) => {
  const response: ApiResponse<{ status: string; timestamp: string }> = {
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
    message: "ElderCare AI API is running",
  };

  res.json(response);
});

export default router;
