import { RequestHandler } from "express";
import { ZodType } from "zod";
import { AppError } from "../errors/app-error.js";

export function validateBody<TSchema extends ZodType>(
  schema: TSchema,
): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        new AppError(
          400,
          "VALIDATION_ERROR",
          result.error.issues[0].message ?? "Validation Error",
        ),
      );
      return;
    }

    req.body = result.data;
    next();
  };
}
