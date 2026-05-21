import {app} from "./app.js"
import { prisma } from "./shared/db/prisma.js";
import { env } from "./config/env.js";




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