"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { chatSchema } from "@/schemas/chatSchema";
import { Textarea } from "../ui/textarea";
import { Loader, Sparkle, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CardSpotlightDemo } from "./card-spotlight";
import { useRouter } from "next/navigation"; // Import useRouter

const IdeaGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(""); // Initialize response as an empty string
  const router = useRouter(); // Initialize useRouter

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      theme: "",
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof chatSchema>) {
    console.log("Form values:", values);
    if (!values.title || !values.theme) {
      console.error("Invalid payload:", values);
      return;
    }

    setLoading(true);

    try {
      const apiResponse = await axios.post("/api/idea/generate-idea", values);
      console.log("API Response:", apiResponse);

      if (apiResponse.status === 200 && apiResponse.data && apiResponse.data.result) {
        setResponse(apiResponse.data.result);
        setSuccess(true);
        console.log("Processed Response:", apiResponse.data);
      } else {
        console.error("Invalid API response format:", apiResponse);
        setSuccess(false); // Ensure success is false on error
      }
    } catch (error) {
      console.error("Error while generating idea:", error);
      setSuccess(false); // Ensure success is false on error
    } finally {
      setLoading(false);
    }
  }

  // Function to handle the "Ideas Generated" link click
  const handleViewIdeas = () => {
    if (response) {
      router.push(`/sample/${encodeURIComponent(response)}`);
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center h-screen"> {/* Adjusted for centering */}
      <CardSpotlightDemo>
        <Card className="w-full  max-w-md border-none bg-transparent  text-white">
          {/* Added max-w-md for better mobile view */}
          <CardContent className="p-6 space-y-6 ">
            {/* <div className="flex items-center justify-center mb-2">
              <div className=" rounded-full p-3">
                <Lightbulb className="h-8 w-8 text-orange-500" />
              </div>
            </div> */}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl font-medium relative">Project Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your project title"
                          {...field}
                          className="rounded-lg py-3 relative"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground relative">
                        A catchy name for your hackathon project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-medium relative text-2xl">Hackathon Theme</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the hackathon theme or challenge"
                          {...field}
                          className="rounded-lg min-h-[120px] resize-none relative"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-muted-foreground relative">
                        Detailed description of the hackathon theme or problem statement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 rounded-lg text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin" />
                        Generating ideas...
                      </>
                    ) : (
                      <>
                        Generate Brilliant Ideas
                        <Sparkle className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                      </>
                    )}
                  </span>
                </Button>

                {success && response && (
                  <div
                    onClick={handleViewIdeas}
                    className="flex items-center relative justify-center w-full p-4 mt-4 text-orange-600 font-medium rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors cursor-pointer"
                  >
                    Ideas Generated
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </CardSpotlightDemo>
    </div>
  );
};

export default IdeaGenerator;