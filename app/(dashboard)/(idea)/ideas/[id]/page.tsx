"use server";

import { prisma } from "@/lib/db";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface IdeaPageProps {
  params: {
    id: string;
  };
}

const cleanText = (text: string | undefined) => {
  return text ? text.replace(/[#*]/g, "").trim() : "No data available.";
};

const IdeaPage = async ({ params }: IdeaPageProps) => {
  const { id } = params;

  const ideaDetails = await prisma.ideas.findUnique({
    where: { id },
  });

  if (!ideaDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500 text-xl">
        Idea not found!
      </div>
    );
  }

  // Extract and clean text
  const descriptionMatch = cleanText(
    ideaDetails.response.match(/\*\*1\. Description:\*\*\n([\s\S]+?)\*\*2\./)?.[1]
  );
  const implementationMatch = cleanText(
    ideaDetails.response.match(/\*\*2\. Implementation:\*\*\n([\s\S]+?)\*\*3\./)?.[1]
  );
  const uniquenessMatch = cleanText(
    ideaDetails.response.match(/\*\*3\. Uniqueness:\*\*\n([\s\S]+)/)?.[1]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button className="text-4xl font-bold text-center mb-8">
        {cleanText(ideaDetails.title)}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <ScrollArea className="h-[250px]">
                <p>{descriptionMatch}</p>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Uniqueness</h2>
              <ScrollArea className="h-[250px]">
                <p>{uniquenessMatch}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Implementation</h2>
            <ScrollArea className="h-[600px]">
              <p className="whitespace-pre-line">{implementationMatch}</p>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdeaPage;
