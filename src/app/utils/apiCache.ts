import { EventApiResponse } from "@/interfaces/contentful";

const CACHE_NAME = "json-api-cache-v1";
const CACHE_DURATION = 60 * 60 * 1000;

export const getCachedEventsData = async (
  url: string
): Promise<EventApiResponse> => {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      const cachedTimestamp = cachedResponse.headers.get("x-cache-timestamp");
      if (
        cachedTimestamp &&
        Date.now() - Number(cachedTimestamp) < CACHE_DURATION
      ) {
        return await cachedResponse.json();
      }
    }

    const networkResponse = await fetch(url);
    if (!networkResponse.ok) {
      throw new Error(
        `Network response was not ok: ${networkResponse.statusText}`
      );
    }

    const responseToCache = networkResponse.clone();

    const headers = new Headers(responseToCache.headers);
    headers.set("x-cache-timestamp", String(Date.now()));

    await cache.put(url, new Response(responseToCache.body, { headers }));

    return await networkResponse.json();
  } catch (error) {
    console.error("Failed to fetch or cache events data:", error);
    throw error;
  }
};
