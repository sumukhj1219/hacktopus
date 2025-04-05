"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
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
import { Events } from "@prisma/client";
import { format } from 'date-fns';

const GetEvents = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/events/get-events");
        if (response.status === 200 && response.data.result) {
          setEvents(response.data.result);
        } else {
          throw new Error("Unexpected API response format for events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const openSheet = (event: any) => {
    setSelectedEvent(event);
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
        {events.slice(0, 4).map((event) => (
          <div key={event.id} className="cursor-pointer" onClick={() => openSheet(event)}>
            <Card className="bg-neutral-950 text-secondary overflow-hidden w-full border-0 flex flex-row">

              <div className="bg-amber-300 rounded-xl w-20 h-20 flex-shrink-0">
                {event.imageUrl && <img src={event.imageUrl} alt={event.event_name} className="rounded-xl object-cover w-full h-full" />}
              </div>

              <div className="flex flex-col  h-20 justify-center flex-grow ">
                <CardHeader className="pl-1">
                  <CardTitle className="text-2xl  font-semibold">
                    {event.event_name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex items-center text-secondary text px-2">
                    <span className="font-semibold">{event.start_date ? format(new Date(event.start_date), 'MMM dd, yyyy') : 'TBD'}</span>
                  </div>

                  {event.location && (
                    <div className="flex items-center text-secondary text-sm px-2 line-clamp-1">
                      <span className="font-semibold">{event.location}</span>
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
          {selectedEvent && (
            <SheetHeader>
              <SheetTitle>{selectedEvent.event_name}</SheetTitle>
              <SheetDescription className="text-secondary mt-4">
                <div><strong>Start Date:</strong> {selectedEvent.start_date ? format(new Date(selectedEvent.start_date), 'MMMM dd, yyyy') : 'TBD'}</div>
                <div><strong>End Date:</strong> {selectedEvent.end_date ? format(new Date(selectedEvent.end_date), 'MMMM dd, yyyy') : 'TBD'}</div>
                {selectedEvent.location && (
                  <div><strong>Location:</strong> {selectedEvent.location}</div>
                )}
                {selectedEvent.pincode && (
                  <div><strong>Pincode:</strong> {selectedEvent.pincode}</div>
                )}
                {selectedEvent.participants && (
                  <div><strong>Participants:</strong> {selectedEvent.participants}</div>
                )}
                {selectedEvent.social && (
                  <div><strong>Social:</strong> {selectedEvent.social}</div>
                )}
                {selectedEvent.imageUrl && (
                  <div className="mt-3">
                    <img src={selectedEvent.imageUrl} alt={selectedEvent.event_name} className="rounded-md max-h-48 object-cover w-full" />
                  </div>
                )}
                <div className="mt-4 flex gap-2">
                  <Button size="sm" asChild>
                    <Link href={selectedEvent.event_link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      View Details
                    </Link>
                  </Button>
                  {selectedEvent.website_link && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={selectedEvent.website_link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default GetEvents