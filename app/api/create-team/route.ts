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

        const body = await request.json().catch(() => null);
        const { team_name, total_participants, hackathonId } = body;

        if (!team_name || !total_participants || !hackathonId) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const participants = parseInt(total_participants, 10);
        if (isNaN(participants) || participants < 1) {
            return NextResponse.json({ message: "Invalid participants count" }, { status: 400 });
        }

        const team = await prisma.teams.create({
            data: {
                team_name,
                total_participants: participants,
                users: { connect: { id: existingUser.id } },
            },
        });

        await prisma.user.update({
            where: { email },
            data: { teamId: team.id },
        });

        await prisma.userHackathons.update({
            where: { id: hackathonId },
            data: {
                total_participants: { increment: participants }, 
            },
        });

        await prisma.userHackathonParticipants.create({
            data: {
                userId: existingUser.id,
                hackathonId,
            },
        });

        return NextResponse.json({ result: team.id }, { status: 200 });
    } catch (error) {
        console.error("Error joining hackathon:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
