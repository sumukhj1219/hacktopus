import { prisma } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    temperature: 0.8,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1024,
};

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "FlowId is required" }, { status: 400 });
        }

        const idea = await prisma.ideas.findUnique({
            where: { id },
            include: { chart: true },
        });
        if (!idea) {
            return NextResponse.json({ message: "Idea not found" }, { status: 404 });
        }

        if (idea.chart) {
            return NextResponse.json({ result: idea.chart.rules }, { status: 200 });
        }

        const desc = idea.response;
        const chatSession = model.startChat({ generationConfig, history: [] });


        const prompt: string = `
Generate a **PlantUML flowchart** for the given **hackathon project idea**.

**Project Description:**  
${desc}

### **Flowchart Rules**
1. **Use correct PlantUML syntax** (no syntax errors).
2. **Each node should have a meaningful label** but **should not contain special characters** like \`()\`, \`-\`, \`&\`, or extra brackets inside brackets.
3. **Decisions must use diamond-shaped syntax (\`if (condition) then\`)**.
4. **Ensure proper connections using arrows (\`->\`)** and alternative flows (\`else\`).
5. **Use at least 15 nodes** to ensure a detailed and structured flowchart.

### **Example Flowchart Structure**
\`\`\`plantuml
@startuml
start
  :Define Hackathon Idea;
  :Research Feasibility;
  if (Idea is Viable?) then (Yes)
    :Plan Architecture;
    :Develop MVP;
    if (MVP is Ready?) then (Yes)
      :Test & Debug;
      :Deploy;
      :Monitor Performance;
    else (No)
      :Rework MVP;
    endif
  else (No)
    :Explore Other Ideas;
  endif
  :Gather Feedback;
  if (Feedback is Positive?) then (Yes)
    :Scale Project;
  else (No)
    :Optimize and Improve;
  endif
  stop
@enduml
\`\`\`

### **Important Notes:**  
- **Ensure logical readability and correct PlantUML syntax**.  
- **Follow correct flowchart structure (start → process → decision → end)**.  
- **No broken or disconnected nodes**.

Generate the PlantUML diagram following the above rules.
`;

        const result = await chatSession.sendMessage(prompt);

        const generatedChart = result?.response?.text()?.trim();

        if (!generatedChart) {
            return NextResponse.json({ message: "Failed to generate chart" }, { status: 500 });
        }

        const newChart = await prisma.charts.create({
            data: {
                ideaId: id,
                rules: generatedChart,
            },
        });

        return NextResponse.json({ result: newChart.rules }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error in charts" }, { status: 500 });
    }
} 