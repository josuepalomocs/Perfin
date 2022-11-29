import React, { useState } from "react";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel } from "@mui/material";
import { Card, CardBrand } from "../../../../types";
import { InputUnstyled } from "@mui/base";
import { getDefaultCardValues } from "../../../../utilities/cardDialog";
import { ValidationOptions } from "../utilities";
import styles from "../styles/cardDialog.module.css";

interface CardDialogProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cardList: Card[] | null;
  setCardList: React.Dispatch<React.SetStateAction<Card[] | null>>;
  cardSelection: number;
  setCardSelection: React.Dispatch<React.SetStateAction<number>>;
}

const AddCardDialog = ({ dialogOpen, setDialogOpen, cardList, setCardList, cardSelection, setCardSelection }: CardDialogProps) => {
  const [newCard, setNewCard] = useState<Card>(getDefaultCardValues());

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleAddCard = () => {
    cardList ? setCardList([...cardList, newCard]) : setCardList([newCard]);
    setCardSelection(cardList ? cardList!.length : 0);
    setDialogOpen(false);
  };

  const handleCancelCard = () => {
    setNewCard({ ...newCard, brand: null });
    setDialogOpen(false);
  };

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
      setNewCard({ ...newCard, brand: brand, [key]: e.target.value });
    } else if (key === "expirationDate") {
      e.target.value = e.target.value
        .replace(/^(.{2}\s{1}\/{1})$/, e.target.value.charAt(0))
        .replace(/[^\dA-Z]/g, "")
        .replace(/^(.{2})/, "$1 / ");
      console.log(e.target.value);
      setNewCard({ ...newCard, [key]: e.target.value });
    } else if (key === "csv") {
      setNewCard({ ...newCard, [key]: e.target.value });
    } else {
      setNewCard({ ...newCard, [key]: e.target.value });
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, validationOptions: ValidationOptions) => {};

  return (
    <Dialog className={styles.dialog} open={dialogOpen} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>Add card</DialogTitle>
      <DialogContent className={`${styles.dialogContent} ${styles.addCardDialogContent}`}>
        <Box className={`${styles.inputBox} ${styles.cardHolder}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardNickname">
            Nickname
          </InputLabel>
          <InputUnstyled
            id="inputCardNickname"
            className={styles.input}
            slotProps={{ input: { maxLength: 50 } }}
            placeholder="John Doe"
            onChange={(e) => {
              handleChange(e, "nickname");
            }}
          />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardNumber}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardNumber">
            Card number
          </InputLabel>
          <InputUnstyled
            id="inputCardNumber"
            className={styles.input}
            slotProps={{ input: { maxLength: newCard.brand === "american-express" ? 17 : 23 } }}
            placeholder="4242 4242 4242 4242"
            onChange={(e) => {
              handleChange(e, "number");
            }}
          />
          <Avatar className={`${newCard.brand && styles.cardIcon} ${styles.cardBrand}`} src={`${newCard.brand}_logo.svg`}>
            " "
          </Avatar>
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardExpirationDate}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardExpirationDate">
            Exp date
          </InputLabel>
          <InputUnstyled
            id="inputCardExpirationDate"
            className={styles.input}
            slotProps={{ input: { maxLength: 7 } }}
            placeholder="01/25"
            onChange={(e) => {
              handleChange(e, "expirationDate");
            }}
          />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardCSV}`}>
          <InputLabel className={styles.inputLabel} htmlFor="inputCardCSV">
            CSV
          </InputLabel>
          <InputUnstyled
            id="inputCardCSV"
            className={`${styles.input} ${styles.cardCSV}`}
            slotProps={{ input: { maxLength: 4 } }}
            placeholder="424"
            onChange={(e) => {
              handleChange(e, "csv");
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button className={styles.addAction} onClick={handleAddCard}>
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
