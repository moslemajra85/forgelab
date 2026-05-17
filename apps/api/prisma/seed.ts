import { fileURLToPath } from "node:url";
import path from "node:path";
import {config} from "dotenv"

import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient, ProjectStatus, WorkspaceRole} from "../generated/prisma/client.js"




const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const rootEnvPath = path.resolve(currentDirectory, "../../.env");

config({ path: rootEnvPath });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });


async function main() {
  const demoUser = await prisma.user.upsert({
    where: {
      email: "demo@forgelab.local",
    },
    update: {},
    create: {
      name: "ForgeLab Demo User",
      email: "demo@forgelab.local",
      passwordHash: "not-a-real-password-hash-yet",
    },
  });

  const demoWorkspace = await prisma.workspace.upsert({
    where: {
      slug: "demo-workspace",
    },
    update: {},
    create: {
      name: "Demo Workspace",
      slug: "demo-workspace",
      ownerId: demoUser.id,
    },
  });

  await prisma.workspaceMember.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: demoWorkspace.id,
        userId: demoUser.id,
      },
    },
    update: {
      role: WorkspaceRole.OWNER,
    },
    create: {
      workspaceId: demoWorkspace.id,
      userId: demoUser.id,
      role: WorkspaceRole.OWNER,
    },
  });

  const existingProject = await prisma.project.findFirst({
    where: {
      workspaceId: demoWorkspace.id,
      name: "ForgeLab Demo Project",
    },
  });

  if (!existingProject) {
    await prisma.project.create({
      data: {
        workspaceId: demoWorkspace.id,
        createdByUserId: demoUser.id,
        name: "ForgeLab Demo Project",
        rawIdea: "Build an AI-powered workspace that helps developers turn vague ideas into executable software plans.",
        targetAudience: "Solo developers and technical mentors",
        constraints: "Start as a modular monolith with a separate worker process.",
        status: ProjectStatus.ACTIVE,
      },
    });
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });