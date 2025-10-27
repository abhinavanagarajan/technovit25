import { NextRequest, NextResponse } from "next/server";

interface LaunchRequest {
  token: string;
}

export async function POST(req: NextRequest) {
  const LAUNCH_TOKEN = process.env.LAUNCH_TOKEN;
  const D1_ACCOUNT_ID = process.env.D1_ACCOUNT_ID;
  const D1_DATABASE_ID = process.env.D1_DATABASE_ID;
  const D1_API_TOKEN = process.env.D1_API_TOKEN;

  try {
    const { token } = (await req.json()) as LaunchRequest;

    if (token !== LAUNCH_TOKEN) {
      return NextResponse.json({ error: "Invalid token." }, { status: 403 });
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
          sql: "UPDATE LaunchState SET launched = 1 WHERE id = 1",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Cloudflare API Error: ${response.status} ${
          response.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }

    return NextResponse.json({ success: true, message: "Launch successful!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to trigger launch." },
      { status: 500 }
    );
  }
}
