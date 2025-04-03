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

const IdeaGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState();

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
      const response = await axios.post("/api/ideas", values);
      console.log("API Response:", response);

      if (response.status === 200 && response.data) {
        setResponse(response.data.result);
        setSuccess(true);
        console.log("Processed Response:", response.data);
      } else {
        console.error("Invalid API response format:", response);
      }
    } catch (error) {
      console.error("Error while generating idea:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto px-4 flex items-center justify-center h-screen"> {/* Adjusted for centering */}
      <Card className="w-full max-w-md bg-neutral-800"> {/* Added max-w-md for better mobile view */}
        <CardContent className="p-6 space-y-6">
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
                    <FormLabel className="text-lg font-medium">Project Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your project title"
                        {...field}
                        className="rounded-lg py-3"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
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
                    <FormLabel className="text-lg font-medium">Hackathon Theme</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the hackathon theme or challenge"
                        {...field}
                        className="rounded-lg min-h-[120px] resize-none"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-muted-foreground">
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
                <Link
                  href={`/sample/${encodeURIComponent(response)}`}
                  className="flex items-center justify-center w-full p-4 mt-4 text-orange-600 font-medium rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                >
                  Ideas Generated
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IdeaGenerator;