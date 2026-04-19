import z from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>["body"];
