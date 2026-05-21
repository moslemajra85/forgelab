import { RequestHandler } from "express";
import { AppError } from "../../shared/errors/app-error.js";
import { verifyAccessToken } from "./auth.tokens.js";

export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const authorizationHeader = req.header("authorization");

    if (!authorizationHeader) {
      throw new AppError(
        401,
        "AUTHORIZATON_HEADER_MISSING",
        "Authorization header is missing",
      );
    }

    const [scheme, token, ...rest] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token || rest.length > 0) {
      throw new AppError(
        401,
        "AUTHORIZATION_HEADER_INVALID",
        "Invalid authorization header",
      );
    }

    const verifiedToken = await verifyAccessToken(token);

    req.auth = {
      userId: verifiedToken.userId!,
    };

    next();
  } catch (error) {
    next(error);
  }
};
