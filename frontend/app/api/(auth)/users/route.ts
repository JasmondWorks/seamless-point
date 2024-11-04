import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("This is my first api.");
}
