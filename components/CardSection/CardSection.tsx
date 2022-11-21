import React, { useState } from 'react';
import Card from '../Card/Card';
import { Alert, Box, Button, Container, Fab, Typography } from '@mui/material';
import { ChevronLeftIcon, ChevronRightIcon, ClipboardDocumentIcon, ClipboardDocumentListIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Card as CardType} from '../../types'; 
import CreateCardDialog from '../Dialogs/CardDialogs/CreateCardDialog/CreateCardDialog';
import styles from './styles/cardSection.module.css';
import DeleteCardDialog from '../Dialogs/CardDialogs/DeleteCardDialog/DeleteCardDialog';
import EditCardDialog from '../Dialogs/CardDialogs/EditCardDialog/EditCardDialog';

interface CardSectionProps {

}

const CardSection = ({  } : CardSectionProps) => {
  const [createCardDialogOpen, setCreateCardDialogOpen] = useState(false);
  const [editCardDialogOpen, setEditCardDialogOpen] = useState(false);
  const [deleteCardDialogOpen, setDeleteCardDialogOpen] = useState(false);
  const [cards, setCards] = useState<CardType[] | null>([
    {
      brand: 'visa',
      nickname: 'Chase Debit',
      number: '4578-4546-5465-2438',
      expirationDate: '10/25',
      csv: '325',
    },
    {
      brand: 'mastercard',
      nickname: 'Paypal Business',
      number: '5486-7521-8054-9586',
      expirationDate: '06/26',
      csv: '248',
    },
    {
      brand: 'discover',
      nickname: 'Discover Credit',
      number: '6578-4546-5465-2438',
      expirationDate: '05/24',
      csv: '895',
    },
    {
      brand: 'american-express',
      nickname: 'American Express Business',
      number: '3875-884536-94485',
      expirationDate: '12/26',
      csv: '985',
    },

  ]);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [cardSelection, setCardSelection] = useState(0);

  const activeCard = cards && cards[cardSelection];

  const getFormattedCardNumber = () => {
    let formattedCardNumber = '';
    if(activeCard) {
      const cardNumberDigitsOnly = activeCard.number.replaceAll('-', '');
      if(activeCard.brand === 'american-express') {
        formattedCardNumber += cardNumberDigitsOnly.slice(0, 4) + ' ' +
          cardNumberDigitsOnly.slice(4, 10) + ' ' +
          cardNumberDigitsOnly.slice(10, 15)
      } else {
        for(let i = 0; i < 16; i += 4) {
          formattedCardNumber += cardNumberDigitsOnly.slice(i, i + 4) + ' '
        }
      }
    }
    return formattedCardNumber;
  }

  return (
    <Container className={styles.container}>
        <Container className={styles.top}>
          <Fab className={styles.copyCardNumber} onClick={() => {
            cards && navigator.clipboard.writeText(cards[cardSelection].number.replaceAll('-', ''));
          }}>
            <ClipboardIcon className={styles.clipboardIcon} />
          </Fab>
          <Fab className={styles.revealCard} onClick={() => {
            cardRevealed ? setCardRevealed(false) : setCardRevealed(true);
          }}>
            {
              cardRevealed ?
                <EyeSlashIcon className={styles.eyeSlashIcon} /> :
                <EyeIcon className={styles.eyeIcon} />
            }
          </Fab>
          <Fab className={styles.deleteCard} onClick={() => {
            if(cards) {
              setDeleteCardDialogOpen(true);
            }
          }}>
            <TrashIcon className={styles.trashIcon} />
          </Fab>
          <Fab className={styles.editCard} onClick={() => {
            if(cards) {
              setEditCardDialogOpen(true);
            }
          }}>
            <PencilSquareIcon className={styles.pencilSquareIcon} />
          </Fab>
          <Fab className={styles.addCard} onClick={() => {setCreateCardDialogOpen(true)}}>
            <PlusIcon className={styles.plusIcon} />
          </Fab>
        </Container>
        <Button className={`${styles.switchToPreviousCard} ${cards && cardSelection === 0 && styles.firstCard}`} variant='contained' onClick={() => {
          if(cards) {
            cardSelection > 0 && setCardSelection(cardSelection - 1)
          }
        }}>
          <ChevronLeftIcon className={styles.chevronLeftIcon} />
        </Button>
        <Box className={styles.cardBox}>
          {
            activeCard ?
              <Card
                brand={activeCard.brand}
                nickname={activeCard.nickname}
                number={cardRevealed ? 
                  getFormattedCardNumber() :
                  `${activeCard.brand === 'american-express' ? `•••• •••••• ${getFormattedCardNumber().slice(-6)}` : `•••• •••• •••• ${getFormattedCardNumber().slice(-5)}`}`}
                expirationDate={cardRevealed ? activeCard.expirationDate : '••/••'}
                csv={cardRevealed ? activeCard.csv : '•••'}
              /> :
              <Typography className={styles.noCardsText}>You don't have any saved cards</Typography>
          }
        </Box>
        <Button className={`${styles.switchToNextCard} ${cards && cardSelection === cards.length - 1 && styles.lastCard}`} variant='contained' onClick={() => {
          if(cards) {
            cardSelection < cards.length - 1 && setCardSelection(cardSelection + 1)
          }
        }}>
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