import { z } from "zod";

export const ContactSchema = z.object({
  firstName: z.string().min(2, { message: "Must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Must be at least 2 characters" }),
  phone: z.string().min(6, { message: "Must be at least 6 characters" }),
  message: z.string().min(10, { message: "Must be at least 10 characters" }),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export const SignUpSchema = z.object({
  firstName: z.string().min(2, { message: "Must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Must be at least 2 characters" }),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, { message: "Must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Must be at least 6 characters" }),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
