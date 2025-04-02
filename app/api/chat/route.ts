import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 1024,
};

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    console.log(userId)
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: No session found" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized: Failed to fetch user details" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const firstName = user.firstName || "Unknown";
    if (!email) {
      return NextResponse.json({ message: "User email not found" }, { status: 400 });
    }

    let existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: {
          email,
          name: firstName,
        },
      });
    }

    let body;
    try {
      body = await request.json();
      console.log(body)
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { theme, title } = body;
    if(typeof body != "object"){
      console.log("no obkefe")
    }
    if (!theme || !title) {
      return NextResponse.json({ message: "Theme and Title are required" }, { status: 400 });
    }

    const chatSession = model.startChat({ generationConfig, history: [] });
    const prompt = `
      Generate a hackathon project idea based on the following details:

      **Theme:** ${theme}
      **Title:** ${title}

      Provide:
      1. **Description** (Overview of the brief idea)
      2. **Implementation** (How it will be built e.g., Tech stack, resources, app or website, in-depth implementation)
      3. **Uniqueness** (Why this idea is innovative)
      4. **Give relevant ApI links** (If applicable)
    `;

    const result = await chatSession.sendMessage(prompt);
    const generatedIdea = result?.response?.text()?.trim();

    if (!generatedIdea) {
      return NextResponse.json({ message: "Unable to generate response." }, { status: 400 });
    }

    const userIdea = await prisma.ideas.create({
      data: {
        title,
        theme,
        response: generatedIdea,
        userId: existingUser.id,
      },
    });
    

    return NextResponse.json({ message: { id: userIdea.id, title, theme } }, { status: 200 });

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
