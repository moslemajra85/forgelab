import { Router } from "express";
import { asyncHandler } from "../../shared/utils/asycn-handler.js";
import { validateBody } from "../../shared/middleware/validate-body.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { requireAuth } from "./auth.middleware.js";
import {
  loginController,
  registerController,
  meController,
} from "./auth.controller.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(registerController),
);
authRouter.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(loginController),
);
authRouter.get("/me", requireAuth, asyncHandler(meController));
