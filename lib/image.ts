export function createWikimediaImage(image: string, width = 300): string {
  return `/item-images/${encodeURIComponent(image)}`;
}
