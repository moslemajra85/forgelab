import { Request, Response } from "express";
import {
  getAuthenticatedUser,
  loginUser,
  registerUser,
} from "./auth.service.js";
import { LoginInput, RegisterInput } from "./auth.schema.js";
import { AppError } from "../../shared/errors/app-error.js";

export async function registerController(req: Request, res: Response) {
  const { user, accessToken } = await registerUser(req.body as RegisterInput);

  res.status(201).json({
    user,
    accessToken,
  });
}

export async function loginController(req: Request, res: Response) {
  const { user, accessToken } = await loginUser(req.body as LoginInput);
  res.status(200).json({
    user,
    accessToken,
  });
}

export async function meController(req: Request, res: Response) {
  const userId = req.auth?.userId;

  if (!userId) {
    throw new AppError(401, "AUTH_CONTEXT_MISSING", "Auth context is missing");
  }

  const user = await getAuthenticatedUser(userId);

  res.status(200).json({ user });
}
