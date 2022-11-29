export type CardBrand = "american-express" | "visa" | "mastercard" | "discover";

export interface Card {
  id: string;
  brand: CardBrand | null;
  nickname: string;
  number: string;
  expirationDate: string;
  csv: string;
}
