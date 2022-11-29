// Card Types

export type CardDialogType = "createCard" | "editCard" | "deleteCard";

export type CardBrand = "american-express" | "visa" | "mastercard" | "discover";

export interface Card {
  id: string;
  brand: CardBrand | null;
  nickname: string;
  number: string;
  expirationDate: string;
  csv: string;
}

// Dialog Types

export type DialogType = CardDialogType;

export interface Dialog {
  type: DialogType;
  open: true | false;
}
