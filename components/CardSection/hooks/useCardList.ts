import { useState } from "react";
import { Card } from "../../../types/card";
import { getTestCards } from "../utilities";

const useCardList = () => {
  const [cardList, setCardList] = useState<Card[] | null>(getTestCards());
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  let selectedCard: Card | null = null;

  if (cardList) {
    selectedCard = cardList[selectedCardIndex];
  }

  const addCard = (card: Card) => {
    if (cardList) {
      setCardList([...cardList, card]);
    } else {
      setCardList([card]);
    }
    selectCardOnAdd();
  };

  const editCard = (editedCard: Card) => {
    if (cardList) {
      const newCardList = cardList.map((card, index) => {
        if (selectedCardIndex === index) {
          return editedCard;
        }
        return card;
      });
      setCardList(newCardList);
    }
  };

  const deleteCard = () => {
    if (cardList) {
      const newCardList = cardList.filter((card, index) => {
        if (selectedCardIndex !== index) {
          return card;
        }
      });
      setCardList(newCardList);
      selectCardOnDelete();
    }
  };

  const selectPreviousCard = () => {
    if (selectedCardIndex > 0) {
      setSelectedCardIndex(selectedCardIndex - 1);
    }
  };

  const selectNextCard = () => {
    if (cardList && selectedCardIndex < cardList.length - 1) {
      setSelectedCardIndex(selectedCardIndex + 1);
    }
  };

  const selectCardOnAdd = () => {
    if (cardList) {
      setSelectedCardIndex(cardList.length);
    }
  };

  const selectCardOnDelete = () => {
    if (cardList) {
      if (isLastCard()) {
        setSelectedCardIndex(selectedCardIndex - 1);
      }
    }
  };

  const isFirstCard = () => {
    if (selectedCardIndex !== 0) {
      return false;
    }
    return true;
  };

  const isLastCard = () => {
    if (cardList && selectedCardIndex !== cardList.length - 1) {
      return false;
    }
    return true;
  };

  const isEmpty = () => {
    if (selectedCardIndex === -1) {
      return true;
    }
  };

  return {
    cardList,
    selectedCard,
    selectedCardIndex,
    addCard,
    editCard,
    deleteCard,
    selectPreviousCard,
    selectNextCard,
    selectCardOnAdd,
    selectCardOnDelete,
    isFirstCard,
    isLastCard,
    isEmpty,
  };
};

export default useCardList;
