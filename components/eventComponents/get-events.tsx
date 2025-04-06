"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, X } from "lucide-react";
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
import { JoinEventForm } from "./join-event";

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
        <SheetContent className="bg-neutral-900 font-bold max-w-3xl overflow-y-auto flex flex-col">
          <Button
            variant="ghost"
            className="absolute top-2 right-2 text-secondary hover:bg-neutral-800 rounded-full"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
          {selectedEvent && (
            <div className="p-6 flex flex-col items-center text-secondary">
              <div className="flex">
              <Link
                href={selectedEvent.event_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-6" // Increased margin for better spacing
              >
                <Button >
                  Event Page <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                
              </Link>
              <JoinEventForm eventId={selectedEvent.id} />
              </div>
             
              <div
                className="relative w-full rounded-md overflow-hidden mb-6" // Increased margin below image
                style={{ maxHeight: '300px' }}
              >
                {selectedEvent.imageUrl && (
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.event_name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="w-full flex flex-col items-start">
                <SheetHeader className="pb-4 items-start w-full"> {/* Make SheetHeader full width */}
                  <SheetTitle className="text-2xl font-semibold text-secondary">
                    {selectedEvent.event_name}
                  </SheetTitle>
                  <SheetDescription className="text-secondary mt-2">
                    Hosted by {selectedEvent.createdBy || 'Organizer not specified'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mb-4 w-full">
                  <div className="flex items-center gap-2 text-secondary mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75S17.384 2.25 12 2.25zm-2.625 6a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zM13.5 12a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm-6 0a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm9.75 3.375c-.966 0-1.9-.234-2.74-.674a9.724 9.724 0 00-5.641 0c-.84.44-1.774.674-2.74.674a3.375 3.375 0 01-3.375-3.375c0-2.515 1.94-4.57 4.388-4.924.415-.059.832-.087 1.25-.087.418 0 .835.028 1.25.087 2.448.349 4.388 2.404 4.388 4.924a3.375 3.375 0 01-3.375 3.375z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Featured in Bengaluru
                  </div>
                  <div className="flex items-center gap-2 text-secondary mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zm-2.625 1.5a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm5.25 0a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {selectedEvent.social || 'Social Club'}
                  </div>
                  <div className="flex items-center gap-2 text-secondary mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zm-2.625 1.5a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0zm5.25 0a1.125 1.125 0 102.25 0 1.125 1.125 0 00-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Hosted by {selectedEvent.createdBy || 'Organizer not specified'}
                  </div>
                  <div className="flex items-center gap-2 mt-2 mb-2">
                    <div className="relative w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-secondary">
                      <span className="absolute top-0 left-0 w-full h-1/2 flex items-center justify-center text-xs">
                        {selectedEvent.start_date
                          ? format(new Date(selectedEvent.start_date), 'MMM').toUpperCase()
                          : 'TBD'}
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-1/2 flex items-center justify-center font-semibold">
                        {selectedEvent.start_date
                          ? format(new Date(selectedEvent.start_date), 'd')
                          : 'TBD'}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-secondary">
                        {selectedEvent.start_date
                          ? format(new Date(selectedEvent.start_date), 'EEEE MMMM d')
                          : 'TBD'}
                      </div>
                      <div className="text-sm text-secondary">
                        {selectedEvent.start_date
                          ? format(new Date(selectedEvent.start_date), 'HH:mm')
                          : 'TBD'}{' '}
                        -{' '}
                        {selectedEvent.end_date
                          ? format(new Date(selectedEvent.end_date), 'HH:mm')
                          : 'TBD'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-secondary mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.54 22.351l.071-.03c1.833-.782 3.17-2.279 3.17-4.026V4.875a.75.75 0 00-1.5 0v13.45c0 1.227-.739 2.378-1.95 3.07-1.303.762-2.966.762-4.269 0-1.211-.692-1.95-1.843-1.95-3.07V4.875a.75.75 0 00-1.5 0v13.45c0 1.747 1.337 3.244 3.17 4.026l.071.03a.75.75 0 00.656 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {selectedEvent.location || 'Location not available'}, Karnataka
                  </div>
                </div>
                <div className="bg-neutral-800 rounded-md p-4 text-center text-red-500 font-semibold w-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mx-auto mb-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-3a5.25 5.25 0 00-5.25-5.25zM12 12a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sold Out
                </div>
                <div className="text-secondary mb-4">{selectedEvent.description}</div>
                <p className="text-sm text-secondary mt-2 text-center">
                  This event is sold out and no longer taking registrations.
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default GetEvents