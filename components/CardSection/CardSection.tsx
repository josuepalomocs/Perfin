import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { copyCardNumberToClipboard, getFormattedCardNumber, getTestCards } from "./utilities";
import { Box, Button, Fab, Typography } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Card from "./components/Card/Card";
import Dialog from "../Dialog/Dialog";
import { Card as CardType, CardDialogForm, CardDialogInput } from "../../types/card";
import { DialogAction } from "../../types/dialog";
import styles from "./styles/cardSection.module.css";
import useExpectedCardBrand from "./hooks/useExpectedCardBrand";
import useInputMask from "./components/Card/hooks/useInputMask";

interface CardSectionProps {}

const CardSection = ({}: CardSectionProps) => {
  // control: Keeps track of the dialog form data
  // handleSubmit: Handles form validation and submission
  // setValue: Explicitly changes the value of a controlled input field, used to implement input masks
  const { control, handleSubmit, setValue } = useForm<CardDialogForm>({ defaultValues: { number: "", nickname: "", expirationDate: "", csv: "" } });

  // Returns the expected card brand based on the first character (MII Number) of the target input field
  const cardBrand = useExpectedCardBrand({ control, name: "number" });

  // Returns formatted card number according to the expected card brand
  // eg. AE: 4242 424242 42424 | Visa: 4242 4242 4242 4242
  const toCardNumberFormat = (number: string) => {
    if (cardBrand === "american-express") {
      return number
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{10})/g, "$1 ")
        .replace(/(.{4})/, "$1 ")
        .trim();
    }
    return number
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  // Returns formatted expiration date according to the expected card brand
  // eg. 01 / 25
  const toCardExpirationDateFormat = (number: string) => {
    return number
      .replace(/^(.{2}\s{1}\/{1})$/, number.charAt(0))
      .replace(/[^\dA-Z]/g, "")
      .replace(/^(.{2})/, "$1 / ");
  };

  // Handle input mask logic for the target input fields
  useInputMask({ control, name: "number" }, setValue, toCardNumberFormat);
  useInputMask({ control, name: "expirationDate" }, setValue, toCardExpirationDateFormat);

  const [addCardDialogIsOpen, setAddCardDialogIsOpen] = useState(false);
  const [editCardDialogIsOpen, setEditCardDialogIsOpen] = useState(false);
  const [deleteCardDialogIsOpen, setDeleteCardDialogIsOpen] = useState(false);

  const [cardList, setCardList] = useState<CardType[] | null>(getTestCards());
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);

  const selectedCard = cardList && cardList[selectedCardIndex];
  const formattedCardNumber = selectedCard && getFormattedCardNumber(selectedCard.brand!, selectedCard.number);

  const onSubmit: SubmitHandler<CardDialogForm> = (data) => {
    if (cardList) {
      setCardList([...cardList, { ...data, id: "-1", brand: cardBrand }]);
    } else {
      setCardList([{ ...data, id: "-1", brand: cardBrand }]);
    }
  };

  const handleDialogClose = (setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDialogIsOpen(false);
  };

  const handleOpenDialog = (setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (selectedCard) {
      setDialogIsOpen(true);
    }
  };

  const inputList: CardDialogInput[] = [
    { id: "nickname", label: "Nickname", placeholder: "Main Debit", slotProps: { input: { maxLength: 50 } } },
    {
      id: "number",
      label: "Card Number",
      placeholder: "4242 4242 4242 4242",
      slotProps: { input: { maxLength: cardBrand === "american-express" ? 17 : 23 } },
      imageSrc: cardBrand && `${cardBrand}_logo.svg`,
    },
    {
      id: "expirationDate",
      label: "Exp Date",
      placeholder: "01 / 25",
      slotProps: { input: { maxLength: 7 } },
    },
    {
      id: "csv",
      label: "CSV",
      placeholder: "424",
      slotProps: { input: { maxLength: 4 } },
    },
  ];

  const actionList: DialogAction[] = [
    { id: "addCardAction", text: "Add", handleClick: handleSubmit(onSubmit) },
    {
      id: "cancelCardAction",
      text: "Cancel",
      handleClick: () => {
        setAddCardDialogIsOpen(false);
      },
    },
  ];

  return (
    <Box className={styles.container}>
      <Box className={styles.grid}>
        <Box className={styles.actionsPrimary}>
          <Fab
            className={`${styles.fab} ${styles.editCard}`}
            size="small"
            onClick={() => {
              handleOpenDialog(setEditCardDialogIsOpen);
            }}
          >
            <PencilSquareIcon className={`${styles.icon} ${styles.pencilSquareIcon}`} />
          </Fab>
          <Fab
            className={`${styles.fab} ${styles.addCard}`}
            size="small"
            onClick={() => {
              handleOpenDialog(setAddCardDialogIsOpen);
            }}
          >
            <PlusIcon className={`${styles.icon} ${styles.plusIcon}`} />
          </Fab>
        </Box>
        <Button
          className={`${styles.toPreviousCard} ${selectedCardIndex <= 0 && styles.firstCard}`}
          variant="contained"
          onClick={() => {
            selectedCardIndex > 0 && setSelectedCardIndex(selectedCardIndex - 1);
          }}
        >
          <ChevronLeftIcon className={styles.chevronLeftIcon} />
        </Button>
        <Box className={styles.card}>
          {selectedCard ? (
            <Card
              id={selectedCard.id}
              brand={selectedCard.brand}
              nickname={selectedCard.nickname}
              number={
                cardRevealed
                  ? formattedCardNumber!
                  : `${
                      selectedCard.brand === "american-express"
                        ? `•••• •••••• ${formattedCardNumber!.slice(-5)}`
                        : `•••• •••• •••• ${formattedCardNumber!.slice(-5)}`
                    }`
              }
              expirationDate={cardRevealed ? selectedCard.expirationDate : "••/••"}
              csv={cardRevealed ? selectedCard.csv : "•••"}
            />
          ) : (
            <Typography className={styles.noCardsText}>You don't have any saved cards</Typography>
          )}
        </Box>
        <Button
          className={`${styles.toNextCard} ${cardList && selectedCardIndex === cardList.length - 1 && styles.lastCard}`}
          variant="contained"
          onClick={() => {
            cardList && selectedCardIndex < cardList.length - 1 && setSelectedCardIndex(selectedCardIndex + 1);
          }}
        >
          <ChevronRightIcon className={styles.chevronRightIcon} />
        </Button>
        <Box className={styles.actionsSecondary}>
          <Fab
            className={`${styles.fab} ${styles.copyCardNumber}`}
            size="small"
            onClick={() => {
              selectedCard && copyCardNumberToClipboard(selectedCard.number);
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
              handleOpenDialog(setDeleteCardDialogIsOpen);
            }}
          >
            <TrashIcon className={`${styles.icon} ${styles.trashIcon}`} />
          </Fab>
        </Box>
      </Box>
      <Dialog
        open={addCardDialogIsOpen}
        handleClose={() => {
          handleDialogClose(setAddCardDialogIsOpen);
        }}
        type="form"
        title="Add Card"
        inputList={inputList}
        actionList={actionList}
        control={control}
      />
    </Box>
  );
};

export default CardSection;
