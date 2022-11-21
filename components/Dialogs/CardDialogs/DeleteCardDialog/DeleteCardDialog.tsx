import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Card } from '../../../../types';
import styles from '../styles/cardDialog.module.css';

interface CardDialogProps {
  dialogOpen: boolean,
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  cards: Card[],
  setCards: React.Dispatch<React.SetStateAction<Card[] | null>>,
  cardSelection: number,
  setCardSelection: React.Dispatch<React.SetStateAction<number>>,
}

const DeleteCardDialog = ({ dialogOpen, setDialogOpen, cards, setCards, cardSelection, setCardSelection }: CardDialogProps) => {
  return(
    <Dialog className={styles.dialog} open={dialogOpen} onClose={() => {setDialogOpen(false)}} disableEnforceFocus={false}>
      <DialogTitle className={styles.dialogTitle}>Delete card</DialogTitle>
      <DialogContent className={`${styles.dialogContent} ${styles.deleteCardDialogContent}`}>
        Delete '{cards[cardSelection] && cards![cardSelection].nickname}'?
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button className={styles.deleteAction} onClick={() => {
          setCards([...cards.slice(0, cardSelection), ...cards.slice(cardSelection + 1, cards.length + 1)]);
          cardSelection === cards.length - 1 && setCardSelection(cardSelection - 1); 
          setDialogOpen(false);
        }}>DELETE</Button>
        <Button className={styles.cancelAction} onClick={() => {
          setDialogOpen(false);
        }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCardDialog;