"use client"
import {z} from "zod"


export const hackathonSchema=z.object({
    hackathon_name:z.string().min(3,{message:"Hackathon name should be atleast 3 characters"}).max(50),
    hackathon_website:z.string().min(5,{message:"Website link has to be atleast 5 characters"}).max(50),
    theme:z.string().min(3,{message:"Theme should be atleast 3 characters"}),
    imageUrl:z.string().min(1,{message:"Image is required"}),
    description:z.string().min(5,{message:"Description has to be atleast 5 characters."}).max(100),
    location:z.string().min(5,{message:"Location is required"}).max(100),
    contactInfo_1:z.string().min(10,{message:"Invalid contact number"}).max(13,{message:"Invalid contact number"}),
    contactInfo_2:z.string().min(10,{message:"Invalid contact number"}).max(13,{message:"Invalid contact number"}),
    contactEmail_1:z.string().min(5,{message:"Invalid email address"}),
    contactEmail_2:z.string().min(5,{message:"Invalid email address"})
})