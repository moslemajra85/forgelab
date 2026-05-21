import { SignJWT, jwtVerify } from "jose";
import { AppError } from "../../shared/errors/app-error.js";
import { env } from "../../config/env.js";
const secreteKey = new TextEncoder().encode(env.AUTH_ACCESS_TOKEN_SECRET);

export async function signInAccessToken(userId: string): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(env.AUTH_TOKEN_ISSUER)
    .setAudience(env.AUTH_TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(env.AUTH_ACCESS_TOKEN_EXPIRES_IN)
    .sign(secreteKey);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secreteKey, {
      issuer: env.AUTH_TOKEN_ISSUER,
      audience: env.AUTH_TOKEN_AUDIENCE,
    });

    if (!payload) {
      throw new AppError(401, "Invalid token", "Acess Token Invalid");
    }

    return {
      userId: payload.sub,
    };
  } catch (error) {
    throw new AppError(
      401,
      "Invalid token",
      "Acess Token Invalid or experired",
    );
  }
}
