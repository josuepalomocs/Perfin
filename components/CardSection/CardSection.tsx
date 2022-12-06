import React, { useState } from "react";
import { Box, Button, Fab, Typography } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Card from "./components/Card/Card";
import Dialog from "../Dialog/Dialog";
import styles from "./styles/cardSection.module.css";
import useCardList from "./hooks/useCardList";
import useAddCardDialog from "./hooks/useAddCardDialog";
import useEditCardDialog from "./hooks/useEditCardDialog";
import useDeleteCardDialog from "./hooks/useDeleteCardDialog";
import copyToClipboard from "./helpers/navigator/copyToClipboard";

const CardSection = () => {
  const { cardList, selectedCard, addCard, editCard, deleteCard, selectPreviousCard, selectNextCard, isFirstCard, isLastCard, isEmpty } = useCardList();

  const {
    isOpen: isAddCardDialogOpen,
    inputList: inputListAddCard,
    actionList: actionListAddCard,
    control: controlAddCard,
    errors: errorsAddCard,
    handleOpen: handleOpenAddCard,
    handleClose: handleCloseAddCard,
  } = useAddCardDialog({ addCard, cardList });

  const {
    isOpen: isEditCardDialogOpen,
    inputList: inputListEditCard,
    actionList: actionListEditCard,
    control: controlEditCard,
    errors: errorsEditCard,
    handleOpen: handleOpenEditCard,
    handleClose: handleCloseEditCard,
  } = useEditCardDialog({ editCard, selectedCard });

  const {
    isOpen: isDeleteCardDialogOpen,
    handleOpen: handleOpenDeleteCard,
    handleClose: handleCloseDeleteCard,
    actionList: actionListDeleteCard,
  } = useDeleteCardDialog({ deleteCard, selectedCard });

  const [isCardListDataRevealed, setIsCardListDataRevealed] = useState(false);

  return (
    <Box className={styles.container}>
      <Box className={styles.grid}>
        <Box className={`${styles.actions} ${styles.primary}`}>
          <Fab className={`${styles.fab} ${styles.editCard}`} size="small" onClick={handleOpenEditCard}>
            <PencilSquareIcon className={`${styles.icon} ${styles.pencilSquareIcon}`} />
          </Fab>
          <Fab className={`${styles.fab} ${styles.addCard}`} size="small" onClick={handleOpenAddCard}>
            <PlusIcon className={`${styles.icon} ${styles.plusIcon}`} />
          </Fab>
        </Box>
        <Button className={`${styles.toPreviousCard} ${(isFirstCard() || isEmpty()) && styles.firstCard}`} variant="contained" onClick={selectPreviousCard}>
          <ChevronLeftIcon className={styles.chevronLeftIcon} />
        </Button>
        <Box className={styles.card}>
          {selectedCard ? (
            <Card
              id={selectedCard.id}
              brand={selectedCard.brand}
              nickname={selectedCard.nickname}
              number={selectedCard.number}
              expirationDate={selectedCard.expirationDate}
              csv={selectedCard.csv}
              isCardRevealed={isCardListDataRevealed}
            />
          ) : (
            <Typography className={styles.noCardsText}>You don't have any saved cards</Typography>
          )}
        </Box>
        <Button className={`${styles.toNextCard} ${isLastCard() && styles.lastCard}`} variant="contained" onClick={selectNextCard}>
          <ChevronRightIcon className={styles.chevronRightIcon} />
        </Button>
        <Box className={`${styles.actions} ${styles.secondary}`}>
          <Fab
            className={`${styles.fab} ${styles.copyCardNumber}`}
            size="small"
            onClick={() => {
              if (selectedCard) {
                copyToClipboard(selectedCard.number);
              }
            }}
          >
            <ClipboardIcon className={`${styles.icon} ${styles.clipboardIcon}`} />
          </Fab>
          <Fab
            className={`${styles.fab} ${styles.revealCard}`}
            size="small"
            onClick={() => {
              setIsCardListDataRevealed(!isCardListDataRevealed);
            }}
          >
            {isCardListDataRevealed ? (
              <EyeSlashIcon className={`${styles.icon} ${styles.eyeSlashIcon}`} />
            ) : (
              <EyeIcon className={`${styles.icon} ${styles.eyeIcon}`} />
            )}
          </Fab>
          <Fab className={`${styles.fab} ${styles.deleteCard}`} size="small" onClick={handleOpenDeleteCard}>
            <TrashIcon className={`${styles.icon} ${styles.trashIcon}`} />
          </Fab>
        </Box>
      </Box>
      <Dialog
        open={isAddCardDialogOpen}
        handleClose={handleCloseAddCard}
        type="form"
        title="Add Card"
        inputList={inputListAddCard}
        actionList={actionListAddCard}
        control={controlAddCard}
        errors={errorsAddCard}
      />
      <Dialog
        open={isEditCardDialogOpen}
        handleClose={handleCloseEditCard}
        type="form"
        title="Edit Card"
        inputList={inputListEditCard}
        actionList={actionListEditCard}
        control={controlEditCard}
        errors={errorsEditCard}
      />
      <Dialog
        open={isDeleteCardDialogOpen}
        handleClose={handleCloseDeleteCard}
        type="prompt"
        title="Delete card"
        message={`Delete '${selectedCard?.nickname}'?`}
        actionList={actionListDeleteCard}
      />
    </Box>
  );
};

export default CardSection;
