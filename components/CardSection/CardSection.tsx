import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { copyCardNumberToClipboard, getTestCards } from "./utilities";
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
  const [cardList, setCardList] = useState<CardType[] | null>(getTestCards());
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isCardRevealed, setIsCardRevealed] = useState(false);

  const selectedCard = cardList && cardList[selectedCardIndex];

  const [addCardDialogIsOpen, setAddCardDialogIsOpen] = useState(false);
  const [editCardDialogIsOpen, setEditCardDialogIsOpen] = useState(false);
  const [deleteCardDialogIsOpen, setDeleteCardDialogIsOpen] = useState(false);

  // control: Keeps track of the dialog form data
  // handleSubmit: Handles form validation and submission
  // setValue: Explicitly changes the value of a controlled input field, used to implement input masks
  const {
    control: addCardControl,
    handleSubmit: handleAddCardSubmit,
    setValue: setAddCardValue,
  } = useForm<CardDialogForm>({ defaultValues: { number: "", nickname: "", expirationDate: "", csv: "" } });

  const {
    control: editCardControl,
    handleSubmit: handleEditCardSubmit,
    setValue: setEditCardValue,
    reset: resetEditCard,
  } = useForm<CardDialogForm>({
    defaultValues: {
      number: selectedCard ? selectedCard.number : "",
      nickname: selectedCard ? selectedCard.nickname : "",
      expirationDate: selectedCard ? selectedCard.expirationDate : "",
      csv: selectedCard ? selectedCard.csv : "",
    },
  });

  useEffect(() => {
    resetEditCard({
      number: selectedCard ? selectedCard.number : "",
      nickname: selectedCard ? selectedCard.nickname : "",
      expirationDate: selectedCard ? selectedCard.expirationDate : "",
      csv: selectedCard ? selectedCard.csv : "",
    });
  }, [selectedCard, editCardDialogIsOpen]);

  // Returns the expected card brand based on the first character (MII Number) of the target input field
  const addCardExpectedCardBrand = useExpectedCardBrand({ control: addCardControl, name: "number" });

  // Returns the expected card brand based on the first character (MII Number) of the target input field
  const editCardExpectedCardBrand = useExpectedCardBrand({ control: editCardControl, name: "number" });

  // Returns formatted card number according to the expected card brand
  // eg. AE: 4242 424242 42424 | Visa: 4242 4242 4242 4242
  const toCardNumberFormat = (number: string) => {
    if (addCardExpectedCardBrand === "american-express") {
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

  // Returns formatted csv according to the expected card brand
  // eg. 424
  const toCardCsvFormat = (number: string) => {
    return number.replace(/[^\dA-Z]/g, "");
  };

  // Handles previous card selection
  const handleSelectPreviousCard = () => {
    if (selectedCardIndex > 0) {
      setSelectedCardIndex(selectedCardIndex - 1);
    }
  };

  // Handles next card selection
  const handleSelectNextCard = () => {
    if (cardList && selectedCardIndex < cardList.length - 1) {
      setSelectedCardIndex(selectedCardIndex + 1);
    }
  };

  // Copies the currently selected cards' number to clipboard
  const handleCopyToClipboard = () => {
    if (selectedCard) {
      copyCardNumberToClipboard(selectedCard.number);
    }
  };

  const handleDeleteCard = () => {};

  // Handle input mask logic for the target input fields
  useInputMask({ control: addCardControl, name: "number" }, setAddCardValue, toCardNumberFormat);
  useInputMask({ control: addCardControl, name: "expirationDate" }, setAddCardValue, toCardExpirationDateFormat);
  useInputMask({ control: addCardControl, name: "csv" }, setAddCardValue, toCardCsvFormat);

  // Handle input mask logic for the target input fields
  useInputMask({ control: editCardControl, name: "number" }, setEditCardValue, toCardNumberFormat);
  useInputMask({ control: editCardControl, name: "expirationDate" }, setEditCardValue, toCardExpirationDateFormat);
  useInputMask({ control: editCardControl, name: "csv" }, setEditCardValue, toCardCsvFormat);

  const onAddCardSubmit: SubmitHandler<CardDialogForm> = (data) => {
    const cleanData = { ...data, number: data.number.replaceAll(" ", ""), expirationDate: data.expirationDate.replaceAll(" ", "") };
    if (cardList) {
      setCardList([...cardList, { ...cleanData, id: "-1", brand: addCardExpectedCardBrand }]);
      setSelectedCardIndex(cardList.length);
    } else {
      setCardList([{ ...cleanData, id: "-1", brand: addCardExpectedCardBrand }]);
      setSelectedCardIndex(0);
    }
  };

  const onEditCardSubmit: SubmitHandler<CardDialogForm> = (data) => {
    if (cardList) {
      const cleanData = { ...data, number: data.number.replaceAll(" ", ""), expirationDate: data.expirationDate.replaceAll(" ", "") };
      const newCardList = cardList.map((card, index) => {
        if (selectedCardIndex === index) {
          return { ...cleanData, id: "-1", brand: editCardExpectedCardBrand };
        }
        return card;
      });
      setCardList(newCardList);
    }
    setEditCardDialogIsOpen(false);
  };

  const handleDialogClose = (setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDialogIsOpen(false);
  };

  const handleOpenDialog = (setDialogIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (selectedCard) {
      setDialogIsOpen(true);
    }
  };

  const addCardInputList: CardDialogInput[] = [
    { id: "nickname", label: "Nickname", placeholder: "Main Debit", slotProps: { input: { maxLength: 50 } } },
    {
      id: "number",
      label: "Card Number",
      placeholder: "4242 4242 4242 4242",
      slotProps: { input: { maxLength: addCardExpectedCardBrand === "american-express" ? 17 : 23 } },
      imageSrc: addCardExpectedCardBrand && `${addCardExpectedCardBrand}_logo.svg`,
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

  const editCardInputList: CardDialogInput[] = [
    { id: "nickname", label: "Nickname", placeholder: "Main Debit", slotProps: { input: { maxLength: 50 } } },
    {
      id: "number",
      label: "Card Number",
      placeholder: "4242 4242 4242 4242",
      slotProps: { input: { maxLength: editCardExpectedCardBrand === "american-express" ? 17 : 23 } },
      imageSrc: editCardExpectedCardBrand && `${editCardExpectedCardBrand}_logo.svg`,
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

  const addCardActionList: DialogAction[] = [
    { id: "addCardAction", text: "Add", handleClick: handleAddCardSubmit(onAddCardSubmit) },
    {
      id: "cancelCardAction",
      text: "Cancel",
      handleClick: () => {
        setAddCardDialogIsOpen(false);
      },
    },
  ];

  const editCardActionList: DialogAction[] = [
    { id: "addCardAction", text: "Edit", handleClick: handleEditCardSubmit(onEditCardSubmit) },
    {
      id: "cancelCardAction",
      text: "Cancel",
      handleClick: () => {
        setEditCardDialogIsOpen(false);
      },
    },
  ];

  const deleteCardActionList: DialogAction[] = [
    { id: "deleteCardAction", text: "Delete", handleClick: handleDeleteCard },
    {
      id: "cancelCardAction",
      text: "Cancel",
      handleClick: () => {
        setDeleteCardDialogIsOpen(false);
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
        <Button className={`${styles.toPreviousCard} ${selectedCardIndex <= 0 && styles.firstCard}`} variant="contained" onClick={handleSelectPreviousCard}>
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
              isCardRevealed={isCardRevealed}
            />
          ) : (
            <Typography className={styles.noCardsText}>You don't have any saved cards</Typography>
          )}
        </Box>
        <Button
          className={`${styles.toNextCard} ${cardList && selectedCardIndex === cardList.length - 1 && styles.lastCard}`}
          variant="contained"
          onClick={handleSelectNextCard}
        >
          <ChevronRightIcon className={styles.chevronRightIcon} />
        </Button>
        <Box className={styles.actionsSecondary}>
          <Fab className={`${styles.fab} ${styles.copyCardNumber}`} size="small" onClick={handleCopyToClipboard}>
            <ClipboardIcon className={`${styles.icon} ${styles.clipboardIcon}`} />
          </Fab>
          <Fab
            className={`${styles.fab} ${styles.revealCard}`}
            size="small"
            onClick={() => {
              setIsCardRevealed(!isCardRevealed);
            }}
          >
            {isCardRevealed ? <EyeSlashIcon className={`${styles.icon} ${styles.eyeSlashIcon}`} /> : <EyeIcon className={`${styles.icon} ${styles.eyeIcon}`} />}
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
        inputList={addCardInputList}
        actionList={addCardActionList}
        control={addCardControl}
      />
      <Dialog
        open={editCardDialogIsOpen}
        handleClose={() => {
          handleDialogClose(setEditCardDialogIsOpen);
        }}
        type="form"
        title="Edit Card"
        inputList={editCardInputList}
        actionList={editCardActionList}
        control={editCardControl}
      />
      <Dialog
        open={deleteCardDialogIsOpen}
        handleClose={() => {
          handleDialogClose(setDeleteCardDialogIsOpen);
        }}
        type="prompt"
        title="Delete card"
        message={`Delete '${selectedCard?.nickname}'?`}
        actionList={deleteCardActionList}
      />
    </Box>
  );
};

export default CardSection;
