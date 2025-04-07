"use client"
import { z } from "zod"

export const hackathonSchema = z.object({
    hackathon_name: z.string()
        .min(3, { message: "Hackathon name must be at least 3 characters." })
        .max(50, { message: "Hackathon name cannot exceed 50 characters." }),
    hackathon_website: z.string()
        .min(5, { message: "Website link must be at least 5 characters." })
        .max(50, { message: "Website link cannot exceed 50 characters." }),
    theme: z.string()
        .min(3, { message: "Theme must be at least 3 characters." }),
    imageUrl: z.string()
        .min(1, { message: "An image is required." }),
    description: z.string()
        .min(5, { message: "Description must be at least 5 characters." })
        .max(100, { message: "Description cannot exceed 100 characters." }),
    location: z.string()
        .min(5, { message: "Location is required and must be at least 5 characters." })
        .max(100, { message: "Location cannot exceed 100 characters." }),
    contactInfo_1: z.string()
        .min(10, { message: "Contact number 1 is invalid." })
        .max(13, { message: "Contact number 1 is invalid." }),
    contactInfo_2: z.string()
        .min(10, { message: "Contact number 2 is invalid." })
        .max(13, { message: "Contact number 2 is invalid." }),
    contactEmail_1: z.string()
        .min(5, { message: "Contact email 1 is invalid." })
        .email({message: "Contact email 1 must be a valid email."}),
    contactEmail_2: z.string()
        .min(5, { message: "Contact email 2 is invalid." })
        .email({message: "Contact email 2 must be a valid email."}),
    pincode: z.string()
        .min(7, { message: "Pincode must be at least 7 characters." }),
    social: z.string()
        .min(5, { message: "Social link must be at least 5 characters." }),
    start_date: z.string()
        .min(1, { message: "Start date is required." }),
    end_date: z.string()
        .min(1, { message: "End date is required." }),
    website_link: z.string()
        .min(1, { message: "Website link is required." }),
    prizePool:z.string().min(1,{message:"Price pool is required."})
});