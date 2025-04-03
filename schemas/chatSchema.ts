import { z } from "zod";

export const chatSchema = z.object({
  title: z.string().min(5, "Title is required"),
  theme: z.string().min(5, "Theme is required"),
});