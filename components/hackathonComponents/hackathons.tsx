"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, ExternalLink, MapPin } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

const Hackathons = () => {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<any | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    async function fetchHackathons() {
      try {
        const response = await axios.get("/api/hackathons");
        if (response.status === 200 && response.data.results.hackathons) {
          setHackathons(response.data.results.hackathons);

        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    }
    fetchHackathons();
  }, []);

  const openSheet = (hackathon: any) => {
    setSelectedHackathon(hackathon);
    setIsSheetOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between">
      <h2 className="text-2xl text-secondary font-bold text-sec mb-6">Popular Events</h2>
      <Link href={'/all-events'} className="w-25">
        <span className="bg-neutral-700  p-1.5 flex text-secondary items-center justify-center text-sm  rounded-xl">View all <ArrowRight width={20} height={20} /> </span>
      </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        {hackathons.slice(0,4).map((hackathon) => (
          <div key={hackathon.id} className="cursor-pointer" onClick={() => openSheet(hackathon)}>
            <Card className="bg-transparent text-secondary overflow-hidden w-full border-0 flex flex-row">
              
              <div className="bg-amber-300 rounded-xl w-20 h-20 flex-shrink-0"></div>

              <div className="flex flex-col justify-center flex-grow px-1 py-2">
                <CardHeader className="p-0">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {hackathon.hackathon_name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-secondary">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>{hackathon.date}</span>
                  </div>

                  {hackathon.location && (
                    <div className="flex items-center gap-2 text-secondary">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span>{hackathon.location}</span>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Separator className="w-full bg-neutral-700 mt-5" />


      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          {selectedHackathon && (
            <SheetHeader>
              <SheetTitle>{selectedHackathon.hackathon_name}</SheetTitle>
              <SheetDescription className="text-secondary mt-4">
                <div><strong>Date:</strong> {selectedHackathon.date}</div>
                {selectedHackathon.location && (
                  <div><strong>Location:</strong> {selectedHackathon.location}</div>
                )}
                {selectedHackathon.description && (
                  <div><strong>Description:</strong> {selectedHackathon.description}</div>
                )}
                <div className="mt-4 flex gap-2">
                  <Button size="sm" asChild>
                    <Link href={`/hackathon/${selectedHackathon.id}`} className="flex items-center">
                      View Details
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={selectedHackathon.hackathon_link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit
                    </a>
                  </Button>
                </div>
              </SheetDescription>
            </SheetHeader>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Hackathons;
