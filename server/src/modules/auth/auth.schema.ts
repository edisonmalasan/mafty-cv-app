import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "Email is required." })
      .email("Invalid email address."),
    password: z
      .string({ message: "Password is required." })
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    name: z.string().min(1, "Name cannot be empty.").optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "Email is required." })
      .email("Invalid email address."),
    password: z.string({ message: "Password is required." }),
  }),
});

// TS types inferred to schemas (use in service/controller)
export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
