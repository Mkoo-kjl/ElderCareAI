import { env } from "./config/env";
import { prisma } from "./prisma/client";
import app from "./app";

async function bootstrap(): Promise<void> {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Start HTTP server
    app.listen(env.PORT, () => {
      console.log(`
  ┌──────────────────────────────────────────┐
  │                                          │
  │   🏥 ElderCare AI API Server             │
  │                                          │
  │   Environment : ${env.NODE_ENV.padEnd(22)}│
  │   Port        : ${String(env.PORT).padEnd(22)}│
  │   Health      : http://localhost:${env.PORT}/api/health │
  │                                          │
  └──────────────────────────────────────────┘
      `);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

bootstrap();
