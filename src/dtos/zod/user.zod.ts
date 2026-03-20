import z from "zod";

// create a baseUser schema
const UserBase = z.object({
  email: z
    .email({
      pattern: z.regexes.html5Email,
      message: "Please provide a valid email address",
    })
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Missing uppercase")
    .regex(/[a-z]/, "Missing lowercase")
    .regex(/[0-9]/, "Missing number")
    .regex(/[@$!%*?&]/, "Missing special character"),
});

// Extend UserBase Schema to make UserRegistrationSchema
export const UserRegisterSchema = UserBase.extend({
  fullname: z
    .string()
    .trim()
    .min(7, "Fullname must be at least 7 characters long")
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Please enter both a first and last name",
    }),
});

// Create a Login Schema
export const UserLoginSchema = UserBase.extend({});
