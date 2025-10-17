import { NextResponse } from "next/server";

export async function GET() {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

  if (!assetsUrl) {
    console.error(
      "Error: NEXT_PUBLIC_ASSETS_URL is not defined in your environment variables."
    );
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  const eventsJsonUrl = `${assetsUrl}/events.json`;

  try {
    const response = await fetch(eventsJsonUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching external events.json:", error);
    return NextResponse.json(
      { message: "Error fetching event data from source." },
      { status: 500 }
    );
  }
}
