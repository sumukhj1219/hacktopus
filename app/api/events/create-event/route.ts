import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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


        const body = await request.json()
        const { event_link,
            event_name,
            imageUrl,
            website_link,
            social,
            participants,
            start_date,
            end_date,
            pincode,
            location, description } = body

        if (!event_link || !event_name || !imageUrl || !website_link || !social || !participants || !start_date || !end_date || !pincode || !location || !description) {
            return NextResponse.json({message:"All fields are required"})
        }

        await prisma.events.create({ 
            data: {
              event_link,
              event_name,
              imageUrl,
              website_link,
              social,
              participants,
              start_date,
              end_date,
              pincode,
              location,
              description,
              createdBy: existingUser.id, 
            },
          });

        return NextResponse.json({message:"New event added"}, {status:200})
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}