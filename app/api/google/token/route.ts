// app/api/google-auth/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const tokenRequestBody = new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
      grant_type: "authorization_code",
    });

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: tokenRequestBody.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!tokenResponse.ok) {
      let errorData;
      try {
        errorData = await tokenResponse.json();
      } catch {
        return NextResponse.json(
          { error: "Failed to parse error from Google." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: errorData?.error_description || "Token exchange failed" },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    console.log("token data", tokenData);

    return NextResponse.json({
      access_token: tokenData.access_token,
      id_token: tokenData.id_token,
    });
  } catch (error) {
    console.error("Error during token exchange:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
