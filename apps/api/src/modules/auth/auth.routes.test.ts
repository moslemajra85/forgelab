import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../app.js";

const testEmail = `auth-test-${Date.now()}@forgelab.local`;
const testPassword = "very-secure-test-password";

let accessToken = "";

describe("Auth routes", () => {
  it("registers a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "Auth Test User",
      email: testEmail,
      password: testPassword,
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(testEmail);
    expect(response.body.user.passwordHash).toBeUndefined();
    expect(typeof response.body.accessToken).toBe("string");

    accessToken = response.body.accessToken;
  });

  it("rejects duplicate registration", async () => {
    const response = await request(app).post("/auth/register").send({
      name: "Auth Test User",
      email: testEmail,
      password: testPassword,
    });
    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe("Email_Already_Registered");
  });

  it("Logs in with valid credentias", async () => {
    const response = await request(app).post("/auth/login").send({
      email: testEmail,
      password: testPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe(testEmail);
    expect(response.body.user.passwordHash).toBeUndefined();
    expect(typeof response.body.accessToken).toBe("string");

    accessToken = response.body.accessToken;
  });

  it("rejects invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      email: testEmail,
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("rejects auth/m without token", async () => {
    const response = await request(app).get("/auth/me");

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("AUTHORIZATON_HEADER_MISSING");
  });

  it("returs the authenticated user from auth/me", async () => {
    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe(testEmail);
  });
});
