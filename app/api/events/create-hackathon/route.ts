import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { hackathonSchema } from "@/schemas/hackathonSchema"; 

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 401 }); 
        }
        const email = user.emailAddresses?.[0].emailAddress;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!existingUser) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
        }

        const body = await request.json();



        const {
            hackathon_name,
            hackathon_website,
            theme,
            imageUrl,
            location,
            description,
            contactInfo_1,
            contactInfo_2,
            contactEmail_2,
            contactEmail_1,
            pincode,
            social,
            start_date,
            prizePool,
            end_date,
            website_link,
        } = body;

        const organizedHackathon = await prisma.hackathons.create({
            data: {
                hackathon_name,
                hackathon_website,
                theme,
                imageUrl,
                location,
                description,
                contactInfo_1,
                contactInfo_2,
                contactEmail_1,
                contactEmail_2,
                pincode,
                social,
                start_date,
                end_date,
                prizePool,
                website_link,
                userId: existingUser.id, 
            },
        });

        const organizer = await prisma.joinedHackathons.create({
            data: {
                userId: existingUser.id,
                hackathonId: organizedHackathon.id,
            },
        });

        console.log("Organizer record created:", organizer);

        return NextResponse.json({ result: organizedHackathon }, { status: 200 }); 

    } catch (error) {
        console.error("Error creating hackathon:", error);
        return NextResponse.json({ message: "Internal Server error" }, { status: 500 });
    }
}