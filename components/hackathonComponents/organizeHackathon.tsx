"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { hackathonSchema } from "@/schemas/hackathonSchema";
import ImageUpload from "@/utils/uploadImage";
import axios from "axios";
import { useState } from "react";

export default function OrganizeHackathons() {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof hackathonSchema>>({
        resolver: zodResolver(hackathonSchema),
        defaultValues: {
            hackathon_name: "",
            hackathon_website: "",
            description: "",
            imageUrl: "",
            location: "",
            theme: "",
            contactInfo_1: "",
            contactInfo_2: "",
            contactEmail_1: "",
            contactEmail_2: ""
        },
    });

    async function onSubmit(values: z.infer<typeof hackathonSchema>) {
        try {
          setLoading(true);
          const response = await axios.post("/api/organize", values)
          if(response.status === 200){
            // toast("✅ Product has been created.", {
            //   description: productId,
            //   action:{
            //     label:"Copy",
            //     onClick:()=>{
            //       navigator.clipboard.writeText(productId)
            //       toast.success("✅ Copied Product Id.")
            //     }
            //   }
            // });
          }
          console.log(values)
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

    return (
        <div>
            <h1 className="text-xl font-bold">Organize Hackathons</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Cover Image</FormLabel>
                                <ImageUpload value={field.value} onChange={(url) => field.onChange(url)} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hackathon_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hackathon Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter hackathon name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="hackathon_website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hackathon Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Provide a brief description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Theme</FormLabel>
                                <FormControl>
                                    <Input placeholder="AI, Blockchain, Web3, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactInfo_1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Info 1</FormLabel>
                                <FormControl>
                                    <Input placeholder="Phone number or other contact info" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactInfo_2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Info 2</FormLabel>
                                <FormControl>
                                    <Input placeholder="Alternate phone number or contact info" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactEmail_1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Email 1</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Primary email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactEmail_2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Email 2</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Secondary email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
