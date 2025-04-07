import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser()
        if (!user) {
            return NextResponse.json({ message: "Unauthourized user" }, { status: 405 })
        }
        const email = user.emailAddresses?.[0].emailAddress
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!existingUser) {
            return NextResponse.json({ message: "Unauthourized user" }, { status: 405 })
        }

        const hackathons = await prisma.hackathons.findMany()

        return NextResponse.json({result:hackathons}, {status:200})
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}