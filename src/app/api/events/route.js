import { NextResponse } from "next/server";

export async function GET() {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL;

  if (!assetsUrl) {
    const errorMessage = "NEXT_PUBLIC_ASSETS_URL is not defined";
    console.error(`Configuration Error: ${errorMessage}`);
    return NextResponse.json(
      { message: "Server configuration error.", error: errorMessage },
      { status: 500 }
    );
  }

  const eventsJsonUrl = `${assetsUrl}/events.json`;

  try {
    const response = await fetch(eventsJsonUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch events data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching external events.json:", errorMessage);
    return NextResponse.json(
      {
        message: "Error fetching event data from source.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
