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
    isDeleted: z.boolean(),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "UserName is required",
        invalid_type_error: "UserName must be a string",
      })
      .trim(),

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
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: "Current Password is required.",
    }),
    newPassword: z.string({ required_error: "New Password is required." }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token  is required." }),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required." }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is required." }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});

export const AuthValidations = {
  createUserValidation,
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
