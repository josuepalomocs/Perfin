import React from "react";
import { Box, Typography } from "@mui/material";
import { Card as CardType } from "../../../../types/card";
import styles from "./styles/card.module.css";
import { getFormattedCardNumber, hideFormattedCardNumber } from "./helpers";

interface CardProps extends CardType {
  isCardRevealed: boolean;
}

const Card = ({ id, brand, nickname, number, expirationDate, csv, isCardRevealed }: CardProps) => {
  const renderNumber = () => {
    const formattedCardNumber = getFormattedCardNumber(brand, number);
    if (!isCardRevealed) {
      return hideFormattedCardNumber(brand, formattedCardNumber);
    }
    return formattedCardNumber;
  };

  const renderExpirationDate = () => {
    if (!isCardRevealed) {
      return "••/••";
    }
    return expirationDate;
  };

  const renderCsv = () => {
    if (!isCardRevealed) {
      return "•••";
    }
    return csv;
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.brandImage} component="img" alt="Card brand logo" src={`${brand}_logo.svg`} />
      <Box className={styles.center}>
        <Typography className={styles.nickname} variant="inherit">
          {nickname}
        </Typography>
        <Typography className={styles.number} variant="inherit">
          {renderNumber()}
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <Typography className={styles.expirationDate}>
          Exp <span>{renderExpirationDate()}</span>
        </Typography>
        <Typography className={styles.cvv}>
          Csv <span>{renderCsv()}</span>
        </Typography>
      </Box>
      <Box className={`${styles.backgroundGradient} ${styles[brand]}`} />
      <Box className={`${styles.backgroundGradient2} ${styles[brand]}`} />
    </Box>
  );
};

export default Card;
