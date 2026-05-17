import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./shared/db/prisma.js";
import { env } from "./config/env.js";



const app = express();
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
      database: "connected"
    }); 

  } catch (err) {

      console.log("Database health check failed: ", err);
      res.status(503).json({
        status: "error",
        service: "api",
        database: "disconnected"
      })
  }
});

const server = app.listen(env.API_PORT, () => {
  console.log(`ForgeLab API listening on http://localhost:${env.API_PORT}`);
});


async function shutdown(signal: string) {

  console.log("Signal Received.Closing Api Server...");

  server.close(async() => {

    await prisma.$disconnect();
    console.log("Api  server closed cleanly...");
    process.exit(0)
  })

}


process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"))