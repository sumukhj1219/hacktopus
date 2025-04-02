import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

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
    // const user = await currentUser();
    // if (!user) {
    //   return NextResponse.json({ message: "Unauthorized: No user found" }, { status: 401 });
    // }

    // const email = user.emailAddresses[0]?.emailAddress;
    // const firstName = user.firstName || "Unknown";
    // if (!email) {
    //   return NextResponse.json({ message: "User email not found" }, { status: 400 });
    // }
    const email = "sumukhjoshi4@gmail.com"
    const firstName = "Sumukh"

    let existingUser = await prisma.user.findFirst({ where: { email } });

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
      console.log(body);
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const { theme, title } = body;
    if (!body || typeof body !== "object" || !theme || !title) {
      return NextResponse.json({ message: "Theme and Title are required" }, { status: 400 });
    }

    const chatSession = model.startChat({ generationConfig, history: [] });
    const prompt = `
      Generate **exactly 5 hackathon project ideas** in **valid JSON format**.

      - **Theme:** ${theme}
      - **Title:** ${title}
      
      Return a **valid JSON array** with **exactly** the following structure:

      \`\`\`json
      [
        {
          "title": "Project Title 1",
          "description": "Brief description of the project (50-60 words)."
        },
        {
          "title": "Project Title 2",
          "description": "Brief description of the project (50-60 words)."
        }
      ]
      \`\`\`

      Ensure it is **correctly formatted JSON** and does **not contain extra text**.
    `;

    const result = await chatSession.sendMessage(prompt);
    const generatedIdea = result.response.text().trim();

    if (!generatedIdea) {
      return NextResponse.json({ message: "Unable to generate response." }, { status: 400 });
    }
    const userIdea = await prisma.sampleIdeas.create({
      data: {
        title: title,
        response: generatedIdea,
        userId: existingUser.id
      }
    });

    return NextResponse.json({ result: userIdea.id }, { status: 200 });

  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
