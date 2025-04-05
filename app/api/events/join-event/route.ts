import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
        }

        const email = user.emailAddresses?.[0].emailAddress;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
        }

        const body = await request.json()
        const {firstName, lastName, linkedInUrl, eventId} = body
        if(!firstName || !lastName || !linkedInUrl){
            return NextResponse.json({message:"All fields are required"})
        }

        await prisma.joinedEvents.create({
            data:{
                memberId:existingUser.id,
                eventId:eventId
            }
        })

        return NextResponse.json({message:"Joined"}, {status:200})
    } catch (error) {
        console.error("Error joining hackathon:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
