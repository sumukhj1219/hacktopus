import { z } from "zod";

export const EventSchema = z.object({
  hackathon_link: z.string().url(), // Validates URL format
  hackathon_name: z.string().min(1), // Ensures name is provided
  imageUrl: z.string(), // Optional image URL
  website_link: z.string().url(),
  social: z.string().optional(), // Optional social link
  theme: z.string().min(1),
  participants: z.string().min(1), // Assuming this is a string representation of number/range
  start_date: z.string(),
  end_date: z.string(),
  pincode: z.string().min(6),
  location: z.string().min(2),
  description: z.string().min(10)
});
