import React, { useState } from "react";
import Card from "./components/Card/Card";
import { Box, Button, Container, Fab, Typography } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card as CardType, Dialog } from "../../types";
import CreateCardDialog from "../Dialogs/CardDialogs/AddCardDialog/AddCardDialog";
import DeleteCardDialog from "../Dialogs/CardDialogs/DeleteCardDialog/DeleteCardDialog";
import EditCardDialog from "../Dialogs/CardDialogs/EditCardDialog/EditCardDialog";
import { copyCardNumberToClipboard, getFormattedCardNumber, getTestCards } from "./utilities";
import styles from "./styles/cardSection.module.css";

interface CardSectionProps {}

const CardSection = ({}: CardSectionProps) => {
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openEditCard, setOpenEditCard] = useState(false);
  const [openDeleteCard, setOpenDeleteCard] = useState(false);

  const [cardList, setCardList] = useState<CardType[] | null>(getTestCards());
  const [cardSelection, setCardSelection] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);

  const activeCard = cardList && cardList[cardSelection];
  const formattedCardNumber = activeCard && getFormattedCardNumber(activeCard.brand!, activeCard.number);

  return (
    <Box className={styles.container}>
      <Box className={styles.grid}>
        <Box className={styles.primaryActions}>
          <Fab
            className={`${styles.fab} ${styles.editCard}`}
            size="small"
            onClick={() => {
              activeCard && setOpenEditCard(true);
            }}
          >
            <PencilSquareIcon className={`${styles.icon} ${styles.pencilSquareIcon}`} />
          </Fab>
          <Fab
            className={`${styles.fab} ${styles.addCard}`}
            size="small"
            onClick={() => {
              setOpenAddCard(true);
            }}
          >
            <PlusIcon className={`${styles.icon} ${styles.plusIcon}`} />
          </Fab>
        </Box>
        <Button
          className={`${styles.toPreviousCard} ${cardSelection <= 0 && styles.firstCard}`}
          variant="contained"
          onClick={() => {
            cardSelection > 0 && setCardSelection(cardSelection - 1);
          }}
        >
          <ChevronLeftIcon className={styles.chevronLeftIcon} />
        </Button>
        <Box className={styles.card}>
          {activeCard ? (
            <Card
              id={activeCard.id}
              brand={activeCard.brand}
              nickname={activeCard.nickname}
              number={
                cardRevealed
                  ? formattedCardNumber!
                  : `${
                      activeCard.brand === "american-express"
                        ? `•••• •••••• ${formattedCardNumber!.slice(-5)}`
                        : `•••• •••• •••• ${formattedCardNumber!.slice(-5)}`
                    }`
              }
              expirationDate={cardRevealed ? activeCard.expirationDate : "••/••"}
              csv={cardRevealed ? activeCard.csv : "•••"}
            />
          ) : (
            <Typography className={styles.noCardsText}>You don't have any saved cards</Typography>
          )}
        </Box>
        <Button
          className={`${styles.toNextCard} ${cardList && cardSelection === cardList.length - 1 && styles.lastCard}`}
          variant="contained"
          onClick={() => {
            cardList && cardSelection < cardList.length - 1 && setCardSelection(cardSelection + 1);
          }}
        >
          <ChevronRightIcon className={styles.chevronRightIcon} />
        </Button>
        <Box className={styles.secondaryActions}>
          <Fab
            className={`${styles.fab} ${styles.copyCardNumber}`}
            size="small"
            onClick={() => {
              activeCard && copyCardNumberToClipboard(activeCard.number);
            }}
          >
            <ClipboardIcon className={`${styles.icon} ${styles.clipboardIcon}`} />
          </Fab>
          <Fab
            className={`${styles.fab} ${styles.revealCard}`}
            size="small"
            onClick={() => {
              setCardRevealed(!cardRevealed);
            }}
          >
            {cardRevealed ? <EyeSlashIcon className={`${styles.icon} ${styles.eyeSlashIcon}`} /> : <EyeIcon className={`${styles.icon} ${styles.eyeIcon}`} />}
          </Fab>
          <Fab
            className={`${styles.fab} ${styles.deleteCard}`}
            size="small"
            onClick={() => {
              activeCard && setOpenDeleteCard(true);
            }}
          >
            <TrashIcon className={`${styles.icon} ${styles.trashIcon}`} />
          </Fab>
        </Box>
        <CreateCardDialog
          dialogOpen={openAddCard}
          setDialogOpen={setOpenAddCard}
          cards={cardList}
          setCards={setCardList}
          cardSelection={cardSelection}
          setCardSelection={setCardSelection}
        />
        {cardList && (
          <DeleteCardDialog
            dialogOpen={openDeleteCard}
            setDialogOpen={setOpenDeleteCard}
            cards={cardList!}
            setCards={setCardList}
            cardSelection={cardSelection}
            setCardSelection={setCardSelection}
          />
        )}
        {cardList && (
          <EditCardDialog
            dialogOpen={openEditCard}
            setDialogOpen={setOpenEditCard}
            cards={cardList!}
            setCards={setCardList}
            cardSelection={cardSelection}
            setCardSelection={setCardSelection}
          />
        )}
      </Box>
    </Box>
  );
};

export default CardSection;
