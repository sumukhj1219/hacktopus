"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input-event";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useParams } from "next/navigation";

const createTeamSchema = z.object({
  team_name: z.string().min(1, { message: "Team name is required" }),
  total_participants: z.coerce.number().min(1, { message: "Participants must be at least 1" }),
});

const CreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const hackathonId = params?.id; 

  const form = useForm({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      team_name: "",
      total_participants: 1,
    },
  });

  const onSubmit = async (data: any) => {
    if (!hackathonId) {
      console.error("Hackathon ID not found");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/create-team", { ...data, hackathonId });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="total_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participants</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Number of participants" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Team"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTeam;
