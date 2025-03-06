import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch geolocation data
    const response = await fetch("https://geolocation-db.com/json/");
    const data = await response.json();

    // Determine if the user is international
    const isInternational = data.country_code !== "NG";

    return NextResponse.json({
      success: true,
      country: data.country_name || "Unknown",
      isInternational,
    });
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { success: false, error: "Unable to determine location" },
      { status: 500 }
    );
  }
}
