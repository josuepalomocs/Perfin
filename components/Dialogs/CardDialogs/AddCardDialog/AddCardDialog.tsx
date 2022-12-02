import React from "react";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel } from "@mui/material";
import { Card, CardBrand, CardDialogForm } from "../../../../types/card";
import { InputUnstyled } from "@mui/base";
import dialogHelpers from "./helpers";
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/cardDialog.module.css";

const { handleClose, handleAddCard, handleCancelCard } = dialogHelpers;

interface CardDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardList: Card[] | null;
  setCardList: React.Dispatch<React.SetStateAction<Card[] | null>>;
  selectedCardIndex: number;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

const AddCardDialog = ({ dialogOpen, setDialogOpen, cardList, setCardList, selectedCardIndex, setSelectedCardIndex }: CardDialogProps) => {
  const { control, handleSubmit } = useForm<CardDialogForm>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (key === "number") {
      let brand: CardBrand | null = null;
      switch (e.target.value.charAt(0)) {
        case "3":
          brand = "american-express";
          break;
        case "4":
          brand = "visa";
          break;
        case "5":
          brand = "mastercard";
          break;
        case "6":
          brand = "discover";
          break;
      }
      if (brand === "american-express") {
        e.target.value = e.target.value
          .replace(/[^\dA-Z]/g, "")
          .replace(/(.{10})/g, "$1 ")
          .replace(/(.{4})/, "$1 ")
          .trim();
      } else {
        e.target.value = e.target.value
          .replace(/[^\dA-Z]/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        console.log(e.target.value);
      }
      setCard({ ...card, brand: brand, [key]: e.target.value });
    } else if (key === "expirationDate") {
      e.target.value = e.target.value
        .replace(/^(.{2}\s{1}\/{1})$/, e.target.value.charAt(0))
        .replace(/[^\dA-Z]/g, "")
        .replace(/^(.{2})/, "$1 / ");
      console.log(e.target.value);
      setCard({ ...card, [key]: e.target.value });
    } else if (key === "csv") {
      setCard({ ...card, [key]: e.target.value });
    } else {
      setCard({ ...card, [key]: e.target.value });
    }
  };

  return (
    <Dialog className={styles.dialog} open={dialogOpen} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>Add card</DialogTitle>
      <DialogContent className={`${styles.dialogContent} ${styles.addCardDialogContent}`}>
        <Box className={`${styles.inputBox} ${styles.cardHolder}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardNickname">
            Nickname
          </InputLabel>
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => {
              return (
                <InputUnstyled {...field} id="inputCardNickname" className={styles.input} slotProps={{ input: { maxLength: 50 } }} placeholder="John Doe" />
              );
            }}
          />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardNumber}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardNumber">
            Card number
          </InputLabel>
          <Controller
            name="number"
            control={control}
            render={({ field }) => {
              return (
                <InputUnstyled
                  {...field}
                  id="inputCardNumber"
                  className={styles.input}
                  slotProps={{ input: { maxLength: card.brand === "american-express" ? 17 : 23 } }}
                  placeholder="4242 4242 4242 4242"
                  onChange={(e) => {
                    if (e.target.value.charAt(0) === "3") {
                    }
                  }}
                />
              );
            }}
          />
          <Avatar className={`${card.brand && styles.cardIcon} ${styles.cardBrand}`} src={`${card.brand}_logo.svg`}>
            " "
          </Avatar>
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardExpirationDate}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardExpirationDate">
            Exp date
          </InputLabel>
          <Controller
            name="expirationDate"
            control={control}
            render={({ field }) => {
              return (
                <InputUnstyled {...field} id="inputCardExpirationDate" className={styles.input} slotProps={{ input: { maxLength: 7 } }} placeholder="01/25" />
              );
            }}
          />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardCSV}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardCSV">
            CSV
          </InputLabel>
          <Controller
            name="csv"
            control={control}
            render={({ field }) => {
              return (
                <InputUnstyled
                  {...field}
                  id="inputCardCSV"
                  className={`${styles.input} ${styles.cardCSV}`}
                  slotProps={{ input: { maxLength: 4 } }}
                  placeholder="424"
                  onChange={(e) => {
                    handleChange(e, "csv");
                  }}
                />
              );
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button
          className={styles.addAction}
          onClick={() => {
            handleAddCard(card, cardList, setCardList, setSelectedCardIndex);
          }}
        >
          Add
        </Button>
        <Button className={styles.cancelAction} onClick={handleCancelCard}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardDialog;
