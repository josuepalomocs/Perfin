export type CardDialogType = "createCard" | "editCard" | "deleteCard";

export type DialogType = CardDialogType;

export interface Dialog {
  type: DialogType;
  open: true | false;
}
