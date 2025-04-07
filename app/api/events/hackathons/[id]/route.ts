import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET( { params }: { params: { id: string } }) {
    try {
        const resolvedParams =  params;
        const { id } = resolvedParams;

        if (!id) {
            return NextResponse.json(
                { error: "Hackathon ID is required" },
                { status: 400 }
            );
        }

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized: No user found" }, { status: 401 });
        }

        const email = user.emailAddresses[0]?.emailAddress;
        if (!email) {
            return NextResponse.json({ message: "User email not found" }, { status: 400 });
        }

        let existingUser = await prisma.user.findFirst({ where: { email } });

        if (!existingUser) {
            return NextResponse.json({ message: "Unauthenticated user" }, { status: 401 })
        }

        const hackathon = await prisma.hackathons.findUnique({
            where: {
                id: id
            }
        });

        return NextResponse.json({ result: hackathon }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}