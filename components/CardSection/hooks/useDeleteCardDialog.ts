import { useState } from "react";
import { Card } from "../../../types/card";
import { DialogAction } from "../../../types/dialog";

interface useDeleteCardDialogParams {
  deleteCard: () => void;
  selectedCard: Card | null;
}

const useDeleteCardDialog = ({ deleteCard, selectedCard }: useDeleteCardDialogParams) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteCard = () => {
    deleteCard();
    setIsOpen(false);
  };

  const actionList: DialogAction[] = [
    { id: "deleteCardAction", type: "negative", text: "Delete", handleClick: handleDeleteCard },
    {
      id: "cancelCardAction",
      type: "neutral",
      text: "Cancel",
      handleClick: () => {
        setIsOpen(false);
      },
    },
  ];

  const handleOpen = () => {
    if (selectedCard) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, actionList, setIsOpen, handleOpen, handleClose };
};

export default useDeleteCardDialog;
