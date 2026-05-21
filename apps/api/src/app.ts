import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { errorHandler } from "./shared/middleware/error-handler.js";
import { prisma } from "./shared/db/prisma.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "api",
  });
});

app.get("/db-health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ok",
      service: "api",
      database: "connected",
    });
  } catch (error) {
    console.log("Database health check failed: ", error);

    res.status(503).json({
      status: "error",
      service: "api",
      database: "disconnected",
    });
  }
});

app.use("/auth", authRouter);

app.use(errorHandler);
