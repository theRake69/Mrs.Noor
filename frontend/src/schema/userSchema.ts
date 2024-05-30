import * as z from "zod";

// define a schema for user data validation
export const userSchema = z
  .object({
    email: z.string().email({ message: "invalid email address" }),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "password do not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"], //path of error
  });
