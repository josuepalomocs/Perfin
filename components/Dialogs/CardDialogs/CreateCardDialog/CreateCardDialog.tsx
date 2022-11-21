import React, { useState } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel } from '@mui/material';
import { Card } from '../../../../types';
import { InputUnstyled } from '@mui/base';
import { getDefaultCardValues } from '../../../../utilities/cardDialog';
import InputMask from 'react-input-mask';
import styles from '../styles/cardDialog.module.css';

interface CardDialogProps {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  cards: Card[] | null,
  setCards: React.Dispatch<React.SetStateAction<Card[] | null>>,
  cardSelection: number,
  setCardSelection: React.Dispatch<React.SetStateAction<number>>,
}

const CreateCardDialog = ({ dialogOpen, setDialogOpen, cards, setCards, cardSelection, setCardSelection } : CardDialogProps) => {
  const [newCard, setNewCard] = useState<Card>(getDefaultCardValues());

  return(
    <Dialog className={styles.dialog} open={dialogOpen} onClose={() => {setDialogOpen(false)}} disableEnforceFocus={false}>
      <DialogTitle className={styles.dialogTitle}>Add card</DialogTitle>
      <DialogContent className={`${styles.dialogContent} ${styles.createCardContent}`}>
        <Box className={`${styles.inputBox} ${styles.cardHolder}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardNickname'>Nickname</InputLabel>
          <InputUnstyled
            id='inputCardNickname'
            className={styles.input}
            placeholder='John Doe'
            onChange={(e) => {setNewCard({...newCard, nickname: e.target.value})}}
          />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardNumber}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardNumber'>Card number</InputLabel>
          <InputMask
            id='inputCardNumber'
            className={`${styles.input} ${styles.cardNumber}`}
            mask={/^3[47]/.test(newCard.number) ? 
              '9999-999999-99999' : 
              '9999-9999-9999-9999'}
            placeholder='4242-4242-4242-4242'
            onChange={(e) => {
              let brand = '';
              switch(e.target.value.charAt(0)) {
                case '3':
                  brand = 'american-express';
                  break;
                case '4':
                  brand = 'visa';
                  break;
                case '5':
                  brand = 'mastercard';
                  break;
                case '6':
                  brand = 'discover';
                  break;
              }
              setNewCard({...newCard, brand: brand, number: e.target.value})
            }} />
            <Avatar className={`${newCard.brand && styles.cardIcon } ${styles.cardBrand}`} src={`${newCard.brand}_logo.svg`}> </Avatar>
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardExpirationDate}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardExpirationDate'>Exp date</InputLabel>
          <InputMask
            id='inputCardExpirationDate'
            className={`${styles.input} ${styles.cardExpirationDate}`}
            mask='99/99'
            placeholder='01/25'
            onChange={(e) => {setNewCard({...newCard, expirationDate: e.target.value})}} />
        </Box>
        <Box className={`${styles.inputBox} ${styles.cardCSV}`}>
          <InputLabel className={styles.inputLabel} htmlFor='inputCardCSV'>CSV</InputLabel>
          <InputMask
            id='inputCardCSV'
            className={`${styles.input} ${styles.cardCSV}`}
            mask='999'
            placeholder='123'
            onChange={(e) => {setNewCard({...newCard, csv: e.target.value})}}
        />
        </Box>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button className={styles.addAction} onClick={() => {
          cards ? setCards([...cards, newCard]) : setCards([newCard]);
          setCardSelection(cards ? cards!.length : 0);
          setDialogOpen(false);
        }}>Add</Button>
        <Button className={styles.cancelAction} onClick={() => {
          setNewCard({...newCard, brand: ''});
          setDialogOpen(false);
        }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCardDialog;