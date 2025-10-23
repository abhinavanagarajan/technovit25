import { NextResponse } from "next/server";

export async function GET() {
  const primaryUrl = process.env.NEXT_PUBLIC_ASSETS_URL;
  const fallbackUrl = process.env.NEXT_PUBLIC_FALLBACK_ASSETS_URL;

  const urlsToTry = [primaryUrl, fallbackUrl].filter(
    (url): url is string => typeof url === "string" && url.length > 0
  );

  if (urlsToTry.length === 0) {
    const errorMessage =
      "No asset source URLs are defined in environment variables.";
    console.error(`Configuration Error: ${errorMessage}`);
    return NextResponse.json(
      { message: "Server configuration error.", error: errorMessage },
      { status: 500 }
    );
  }

  const errors: Record<string, string> = {};

  for (const baseUrl of urlsToTry) {
    const fullUrl = `${baseUrl}/events.json`;
    try {
      console.log(`Attempting to fetch from: ${fullUrl}`);
      const response = await fetch(fullUrl, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.warn(`Failed to fetch from ${fullUrl}: ${errorMessage}`);
      errors[baseUrl] = errorMessage;
    }
  }

  console.error("All fetch attempts failed.", errors);
  return NextResponse.json(
    {
      message: "Error fetching event data from all available sources.",
      errors,
    },
    { status: 500 }
  );
}
