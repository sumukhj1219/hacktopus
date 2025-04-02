import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const hackathons = await prisma.userHackathons.findMany()
        if(!hackathons){
            return NextResponse.json({message:"No hackathons found"}, {status:404})
        }

        return NextResponse.json({result:hackathons}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal server error"}, {status:500})
    }
}