import React from "react";
import { Box, Typography } from "@mui/material";
import { Card as CardType } from "../../../../types/card";
import styles from "./styles/card.module.css";

interface CardProps extends CardType {}

const Card = ({ id, brand, nickname, number, expirationDate, csv }: CardProps) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.brandImage} component="img" alt="Card brand logo" src={`${brand}_logo.svg`} />
      <Box className={styles.center}>
        <Typography className={styles.nickname} variant="inherit">
          {nickname}
        </Typography>
        <Typography className={styles.number} variant="inherit">
          {number}
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <Typography className={styles.expirationDate}>
          Exp <span>{expirationDate}</span>
        </Typography>
        <Typography className={styles.cvv}>
          Csv <span>{csv}</span>
        </Typography>
      </Box>
      <Box className={styles.backgroundGradient} />
    </Box>
  );
};

export default Card;
