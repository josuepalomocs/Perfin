import { useState } from "react";
import { DialogAction } from "../../../types/dialog";

interface useDeleteCardDialogParams {
  deleteCard: () => void;
}

const useDeleteCardDialog = ({ deleteCard }: useDeleteCardDialogParams) => {
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
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, actionList, setIsOpen, handleOpen, handleClose };
};

export default useDeleteCardDialog;
