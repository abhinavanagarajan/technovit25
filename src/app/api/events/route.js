import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENT_DELIVERY_API_ACCESS_TOKEN;

  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=event`;

  try {
    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching from Contentful:", error);

    return NextResponse.json(
      { message: "Error fetching events from Contentful." },
      { status: 500 }
    );
  }
}
