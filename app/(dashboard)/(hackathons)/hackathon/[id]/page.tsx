"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import axios from "axios";
import { Calendar, Globe, MapPin, Users, Clock, Award, Target, ExternalLink, ArrowLeft, Loader2, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface HackathonDetails {
    id: string;
    hackathon_name: string;
    theme?: string;
    description?: string;
    participants?: string;
    date?: string;
    location?: string;
    hackathon_link: string;
    website_link?: string;
    duration?: string;
    prizes?: string;
    platform: string;
    lat: number;
    long: number;
    organizer?: string;
    requirements?: string;
    deadline?: string;
    imageUrl?: string; // Add imageUrl field
    pricePool?: number; // Add pricePool field
}

export default function HackathonDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [hackathon, setHackathon] = useState<HackathonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scrapingStatus, setScrapingStatus] = useState<string>("Finding additional details...");

    useEffect(() => {
        const fetchHackathonDetails = async () => {
            try {
                setLoading(true);
                setScrapingStatus("Locating hackathon information...");

                const response = await axios.get(`/api/events/hackathons/${id}`);

                if (response.status === 200 && response.data.hackathon) {
                    setHackathon(response.data.hackathon);
                    setScrapingStatus("Successfully gathered details!");
                } else {
                    setError("Failed to fetch hackathon details");
                }
            } catch (error: any) {
                console.error("Error fetching hackathon details:", error);
                if (error.response && error.response.status === 404) {
                    return notFound();
                }
                setError("An error occurred while fetching hackathon details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchHackathonDetails();
        }
    }, [id, router]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/hackathons"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Hackathons
                </Link>

                <div className="flex items-center justify-center flex-col py-24">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-6" />
                    <h3 className="text-xl font-medium mb-2">Fetching Hackathon Details</h3>
                    <p className="text-gray-500">{scrapingStatus}</p>
                </div>
            </div>
        );
    }

    if (error || !hackathon) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/hackathons"
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Hackathons
                </Link>
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Unable to load hackathon details"}</p>
                        <Button asChild>
                            <Link href="/hackathons">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Hackathons
                            </Link>
                        </Button>
                    </div>
            </div>
        );
    }

    const startDate = hackathon.date?.split(' - ')[0];
    const endDate = hackathon.date?.split(' - ')[1];

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/hackathons"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
            >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Hackathons
            </Link>

            <div className="grid grid-cols-1 gap-8">
                {/* Cover Section */}
                <div
                    className="bg-orange-500 text-white relative rounded-lg overflow-hidden"
                    style={{ minHeight: '20vh', maxHeight: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {hackathon.imageUrl && (
                        <img
                            src={hackathon.imageUrl}
                            alt="Hackathon Cover"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-center">{hackathon.hackathon_name}</h1>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Left Grid: Buttons */}
                    <div className="space-y-4 md:col-span-1 lg:col-span-1">
                        <Button className="w-full">Register</Button>
                        <Button variant="outline" className="w-full">Make Team</Button>
                        <Button variant="secondary" className="w-full">My Team</Button>
                    </div>

                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            {hackathon.description ? (
                                <div className="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">
                                    {hackathon.description.split('\n').map((paragraph, idx) => (
                                        paragraph.trim() ? <p key={idx} className="mb-2">{paragraph}</p> : null
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No description available.</p>
                            )}
                        </div>

                        <div className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold mb-2">Details</h2>
                            {hackathon.pricePool !== undefined && (
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-yellow-500" />
                                    <span>Prize Pool: ${hackathon.pricePool}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-blue-500" />
                                <span>Participants: {hackathon.participants || 'N/A'}</span>
                            </div>
                            {startDate && (
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-green-500" />
                                    <span>Start Date: {startDate}</span>
                                </div>
                            )}
                            {endDate && (
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-red-500" />
                                    <span>End Date: {endDate}</span>
                                </div>
                            )}
                            {hackathon.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-purple-500" />
                                    <span>Location: {hackathon.location}</span>
                                </div>
                            )}
                            {hackathon.website_link && (
                                <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5 text-gray-500" />
                                    <Link href={hackathon.website_link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        Visit Website
                                    </Link>
                                </div>
                            )}
                        </div>
                </div>
            </div>
        </div>
    );
}