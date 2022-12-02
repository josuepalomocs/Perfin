import React from "react";
import { Card, CardList } from "../../../../../types/card";

const defaultCardState: Card = { id: "", brand: "", nickname: "", number: "", expirationDate: "", csv: "" };

const helpers = {
  handleClose: (setOpen: (value: React.SetStateAction<boolean>) => void) => {
    setOpen(false);
  },
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>, card: Card, setCard: (setCard: React.SetStateAction<Card>) => void) => {
    const MIINumber = e.target.value.charAt(0);
    switch (MIINumber) {
      case "3":
        setCard({ ...card, brand: "american-express" });
        break;
      case "4":
        setCard({ ...card, brand: "visa" });
        break;
      case "5":
        setCard({ ...card, brand: "american-express" });
        break;
      case "6":
        setCard({ ...card, brand: "american-express" });
        break;
      default:
        setCard({ ...card, brand: "" });
        break;
    }
  },
  handleAddCard: (
    card: Card,
    cardList: CardList,
    setCardList: (value: React.SetStateAction<CardList>) => void,
    setSelectedCardIndex: (value: React.SetStateAction<number>) => void
  ) => {
    if (cardList.length === 0) {
      setCardList([card]);
    } else {
      setCardList([...cardList, card]);
    }
    setSelectedCardIndex(cardList.length);
  },
  handleCancelCard: (setCard: (setCard: React.SetStateAction<Card>) => void, setOpen: (value: React.SetStateAction<boolean>) => void) => {
    setCard(defaultCardState);
    setOpen(false);
  },
};

export default helpers;
