import React, { useState } from 'react';
import Card from '../Card/Card';
import CardDialog from '../CardDialog/CardDialog';
import { Button, Container, Fab, Typography } from '@mui/material';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card as CardType} from '../../types'; 
import styles from './styles/cardSection.module.css';

interface CardSectionProps {

}

const CardSection = ({  } : CardSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cards, setCards] = useState<CardType[] | null>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  
  return (
    <Container className={styles.container}>
        <Container className={styles.top}>
          <Fab className={styles.revealCard} onClick={() => {
            cardRevealed ? setCardRevealed(false) : setCardRevealed(true);
          }}>
            {
              cardRevealed ?
                <EyeSlashIcon className={styles.eyeSlashIcon} /> :
                <EyeIcon className={styles.eyeIcon} />
            }
          </Fab>
          <Fab className={styles.editCard}>
            <PencilSquareIcon className={styles.pencilSquareIcon} />
          </Fab>
          <Fab className={styles.addCard} onClick={() => {setDialogOpen(true)}}>
            <PlusIcon className={styles.plusIcon} />
          </Fab>
        </Container>
        <Button className={styles.switchToPreviousCard} variant='contained'>
          <ChevronLeftIcon className={styles.chevronLeftIcon} />
        </Button>
        <Card
          id={0}
          brand={'visa'}
          nickname={'Chase Credit Main'}
          number={cardRevealed ? '4242 4242 4242 4242' : '•••• •••• •••• 4242'}
          expirationDate={cardRevealed ? '10/25' : '••/••'}
          cvv={cardRevealed ? '424' : '•••'} />
        <Button className={styles.switchToNextCard} variant='contained'>
          <ChevronRightIcon className={styles.chevronRightIcon} />
        </Button>
        <CardDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cards={cards} setCards={setCards} />
    </Container>
  );
};

export default CardSection;