"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import axios from "axios";
import { GlowingCard } from "@/components/ui/glowing-card";
import { Sparkles } from "@/components/ui/sparkles";
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

                const response = await axios.get(`/api/hackathons/${id}`);

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

                <GlowingCard className="max-w-xl mx-auto">
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "Unable to load hackathon details"}</p>
                        <Button asChild>
                            <Link href="/hackathons">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Hackathons
                            </Link>
                        </Button>
                    </div>
                </GlowingCard>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/hackathons"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
            >
                <ArrowLeft className="mr-1 h-4 w-4" /> Back to Hackathons
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <GlowingCard className="h-full">
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className={`${hackathon.platform === 'devfolio' ? 'bg-blue-500' : 'bg-purple-500'} capitalize`}>
                                    {hackathon.platform}
                                </Badge>
                                {hackathon.deadline && (
                                    <Badge variant="warning">
                                        Deadline: {hackathon.deadline}
                                    </Badge>
                                )}
                            </div>

                            <Sparkles>
                                <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                                    {hackathon.hackathon_name}
                                </h1>
                            </Sparkles>

                            {hackathon.description && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">About</h2>
                                    <div className="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">
                                        {hackathon.description.split('\n').map((paragraph, idx) => (
                                            paragraph.trim() ? <p key={idx} className="mb-2">{paragraph}</p> : null
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hackathon.theme && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">Theme</h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {hackathon.theme}
                                    </p>
                                </div>
                            )}

                            {hackathon.requirements && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {hackathon.requirements.split('\n').map((line, idx) => (
                                            line.trim() ? <p key={idx} className="mb-1">{line}</p> : null
                                        ))}
                                    </div>
                                </div>
                            )}

                            {hackathon.prizes && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">Prizes</h2>
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {hackathon.prizes.split('\n').map((line, idx) => (
                                            line.trim() ? <p key={idx} className="mb-1">{line}</p> : null
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4 mt-6">
                                <Button className="w-full md:w-auto" asChild>
                                    <a href={hackathon.hackathon_link} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Apply Now
                                    </a>
                                </Button>
                                {hackathon.website_link && (
                                    <Button variant="outline" className="w-full md:w-auto" asChild>
                                        <a href={hackathon.website_link} target="_blank" rel="noopener noreferrer">
                                            <Globe className="mr-2 h-4 w-4" /> Visit Website
                                        </a>
                                    </Button>
                                )}
                                <Button 
                                    className="w-full md:w-auto"
                                    variant="outline"
                                    asChild
                                >
                                    <Link href="/idea">
                                        <Sparkle className="mr-2 h-4 w-4" />
                                        Generate Project Idea
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </GlowingCard>
                </div>

                <div>
                    <GlowingCard className="h-full">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Hackathon Details</h2>

                            <div className="space-y-4">
                                {hackathon.date && (
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-orange-500 mt-0.5" />
                                        <div>
                                            <h3 className="font-medium">Date</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{hackathon.date}</p>
                                        </div>
                                    </div>
                                )}

                                {hackathon.duration && (
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                                        <div>
                                            <h3 className="font-medium">Duration</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{hackathon.duration}</p>
                                        </div>
                                    </div>
                                )}

                                {hackathon.location && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                                        <div>
                                            <h3 className="font-medium">Location</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{hackathon.location}</p>
                                        </div>
                                    </div>
                                )}

                                {hackathon.participants && (
                                    <div className="flex items-start gap-3">
                                        <Users className="h-5 w-5 text-orange-500 mt-0.5" />
                                        <div>
                                            <h3 className="font-medium">Participants</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{hackathon.participants}</p>
                                        </div>
                                    </div>
                                )}

                                {hackathon.organizer && (
                                    <div className="flex items-start gap-3">
                                        <Award className="h-5 w-5 text-orange-500 mt-0.5" />
                                        <div>
                                            <h3 className="font-medium">Organizer</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{hackathon.organizer}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="font-medium mb-2">Source</h3>
                                <p className="text-sm text-gray-500">
                                    Information scraped from {hackathon.platform} and may not be complete.
                                    Visit the official website for the most accurate details.
                                </p>
                            </div>
                        </div>
                    </GlowingCard>
                </div>
            </div>
        </div>
    );
} 