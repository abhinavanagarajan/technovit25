// app/api/validate-token/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const LAUNCH_TOKEN = process.env.LAUNCH_TOKEN;
  const D1_ACCOUNT_ID = process.env.D1_ACCOUNT_ID;
  const D1_DATABASE_ID = process.env.D1_DATABASE_ID;
  const D1_API_TOKEN = process.env.D1_API_TOKEN;

  try {
    const { token } = await req.json();

    if (token !== LAUNCH_TOKEN) {
      return NextResponse.json(
        { valid: false, reason: "Invalid token." },
        { status: 403 }
      );
    }

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
      return NextResponse.json(
        { valid: false, reason: "Database error." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const launchState = data.result[0]?.results[0]?.launched;

    if (launchState === 0) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json(
        { valid: false, reason: "Site already launched." },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
