"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MyIdeaComponent = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const email = user.emailAddresses[0].emailAddress;
  const dbUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!dbUser) {
    return redirect("/idea");
  }

  const ideas = await prisma.ideas.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });

  if (!ideas || ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="mb-4">
          <PlusCircle className="h-12 w-12 text-gray-400 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">No ideas found</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          You haven't created any ideas yet. Get started by creating your first idea.
        </p>
        <Button asChild>
          <Link href="/idea">Create Your First Idea</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <Card
            key={idea.id}
            className="flex flex-col h-full w-[250px] overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="line-clamp-2">{idea.title}</CardTitle>
              <div className="flex justify-between items-start w-full mb-2">
                <Badge variant="outline">{idea.theme}</Badge>
                
              </div>
              
            </CardHeader>
            <CardFooter className="flex justify-end pt-2 border-t mt-auto">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/ideas/${idea.id}`}>
                  View
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                
              </Button>
              <Link href={`/flowchart/${idea.id}`}>
              Flow
            </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyIdeaComponent;