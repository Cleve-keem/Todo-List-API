import bcrypt from "bcryptjs";
import z from "zod";

// create a baseUser schema
const UserBase = z.object({
  fullname: z
    .string()
    .trim()
    .min(7, "Fullname must be at least 7 characters long")
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Please enter both a first and last name",
    }),
  email: z
    .email({
      pattern: z.regexes.html5Email,
      message: "Please provide a valid email address",
    })
    .trim(),
});

// Extend UserBase Schema to make UserRegistrationSchema
export const UserRegisterSchema = UserBase.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain an uppercase letter, lowercase letter, number, and special character",
    )
    .transform(async (pwd) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(pwd, salt);
    }),
});

// Create a Login Schema
export const UserLoginSchema = z.object({
  email: z
    .email({
      pattern: z.regexes.html5Email,
      message: "Please provide a valid email address",
    })
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain an uppercase letter, lowercase letter, number, and special character",
    ),
});
