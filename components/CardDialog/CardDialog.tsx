import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, TextField } from '@mui/material';
import { Card } from '../../types';
import styles from './styles/cardDialog.module.css';
import { InputUnstyled, OptionUnstyled, SelectUnstyled } from '@mui/base';
import { getCardBrandOptions, getCardExpirationMonthOptions, getCardExpirationYearOptions, getDefaultCardValues } from '../../utilities/cardDialog';

interface CardDialogProps {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  cards: Card[] | null,
  setCards: React.Dispatch<React.SetStateAction<Card[] | null>>,
}

const CardDialog = ({ dialogOpen, setDialogOpen, cards, setCards } : CardDialogProps) => {
  

  let monthOptions = [];
  for(let i = 0; i < 12; i++) {
    monthOptions[i] = i + 1;
  }

  let yearOptions = [];
  let currentYear = new Date().getFullYear();
  for(let i = 0; i < 20; i++) { 
    yearOptions[i] = currentYear++;
  }

  const [newCard, setNewCard] = useState<Card>(getDefaultCardValues());

  return(
    <Dialog className={styles.dialog} open={dialogOpen} onClose={() => {setDialogOpen(false)}}>
      <DialogTitle className={styles.dialogTitle}>Add card</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Box className={`${styles.inputBox} ${styles.cardHolder}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardHolder'>Nickname</InputLabel>
          <InputUnstyled
            id='inputCardHolder'
            className={styles.inputUnstyled}
            placeholder='John Doe'
            onChange={(e) => {setNewCard({...newCard, holder: e.target.value})}}
          />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardNumber}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardNumber'>Card number</InputLabel>
          <InputUnstyled
            id='inputCardNumber'
            className={styles.inputUnstyled}
            placeholder='4242 4242 4242 4242'
            onChange={(e) => {setNewCard({...newCard, number: e.target.value})}} />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardExpirationDate}`}>
          <InputLabel className={styles.inputLabel} htmlFor='selectCardExpirationDate'>Exp date</InputLabel>
          <InputUnstyled
            id='selectCardExpirationDate'
            className={styles.inputUnstyled}
            placeholder='02/24'
            onChange={(e) => {setNewCard({...newCard, expirationMonth: e.target.value})}} />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardCSV}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardCSV'>CSV</InputLabel>
          <InputUnstyled
            id='inputCardCSV'
            className={styles.inputUnstyled}
            placeholder='424'
            onChange={(e) => {setNewCard({...newCard, cvv: e.target.value})}}
          />
        </Box>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button className={styles.addAction} onClick={() => {
          cards ? setCards([...cards, newCard]) : setCards([newCard]);
        }}>Add</Button>
        <Button className={styles.cancelAction}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDialog;