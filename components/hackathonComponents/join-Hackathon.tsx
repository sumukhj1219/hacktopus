"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinHackathonSchmea } from "@/schemas/joinHackathonSchema";
import { z } from "zod";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input-event";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";

type FormData = z.infer<typeof joinHackathonSchmea>;

const JoinHackathonPage = () => {
  const { id} = useParams<{ id: string }>(); 
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(joinHackathonSchmea),
    defaultValues: {
      teamId: "",
    },
  });

  useEffect(() => {
    if (id) {
      form.setValue("hackathonId", id); 
    }
  }, [id, form]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/join", {
        teamId: data.teamId,
        hackathonId: id,
      });

      if (response.status === 200) {
        form.reset();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Join Hackathon</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
         


          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your team ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <input type="hidden" value={id} {...form.register("hackathonId")} />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Join Hackathon"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JoinHackathonPage;
