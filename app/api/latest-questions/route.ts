import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const latestQuestions = await prisma.chatLog.findMany({
      orderBy: { createdAt: "desc" },
      select: { question: true, location: true },
    });

    // Filter questions that contain "wine"
    const filteredQuestions = latestQuestions
      .filter(q => q.question.toLowerCase().includes("wine"));

    // Remove duplicates
    const uniqueQuestions = Array.from(
      new Map(filteredQuestions.map(q => [q.question.toLowerCase(), q])).values()
    ).slice(0, 6); // Limit to 6 unique questions


    return NextResponse.json(uniqueQuestions);
  } catch (error) {
    console.error("Error fetching latest questions:", error);
    return NextResponse.json({ error: "Failed to fetch latest questions" }, { status: 500 });
  }
}
