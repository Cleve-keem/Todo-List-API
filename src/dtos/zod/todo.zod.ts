import z from "zod";

export const todoInputSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  description: z.string().min(10, "Description is too short"),
});
