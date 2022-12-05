import { useState } from "react";
import { Card } from "../../../types/card";

const useCardList = () => {
  const [cardList, setCardList] = useState<Card[] | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  let selectedCard = null;

  if (cardList) {
    selectedCard = cardList[selectedCardIndex];
  }

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

  return { cardList, setCardList, selectPreviousCard, selectNextCard, selectedCard };
};

export default useCardList;
