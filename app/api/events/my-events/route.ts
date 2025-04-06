import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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

        const myEvents = await prisma.user.findUnique({
            where:{
                id:existingUser.id
            },
            include:{
                JoinedEvents:{
                    include:{
                        event:true
                    }
                }
            }
        })

        return NextResponse.json({result:myEvents}, {status:200})
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}