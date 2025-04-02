import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        if (!params.id) {
            return NextResponse.json(
                { error: "Hackathon ID is required" },
                { status: 400 }
            );
        }

        const hackathon = await prisma.hackathons.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!hackathon) {
            return NextResponse.json(
                { error: "Hackathon not found" },
                { status: 404 }
            );
        }

        // Default values for additional details
        let additionalInfo: any = {
            description: hackathon.theme
                ? `Join this exciting hackathon focused on ${hackathon.theme}. This event provides a great opportunity to collaborate with other developers, designers, and innovators to build amazing projects.`
                : "Join this exciting hackathon to showcase your skills and collaborate with other talented individuals. This is a great opportunity to learn, build, and network.",
            duration: "Check the hackathon website for details.",
            location: hackathon.lat && hackathon.long ? "Check the hackathon website for the exact location." : "Online",
            prizes: "Visit the hackathon website for prize details.",
            organizer: "Information not available",
            requirements: "Visit the hackathon website for detailed requirements.",
            deadline: "Check the hackathon website for the deadline.",
        };

        // Try to scrape additional information from the hackathon website
        try {
            if (hackathon.hackathon_link) {
                const response = await axios.get(hackathon.hackathon_link, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    },
                    timeout: 5000 // 5 second timeout
                });

                const $ = cheerio.load(response.data);

                // Different scraping logic based on platform
                if (hackathon.platform === "devfolio") {
                    // Devfolio specific scraping
                    const description = $('.overflow-hidden.mb-4').text().trim();
                    const dateInfo = $('.text-lg.font-semibold.text-slate-700').text().trim();
                    const location = $('.flex.items-center.gap-1').text().trim();
                    const prizes = $('.text-base.font-medium.text-slate-500').text().trim();
                    const requirementsText = $('.grid.grid-cols-1 p').text().trim();

                    if (description) additionalInfo.description = description;
                    if (dateInfo) additionalInfo.duration = dateInfo;
                    if (location) additionalInfo.location = location;
                    if (prizes) additionalInfo.prizes = prizes;
                    if (requirementsText) additionalInfo.requirements = requirementsText;
                }
                else if (hackathon.platform === "dora") {
                    // Dora specific scraping
                    const description = $('.description').text().trim();
                    const dateInfo = $('.text-primary').text().trim();
                    const organizerInfo = $('.flex.flex-row.gap-1').text().trim();

                    if (description) additionalInfo.description = description;
                    if (dateInfo) additionalInfo.duration = dateInfo;
                    if (organizerInfo) additionalInfo.organizer = organizerInfo;
                }
            }
        } catch (error) {
            console.error("Error scraping data:", error);
            // Fallback to default values if scraping fails
        }

        // Combine the hackathon data with the additional scraped information
        const enhancedHackathon = {
            ...hackathon,
            ...additionalInfo
        };

        return NextResponse.json({ hackathon: enhancedHackathon }, { status: 200 });
    } catch (error) {
        console.error("Error fetching hackathon details:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 