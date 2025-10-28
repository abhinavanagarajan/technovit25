const CACHE_NAME = "image-cdn-cache-v1";
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const getCachedImage = async (src: string): Promise<string> => {
  if (!src) return "";

  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(src);

    if (cachedResponse) {
      const cachedTimestamp = cachedResponse.headers.get("x-cache-timestamp");
      if (
        cachedTimestamp &&
        Date.now() - Number(cachedTimestamp) < CACHE_DURATION
      ) {
        const blob = await cachedResponse.blob();
        return URL.createObjectURL(blob);
      }
    }

    const networkResponse = await fetch(src);
    if (!networkResponse.ok) {
      return src;
    }

    const responseToCache = networkResponse.clone();

    const headers = new Headers(responseToCache.headers);
    headers.set("x-cache-timestamp", String(Date.now()));

    await cache.put(src, new Response(responseToCache.body, { headers }));

    return src;
  } catch (error) {
    console.error("Image caching failed:", error);
    return src;
  }
};
