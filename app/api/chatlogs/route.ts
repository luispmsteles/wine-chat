import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chatLogs = await prisma.chatLog.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(chatLogs);
  } catch (error) {
    console.error("Error fetching chat logs:", error);
    return NextResponse.json({ error: "Failed to fetch chat logs" }, { status: 500 });
  }
}
