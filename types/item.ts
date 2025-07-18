export interface Item {
  id: string;
  label: string;
  date_label: string;
  description: string;
  image: string;
  year: number;
}

export type PlayedItem = Item & {
  played: {
    correct: boolean;
  };
};
