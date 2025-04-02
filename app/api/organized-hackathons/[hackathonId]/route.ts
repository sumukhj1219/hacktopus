import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { hackathonId: string } }) {
    try {
        const { hackathonId } = params;

        if (!hackathonId) {
            return NextResponse.json({ message: "Hackathon ID is required" }, { status: 400 });
        }

        const participants = await prisma.userHackathonParticipants.findMany({
            where: { hackathonId },
            include: { user: true }, 
        });

        return NextResponse.json({ participants }, { status: 200 });
    } catch (error) {
        console.error("Error fetching participants:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
