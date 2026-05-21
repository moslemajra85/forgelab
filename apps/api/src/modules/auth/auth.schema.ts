import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(80, "Name must be at most 80 characters long"),

  email: z
    .string({
      message: "Email is required",
    })
    .trim()
    .toLowerCase()
    .pipe(z.email("Invalid email address")),

  password: z
    .string({
      message: "Password is required",
    })
    .min(12, "Password must be at least 12 characters long")
    .max(128, "Password must be at most 128 characters long"),
});

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email is required",
    })
    .trim()
    .toLowerCase()
    .pipe(z.email("Invalid email address")),

  password: z
    .string({
      message: "Password is required",
    })
    .min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
