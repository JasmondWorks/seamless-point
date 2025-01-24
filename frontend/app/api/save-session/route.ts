// app/api/save-session/route.ts
import { NextRequest, NextResponse } from "next/server";

// Store sessionId and userType temporarily
const sessionStore = new Map<string, string>();

export async function POST(req: NextRequest) {
  const { sessionId, userType } = await req.json();

  // Store session ID with corresponding userType
  sessionStore.set(sessionId, userType);

  return NextResponse.json({ message: "Session saved successfully" });
}
