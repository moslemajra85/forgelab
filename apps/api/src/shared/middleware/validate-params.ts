import { RequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { ZodType } from "zod";

export function validateParams<TSchema extends ZodType>(
  schema: TSchema,
): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.params);

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

    req.params = result.data as typeof req.params;
    next();
  };
}
