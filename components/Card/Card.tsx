import React, { useState } from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { Card as CardType} from '../../types';
import styles from './styles/card.module.css';

interface CardProps extends CardType {}

const Card = ({ brand, nickname, number, expirationDate, csv} : CardProps) => {
  return (
    <Container className={styles.container}>
      <Avatar 
        className={styles.cardBrandType} 
        alt='Card brand logo' 
        src={`${brand}_logo.svg`} />
      <Box className={styles.middle}>
        <Typography className={styles.cardNickname} variant='inherit'>{nickname}</Typography>
        <Typography className={styles.cardNumberValue} variant='inherit'>{number}</Typography>
      </Box>
      <Box className={styles.bottom}>
        <Box className={styles.cardExpirationDate}>
          <Typography className={styles.cardExpirationDateValue}>Exp {expirationDate}</Typography>
        </Box>
        <Box className={styles.cardCVV}>
          <Typography className={styles.cardCVVValue}>Csv {csv}</Typography>
        </Box>
      </Box>
    <Box className={styles.backgroundImage} />
    </Container>
  );
};

export default Card;