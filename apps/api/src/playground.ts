import { fileURLToPath } from "node:url";
import path from "node:path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const rootEnvPath = path.resolve(currentDirectory, "../../../.env");


console.log(currentFilePath);
console.log(currentDirectory);
console.log(rootEnvPath);