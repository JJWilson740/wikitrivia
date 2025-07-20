import { GameState } from "../types/game";
import { Item } from "../types/item";
import { getRandomItem2, preloadImage } from "./items";

export default async function createState(deck: Item[]): Promise<GameState> {
  const played = [{ ...getRandomItem2(deck, []), played: { correct: true } }];
  const next = getRandomItem2(deck, played);
  const nextButOne = getRandomItem2(deck, [...played, next]);
  const imageCache = [preloadImage(next.image), preloadImage(nextButOne.image)];

  return {
    badlyPlaced: null,
    deck,
    imageCache,
    lives: 3,
    next,
    nextButOne,
    played,
  };
}
