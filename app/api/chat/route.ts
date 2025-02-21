import { NextResponse } from "next/server";
import ollama from "ollama";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

async function getLocation(ip: string) {
  try {
    // Handle local & private IPs
    if (
      ip === "unknown" ||
      ip === "::1" ||
      ip === "127.0.0.1" ||
      ip.startsWith("192.") ||
      ip.startsWith("10.") ||
      ip.startsWith("172.16.")
    ) {
      return "Localhost";
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.error) {
      console.warn("Geolocation error:", data.reason);
      return "Unknown Location";
    }

    return data.city ? `${data.city}` : "Unknown Location";
  } catch (error) {
    console.error("Error fetching location:", error);
    return "Unknown Location";
  }
}


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const userQuestion = messages[messages.length - 1].content;

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const location = await getLocation(ip);

    // System Message
    const systemMessage = {
      role: "system",
      content: `### **Role:**

You are a **world-renowned wine expert AI.**

### **Strict Rules:**

-   **Only answer wine-related questions.** If a question is unrelated, respond:
    -   *"I only discuss wine. Please ask a wine-related question."*
-   **Use concise, Markdown-formatted responses** with:
    -   **Bold** key terms
    -   *Italics* for special terms
    -   Lists for clarity
-   **Include a summary as the second sentence** and highlight it.
-   **Do NOT use "<think>" tags** or add unrelated details.

### **Examples:**

**Invalid question:** *"Tell me about the Eiffel Tower."*\
**Response:** *"I only discuss wine. Please ask a wine-related question."*

**Valid question:** *"What wine pairs well with salmon?"*\
**Response:**\
**Chardonnay** is a great match for salmon.\
*Its buttery texture and bright acidity complement the fish.*

-   **Chardonnay** enhances mild flavors.
-   **Pinot Noir** works well with richer salmon dishes. 
      `,
    };

    const response = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [systemMessage, ...messages],
    });


    let fullResponse = response?.message?.content || "Sorry, I couldn't generate a response.";
    fullResponse = fullResponse.replace(/<\/?think>/g, "");

    const extractedSentence = fullResponse.split(". ")[1] || "";

    await prisma.chatLog.create({
      data: {
        question: userQuestion,
        response: fullResponse,
        extracted: extractedSentence,
        ip,
        location,
      },
    });

    return NextResponse.json({ reply: fullResponse });
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
