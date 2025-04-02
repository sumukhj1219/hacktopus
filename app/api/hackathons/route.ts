import { prisma } from "@/lib/db";
import {  NextResponse } from "next/server";

export async function GET() {
    try {
        const hackathons = await prisma.hackathons.findMany()
        if(hackathons === null)
            return NextResponse.json({message:"Error in fetching hackathons"}, {status:404})
        return NextResponse.json({results:{hackathons}}, {status:200})
    } catch (error) {
        return NextResponse.json({message:error}, {status:500})
    }
}