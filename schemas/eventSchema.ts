import z from "zod";

export const EventSchema = z.object({
  event_link: z.string().url({ message: "Invalid URL format for event link" }),
  event_name: z.string().min(1, { message: "Event name is required" }),
  imageUrl: z.string().url({ message: "Invalid URL format for image" }),
  website_link: z.string().url({ message: "Invalid URL format for website link" }),
  social: z.string().optional(),
  participants: z.string().min(1, { message: "Participants field cannot be empty" }),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date format (YYYY-MM-DD expected)",
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date format (YYYY-MM-DD expected)",
  }),
  pincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be exactly 6 digits" }),
  location: z.string().min(2, { message: "Location must be at least 2 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
});
