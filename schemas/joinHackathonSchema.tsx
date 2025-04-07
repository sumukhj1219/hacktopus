import * as z from "zod";

export const joinHackathonSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  githubUrl: z.string().url({ message: "Invalid github URL." }),
});

export type JoinEventValues = z.infer<typeof joinHackathonSchema>;