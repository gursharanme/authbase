import z from "zod";
import {
  emailSchema,
  loginPasswordSchema,
  nameSchema,
  passwordSchema,
} from "@/validators/auth/common";

// Signup
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignupInput = z.infer<typeof signupSchema>;

// Login
export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

// Verify Email
export const verifyEmailSchema = z.object({
  email: emailSchema,
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

// Forgot Password
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
