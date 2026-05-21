import argon2 from "argon2";
import { prisma } from "../../shared/db/prisma.js";
import { AppError } from "../../shared/errors/app-error.js";
import { RegisterInput, LoginInput } from "./auth.schema.js";
import { signInAccessToken } from "./auth.tokens.js";

function toPublicUser(user: {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existingUser) {
    throw new AppError(
      409,
      "Email_Already_Registered",
      "Account with this email already exist",
    );
  }

  const passwordHash = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
  });

  const accessToken = await signInAccessToken(user.id);
  

  return {
    user: toPublicUser(user),
    accessToken,
  };
}

export async function loginUser(input: LoginInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!existingUser) {
    throw new AppError(404, "USER_NOT_FOUND", "Invalid crendentials");
  }

  const isPasswordValid = await argon2.verify(
    existingUser.passwordHash,
    input.password,
  );

  if (!isPasswordValid) {
    throw new AppError(401, "INVALID_CREDENTIALS", "Invalid credentials");
  }

  const acessToken = await signInAccessToken(existingUser.id);

  return {
    user: toPublicUser(existingUser),
    accessToken: acessToken,
  };
}

export async function getAuthenticatedUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "User not found");
  }

  return user;
}
