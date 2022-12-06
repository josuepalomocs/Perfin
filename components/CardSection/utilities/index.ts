import { Card as CardType } from "../.../../../../types/card";

// return default cards used for testing
// to be used only in a development environment
export const getTestCards = (): CardType[] => {
  return [
    {
      id: "1",
      brand: "visa",
      nickname: "Chase Debit",
      number: "4578454654652438",
      expirationDate: "10/25",
      csv: "325",
    },
    {
      id: "2",
      brand: "mastercard",
      nickname: "Paypal Business",
      number: "5486752180549586",
      expirationDate: "06/26",
      csv: "248",
    },
    {
      id: "3",
      brand: "discover",
      nickname: "Discover Credit",
      number: "6578454654652438",
      expirationDate: "05/24",
      csv: "895",
    },
    {
      id: "4",
      brand: "american-express",
      nickname: "American Express Business",
      number: "387588453694485",
      expirationDate: "12/26",
      csv: "985",
    },
  ];
};

// copy the card number to the users' clipboard
export const copyCardNumberToClipboard = (cardNumber: string) => {
  navigator.clipboard.writeText(cardNumber);
};
