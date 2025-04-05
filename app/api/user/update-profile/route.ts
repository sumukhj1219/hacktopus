import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const {
      firstName,
      lastName,
      username,
      bio,
      profilePicture,
      socialLinks,
      mobileNumber,
      location,
    } = await request.json();

    await prisma.user.upsert({
      where: {
        id: existingUser?.id || "", 
      },
      update: {
        firstName,
        lastName,
        username,
        bio,
        imageUrl: profilePicture,
        instagramLink: socialLinks?.instagram || null,
        linkedinLink: socialLinks?.linkedin || null,
        githubLink: socialLinks?.github || null,
        youtubeLink: socialLinks?.youtube || null,
        websiteLink: socialLinks?.website || null,
        twitterLink: socialLinks?.twitter || null,
        phone: mobileNumber,
        location: location || null,
      },
      create: {
        email: user.emailAddresses[0].emailAddress,
        firstName,
        lastName,
        username,
        bio,
        imageUrl: profilePicture,
        instagramLink: socialLinks?.instagram || null,
        linkedinLink: socialLinks?.linkedin || null,
        githubLink: socialLinks?.github || null,
        youtubeLink: socialLinks?.youtube || null,
        websiteLink: socialLinks?.website || null,
        twitterLink: socialLinks?.twitter || null,
        phone: mobileNumber,
        location: location || null,
      },
    });

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error); 
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}