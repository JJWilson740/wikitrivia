export interface Item {
  id: string;
  label: string;
  date_label: string;
  description: string;
  image: string;
  event_date: Date;
}

export type PlayedItem = Item & {
  played: {
    correct: boolean;
  };
};
