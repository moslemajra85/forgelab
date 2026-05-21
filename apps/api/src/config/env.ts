import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const rootEnvPath = path.resolve(currentDirectory, "../../../../.env");

config({ path: rootEnvPath });

const requiredEnvironmentVariables = [
  "DATABASE_URL",
  "API_PORT",
  "AUTH_ACCESS_TOKEN_SECRET",
  "AUTH_ACCESS_TOKEN_EXPIRES_IN",
  "AUTH_TOKEN_ISSUER",
  "AUTH_TOKEN_AUDIENCE",
] as const;

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  API_PORT: Number(process.env.API_PORT),
  AUTH_ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET as string,
  AUTH_ACCESS_TOKEN_EXPIRES_IN: process.env
    .AUTH_ACCESS_TOKEN_EXPIRES_IN as string,
  AUTH_TOKEN_ISSUER: process.env.AUTH_TOKEN_ISSUER as string,
  AUTH_TOKEN_AUDIENCE: process.env.AUTH_TOKEN_AUDIENCE as string,
};

if (Number.isNaN(env.API_PORT)) {
  throw new Error("API_PORT must be a valid number.");
}
