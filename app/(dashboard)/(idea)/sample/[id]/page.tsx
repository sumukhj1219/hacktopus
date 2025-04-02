"use client";

import React, { use, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import axios from "axios";
import { redirect } from "next/navigation";

interface Idea {
  title: string;
  description: string;
}

interface IdeaPageProps {
  params: Promise<{ id: string }>;
}

const SampleIdeaPage: React.FC<IdeaPageProps> = ({ params }) => {
  const { id } = use(params);
  const [parsedIdeas, setParsedIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingIdea, setGeneratingIdea] = useState<number | null>(null);

  async function handleClick(title: string, description: string, index: number) {
    try {
      setGeneratingIdea(index);
      const response = await axios.post("/api/chat", { title: title, theme: description });
      if (response.status === 200) {
        return redirect(`/ideas/${response.data.message.id}`);
      }
    } catch (error) {
      console.log("Error while generating idea", error);
    } finally {
      setGeneratingIdea(null);
    }
  }

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);

        const response = await axios.post("/api/sample", { id });
        let ideaDetails = response.data.result;
        if (!ideaDetails || !ideaDetails.response) {
          setError("Idea not found!");
          return;
        }

        let sanitizedResponse = ideaDetails.response.trim();
        if (sanitizedResponse.startsWith("```json")) {
          sanitizedResponse = sanitizedResponse.replace(/^```json/, "").replace(/```$/, "").trim();
        }

        const ideas: Idea[] = JSON.parse(sanitizedResponse);
        setParsedIdeas(ideas);
      } catch (err) {
        console.error("Error parsing JSON:", err);
        setError("Error parsing idea data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-700">Loading ideas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center max-w-md p-6 rounded-lg bg-red-50">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-red-700 mb-2">Something went wrong</p>
          <p className="text-gray-700">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Explore Generated Ideas
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-500">
          Each card represents a unique project idea. Click "Generate" to develop it further.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {parsedIdeas.map((idea, index) => (
          <Card key={index} className="overflow-hidden flex flex-col h-full border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <CardTitle className="text-xl font-semibold line-clamp-1 text-gray-800">
                {idea.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-grow px-6 py-4">
              <ScrollArea className="h-48 pr-4">
                <p className="text-gray-700 whitespace-pre-line">
                  {idea.description}
                </p>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="pt-2 pb-4 px-6 bg-white border-t border-gray-100">
              <Button 
                className="w-full"
                onClick={() => handleClick(idea.title, idea.description, index)}
                disabled={generatingIdea !== null}
              >
                {generatingIdea === index ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {parsedIdeas.length === 0 && !loading && !error && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No ideas found for this template.</p>
        </div>
      )}
    </div>
  );
};

export default SampleIdeaPage;