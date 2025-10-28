export const getAssetUrl = (url: string | undefined): string | null => {
  if (!url) return null;

  if (url.includes("ctfassets.net")) {
    const filename = url.split("/").pop();
    if (filename) {
      return `https://cdn.a2ys.dev/posters/${filename}`;
    }
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  if (url.startsWith("/")) {
    return `https://cdn.a2ys.dev${url}`;
  }

  return url;
};

export const getEventPosterUrl = (
  eventPosterId: string | undefined,
  assetData: Array<{ sys: { id: string }; fields: { file?: { url?: string } } }>
): string | null => {
  if (!eventPosterId) return null;

  const asset = assetData.find((a) => a.sys.id === eventPosterId);
  const url = asset?.fields?.file?.url;

  return getAssetUrl(url);
};
