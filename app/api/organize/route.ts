import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const user = await currentUser()
        if(!user){
            return NextResponse.json({message:"Unauthourized user"}, {status:405})
        }
        const email = user.emailAddresses?.[0].emailAddress
        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!existingUser){
            return NextResponse.json({message:"Unauthourized user"}, {status:405})
        }
        
        const {hackathon_name, hackathon_website, theme, imageUrl, location, description, contactInfo_1, contactInfo_2, contactEmail_2, contactEmail_1} = await request.json()
        if(!hackathon_name || !hackathon_website || !theme || !imageUrl || !location || !description || !contactEmail_1 || !contactEmail_2 || !contactInfo_1 || !contactInfo_2){
            return NextResponse.json({message:"All fields are required"}, {status:405})
        }

        const organizedHackathons = await prisma.userHackathons.create({
            data:{
                hackathon_name:hackathon_name,
                hackathon_website:hackathon_website,
                theme:theme,
                imageUrl:imageUrl,
                location:location,
                description:description,
                contactInfo_1,
                contactInfo_2,
                contactEmail_1,
                contactEmail_2
            }
        })

        const organizer = await prisma.userHackathonOrganizers.create({
            data:{
                userId:existingUser.id,
                hackathonId:organizedHackathons.id
            }
        })

        console.log(organizer)
      
        return NextResponse.json({result:organizedHackathons}, {status:200})

    } catch (error) {
        return NextResponse.json({message:"Internal Server error"}, {status:500})
    }
}