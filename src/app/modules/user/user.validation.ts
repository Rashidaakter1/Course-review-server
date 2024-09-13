import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    username: z.string({
      required_error: "UserName is required",
      invalid_type_error: "UserName must be a string",
    }),
    email: z.string().email({
      message: "Email is required",
    }),

    password: z
      .string()
      .min(8, { message: "The character must be above 8" })
      .max(20, { message: "The character must be within 20" })
      .refine((password) => /[A-Z]/.test(password), {
        message: "There should be at least a capital letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "There should be at least a small letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "There should be at least a number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "There should be at least a special character",
      }),
    role: z.enum(["admin", "user"]),
  }),
});

export const userValidations = {
  createUserValidation,
};
