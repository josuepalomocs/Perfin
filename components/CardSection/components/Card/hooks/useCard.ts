import { useState } from "react";
import { Card, CardBrand } from "../../../../../types/card";

const useCard = () => {
  const [card, setCard] = useState<Card>({ id: "", brand: "", nickname: "", number: "", expirationDate: "", csv: "" });

  const setCardId = (id: string) => {
    setCard({ ...card, id });
  };

  const setCardNickname = (nickname: CardBrand) => {
    setCard({ ...card, nickname });
  };

  const setCardNumber = (number: string) => {
    setCard({ ...card, number });
  };

  const setCardExpirationDate = (expirationDate: string) => {
    setCard({ ...card, expirationDate });
  };

  const setCardCsv = (expirationDate: string) => {
    setCard({ ...card, expirationDate });
  };

  return [card, setCard, setCardId, setCardNickname, setCardNumber, setCardExpirationDate, setCardCsv];
};

export default useCard;
