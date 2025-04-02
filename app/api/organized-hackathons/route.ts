import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 405 });
        }

        const email = user.emailAddresses?.[0].emailAddress;

        const existingUser = await prisma.user.findUnique({
            where: { email },
            include: { organizedHackathons: true }, 
        });

        if (!existingUser) {
            return NextResponse.json({ message: "Unauthorized user" }, { status: 405 });
        }

        const hackathonIds = existingUser.organizedHackathons.map((trx) => trx.hackathonId);

        if (hackathonIds.length === 0) {
            return NextResponse.json({ result: [] }, { status: 200 });
        }

        const hackathons = await prisma.userHackathons.findMany({
            where: {
                id: { in: hackathonIds }, 
            },
        });

        return NextResponse.json({ result: hackathons }, { status: 200 });
    } catch (error) {
        console.error("Error fetching hackathons:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
