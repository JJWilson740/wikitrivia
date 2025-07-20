import { Item, PlayedItem } from "../types/item";
import { createWikimediaImage as getImageSrc } from "./image";

export function getRandomItem2(deck: Item[], played: Item[]): Item {
  // Get a random item from the deck that is not in the played items
  const filteredDeck = deck.filter((item) => !played.some((p) => p.id === item.id));
  const nextItem = filteredDeck[Math.floor(Math.random() * filteredDeck.length)]
  return nextItem;
}

export function getRandomItem(deck: Item[], played: Item[]): Item {
  // todo: we can simplify this logic a lot

  const periods: [number, number][] = [
    [-100000, 1000],
    [1000, 1800],
    [1800, 2020],
  ];
  const [fromYear, toYear] =
    periods[Math.floor(Math.random() * periods.length)];
  const candidates = deck.filter((candidate) => {
    const year = candidate.event_date.getFullYear();
    if (year < fromYear || year > toYear) {
      return false;
    }
    if (tooClose(candidate, played)) {
      return false;
    }
    return true;
  });

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  return deck[Math.floor(Math.random() * deck.length)];
}

function tooClose(item: Item, played: Item[]) {
  let distance = (played.length < 40) ? 5 : 1;
  if (played.length < 11)
    distance = 110 - 10 * played.length;

  const itemYear = item.event_date.getFullYear();
  return played.some((p) => Math.abs(itemYear - p.event_date.getFullYear()) < distance);
}

export function checkCorrect(
  played: PlayedItem[],
  item: Item,
  index: number
): { correct: boolean; delta: number } {
  // todo: this logic can break if the year is not unique

  const sorted = [...played, item].sort((a, b) => a.event_date.getTime() - b.event_date.getTime());
  const correctIndex = sorted.findIndex((i) => {
    return i.id === item.id;
  });

  if (index !== correctIndex) {
    return { correct: false, delta: correctIndex - index };
  }

  return { correct: true, delta: 0 };
}

export function preloadImage(url: string): HTMLImageElement {
  // A bit of a bodge, but it works for now
  if (url === "") {
    return new Image(); // Return an empty image if no URL is provided
  }

  const img = new Image();
  img.src = getImageSrc(url);
  img.width = 300; // The default width
  return img;
}
