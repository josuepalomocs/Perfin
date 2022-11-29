import { Card as CardType } from "../types";

export const getDefaultCardValues = (): CardType => {
  return {
    id: "1",
    brand: "visa",
    nickname: "",
    number: "",
    expirationDate: "",
    csv: "",
  };
};
