import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// ─── Global Middleware ───────────────────────────────────
app.use(
  cors({
    origin: "*", // Tighten in production
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ──────────────────────────────────────────
app.use("/api", routes);

// ─── 404 Catch-All ───────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "NotFound",
    message: "The requested endpoint does not exist",
    statusCode: 404,
  });
});

// ─── Error Handler (must be last) ────────────────────────
app.use(errorHandler);

export default app;
