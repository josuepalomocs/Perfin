import React, { useState } from 'react';
import Card from '../Card/Card';
import { Box, Button, Container, Fab, Typography } from '@mui/material';
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Card as CardType} from '../../types'; 
import CreateCardDialog from '../Dialogs/CardDialogs/CreateCardDialog/CreateCardDialog';
import DeleteCardDialog from '../Dialogs/CardDialogs/DeleteCardDialog/DeleteCardDialog';
import EditCardDialog from '../Dialogs/CardDialogs/EditCardDialog/EditCardDialog';
import { copyCardNumberToClipboard, getFormattedCardNumber, getTestCards } from './utilities';
import styles from './styles/cardSection.module.css';

interface CardSectionProps {

}

const CardSection = ({} : CardSectionProps) => {
  const [createCardDialogOpen, setCreateCardDialogOpen] = useState(false);
  const [editCardDialogOpen, setEditCardDialogOpen] = useState(false);
  const [deleteCardDialogOpen, setDeleteCardDialogOpen] = useState(false);

  const [cards, setCards] = useState<CardType[] | null>(getTestCards());
  const [cardSelection, setCardSelection] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);

  const activeCard = cards && cards[cardSelection];
  const formattedCardNumber = activeCard && getFormattedCardNumber(activeCard.brand, activeCard.number);

  return (
    <Container className={styles.container}>
      <Box className={styles.actions}>
        <Fab className={`${styles.fab} ${styles.copyCardNumber}`} onClick={() => {activeCard && copyCardNumberToClipboard(activeCard.number)}}>
          <ClipboardIcon className={`${styles.icon} ${styles.clipboardIcon}`} />
        </Fab>
        <Fab className={`${styles.fab} ${styles.revealCard}`} onClick={() => {setCardRevealed(!cardRevealed)}}>
          {
            cardRevealed ?
              <EyeSlashIcon className={`${styles.icon} ${styles.eyeSlashIcon}`} /> :
              <EyeIcon className={`${styles.icon} ${styles.eyeIcon}`} />
          }
        </Fab>
        <Fab className={`${styles.fab} ${styles.deleteCard}`} onClick={() => {activeCard && setDeleteCardDialogOpen(true)}}>
          <TrashIcon className={`${styles.icon} ${styles.trashIcon}`} />
        </Fab>
        <Fab className={`${styles.fab} ${styles.editCard}`} onClick={() => {activeCard && setEditCardDialogOpen(true)}}>
          <PencilSquareIcon className={`${styles.icon} ${styles.pencilSquareIcon}`} />
        </Fab>
        <Fab className={`${styles.fab} ${styles.createCard}`} onClick={() => {setCreateCardDialogOpen(true)}}>
          <PlusIcon className={`${styles.icon} ${styles.plusIcon}`} />
        </Fab>
      </Box>
      <Button 
        className={`${styles.toPreviousCard} ${cardSelection <= 0 && styles.firstCard}`} 
        variant='contained' 
        onClick={() => {cardSelection > 0 && setCardSelection(cardSelection - 1)}}>
        <ChevronLeftIcon className={styles.chevronLeftIcon} />
      </Button>
      <Box className={styles.card}>
        {
          activeCard ?
            <Card
              brand={activeCard.brand}
              nickname={activeCard.nickname}
              number={cardRevealed ? 
                formattedCardNumber! :
                `${activeCard.brand === 'american-express' ? 
                  `•••• •••••• ${formattedCardNumber!.slice(-5)}` : 
                    `•••• •••• •••• ${formattedCardNumber!.slice(-5)}`}`}
              expirationDate={cardRevealed ? activeCard.expirationDate : '••/••'}
              csv={cardRevealed ? activeCard.csv : '•••'}
            /> :
            <Typography className={styles.noCardsText}>You don't have any saved cards</Typography>
        }
      </Box>
      <Button 
        className={`${styles.toNextCard} ${cards && cardSelection === cards.length - 1 && styles.lastCard}`} 
        variant='contained' 
        onClick={() => {cards && cardSelection < cards.length - 1 && setCardSelection(cardSelection + 1)}}>
        <ChevronRightIcon className={styles.chevronRightIcon} />
      </Button>
      <CreateCardDialog
        dialogOpen={createCardDialogOpen}
        setDialogOpen={setCreateCardDialogOpen}
        cards={cards}
        setCards={setCards}
        cardSelection={cardSelection}
        setCardSelection={setCardSelection} />
      {
        cards &&
        <DeleteCardDialog
          dialogOpen={deleteCardDialogOpen}
          setDialogOpen={setDeleteCardDialogOpen}
          cards={cards!}
          setCards={setCards}
          cardSelection={cardSelection}
          setCardSelection={setCardSelection} />
      }
      {
        cards &&
        <EditCardDialog
          dialogOpen={editCardDialogOpen} 
          setDialogOpen={setEditCardDialogOpen} 
          cards={cards!} 
          setCards={setCards}
          cardSelection={cardSelection}
          setCardSelection={setCardSelection} />
      }
    </Container>
  );
};

export default CardSection;