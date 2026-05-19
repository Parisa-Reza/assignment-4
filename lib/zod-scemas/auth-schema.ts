import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(1, "Password is required.")
        .min(6, "Password must be at least 6 characters."),
});

export const signupSchema = loginSchema.extend({
    name: z
        .string()
        .min(1, "Name is required.")
        .min(2, "Name must be at least 2 characters."),
    avatar: z
        .string()
        .url("Avatar must be a valid URL.")
        .or(z.literal(""))
        .optional(),
});

export type LoginFields = z.infer<typeof loginSchema>;
export type SignupFields = z.infer<typeof signupSchema>;
export type FieldErrors = Partial<Record<keyof SignupFields, string>>;