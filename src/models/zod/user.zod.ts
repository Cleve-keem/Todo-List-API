import z from "zod";

export const UserSchema = z.object({
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
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain an uppercase letter, lowercase letter, number, and special character",
    ),
});
