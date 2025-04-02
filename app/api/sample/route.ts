import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {id} = await request.json()
        if(!id){
            return NextResponse.json({message:"No id found"}, {status:404})
        }

        const sampleIdeas = await prisma.sampleIdeas.findUnique({
            where:{
                id:id
            }
        })

        return NextResponse.json({result:sampleIdeas}, {status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal server error"}, {status:500})
    }
}