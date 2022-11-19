import React, { useState } from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { Card as CardType} from '../../types';
import styles from './styles/card.module.css';

const Card = ({ id, brand, nickname, number, expirationDate, cvv } : CardType) => {
  return (
    <Container className={styles.container}>
      <Avatar className={styles.cardBrandType} alt='Card brand logo' src='/mastercard_logo.svg' />
      <Box className={styles.middle}>
        <Typography className={styles.cardNickname} variant='inherit'>Chase Credit Main</Typography>
        <Typography className={styles.cardNumberValue} variant='inherit'>{number}</Typography>
      </Box>
      <Box className={styles.bottom}>
        <Box className={styles.cardExpirationDate}>
          <Typography className={styles.cardExpirationDateValue}>Exp {expirationDate}</Typography>
        </Box>
        <Box className={styles.cardCVV}>
          <Typography className={styles.cardCVVValue}>Csv {cvv}</Typography>
        </Box>
      </Box>
    <Box className={styles.backgroundImage} />
    </Container>
  );
};

export default Card;