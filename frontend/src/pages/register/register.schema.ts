import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().min(1, "Email is required.").email({
    message: "Email must be valid.",
  }),
  password: z.string().min(1, "Password is required."),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
