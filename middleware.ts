import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface D1ApiResponse {
  result: {
    results: {
      launched: 0 | 1;
    }[];
  }[];
  success: boolean;
  errors: unknown[];
  messages: unknown[];
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/launch")) {
    const LAUNCH_TOKEN = process.env.LAUNCH_TOKEN;
    const D1_ACCOUNT_ID = process.env.D1_ACCOUNT_ID;
    const D1_DATABASE_ID = process.env.D1_DATABASE_ID;
    const D1_API_TOKEN = process.env.D1_API_TOKEN;

    const url = request.nextUrl;
    const token = url.searchParams.get("token");

    if (token !== LAUNCH_TOKEN) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${D1_ACCOUNT_ID}/d1/database/${D1_DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${D1_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sql: "SELECT launched FROM LaunchState WHERE id = 1",
          }),
        }
      );

      if (!response.ok) {
        console.error("D1 API Error:", await response.text());
        return NextResponse.redirect(new URL("/", request.url));
      }

      const data: D1ApiResponse = await response.json();

      const hasLaunched = data.result?.[0]?.results?.[0]?.launched === 1;

      if (hasLaunched) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Failed to check launch state:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
}
