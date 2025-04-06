"use client";

import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, LinkIcon, MapPin, Users, Wifi } from "lucide-react"; // Import icons

interface JoinedEvent {
  memberId: string;
  eventId: string;
  event: {
    id: string;
    event_link: string;
    event_name: string;
    imageUrl: string | null;
    website_link: string;
    social: string | null;
    participants: string;
    start_date: string;
    end_date: string;
    location: string;
    pincode: string;
    // description: string; // Excluded as requested
  };
}

const MyEventsPage = () => {
  const { isSignedIn } = useUser();
  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      const fetchMyEvents = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/events/my-events');
          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to fetch joined events');
            return;
          }
          const data = await response.json();
          setJoinedEvents(data.result?.JoinedEvents);
        } catch (err: any) {
          console.error('Error fetching joined events:', err);
          setError('Failed to fetch joined events');
        } finally {
          setLoading(false);
        }
      };

      fetchMyEvents();
    } else {
      setLoading(false);
      setError("Please sign in to view your events.");
    }
  }, [isSignedIn]);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">My Events</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className='bg-neutral-900'>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full bg-neutral-800 rounded-md" />
                <Skeleton className="h-4 w-3/4 bg-neutral-800 rounded-md" />
                <Skeleton className="h-4 w-1/2 bg-neutral-800 rounded-md" />
                <div className="flex items-center gap-2 bg-neutral-800 rounded-md p-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2 bg-neutral-800 rounded-md p-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">My Events</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!joinedEvents || joinedEvents.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-4">My Events</h1>
        <p className="text-muted-foreground">You haven't joined any events yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 font-bold">
      <h1 className="text-2xl font-semibold mb-4">My Events</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {joinedEvents.map((joinedEvent) => (
          <Card key={joinedEvent.eventId} className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-3xl">{joinedEvent.event.event_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-white">
              {joinedEvent.event.imageUrl && (
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <img
                    src={joinedEvent.event.imageUrl}
                    alt={joinedEvent.event.event_name}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 bg-neutral-800 rounded-md p-2">
                <Calendar className="h-4 w-4 text-white-alpha-70" />
                <p className="text-sm text-white-alpha-70">
                  {new Date(joinedEvent.event.start_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-white-alpha-70">-</p>
                <p className="text-sm text-white-alpha-70">
                  {new Date(joinedEvent.event.end_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-neutral-800 rounded-md p-2">
                <MapPin className="h-4 w-4 text-white-alpha-70" />
                <p className="text-sm text-white-alpha-70">
                  {joinedEvent.event.location}, {joinedEvent.event.pincode}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-neutral-800 rounded-md p-2">
                <Users className="h-4 w-4 text-white-alpha-70" />
                <p className="text-sm text-white-alpha-70">
                  {joinedEvent.event.participants} Participants
                </p>
              </div>
              {joinedEvent.event.website_link && (
                <div className="bg-neutral-800 rounded-md p-2">
                  <Link
                    href={joinedEvent.event.website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm flex items-center gap-2"
                  >
                    <Wifi className="h-4 w-4" /> Website
                  </Link>
                </div>
              )}
              {joinedEvent.event.event_link && (
                <div className="bg-neutral-800 rounded-md p-2">
                  <Link
                    href={joinedEvent.event.event_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm flex items-center gap-2"
                  >
                    <LinkIcon className="h-4 w-4" /> Event Link
                  </Link>
                </div>
              )}
              {joinedEvent.event.social && (
                <div className="bg-neutral-800 rounded-md p-2">
                  <p className="text-sm text-white-alpha-70 flex items-center gap-2">
                    <Share className="h-4 w-4" /> Social: {joinedEvent.event.social}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Share = Wifi; 

export default MyEventsPage;