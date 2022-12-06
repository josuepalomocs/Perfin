import { DialogInput } from "./dialog";

export type CardBrand = "american-express" | "visa" | "mastercard" | "discover" | "";

export interface Card {
  id: string;
  brand: CardBrand;
  nickname: string;
  number: string;
  expirationDate: string;
  csv: string;
}

export type CardList = Card[];

export type AddCardDialogInputIdList = "nickname" | "number" | "expirationDate" | "csv";

export interface CardDialogInput extends DialogInput {
  id: AddCardDialogInputIdList;
}

export type CardDialogForm = Omit<Card, "id" | "brand">;
