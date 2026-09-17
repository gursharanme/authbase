import z from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters")
  .regex(
    /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
    "Name contains invalid characters",
  );

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email address is too long")
  .email("Please enter a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9\s]/,
    "Password must contain at least one special character",
  )
  .regex(/\S/, "Password cannot contain only whitespace")
  .refine(
    (password) => password.normalize("NFKC") === password,
    "Password contains unsupported characters",
  );

export const loginPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/\S/, "Password cannot contain only whitespace")
  .refine(
    (password) => password.normalize("NFKC") === password,
    "Password contains unsupported characters",
  );

export const tokenSchema = z
  .string()
  .trim()
  .min(1, "Token is required")
  .max(512, "Invalid token");
