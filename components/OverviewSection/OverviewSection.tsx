import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { ButtonUnstyled, OptionUnstyled, SelectUnstyled } from "@mui/base";
import { ChevronDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import styles from "./styles/overviewSection.module.css";

const OverviewSection = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Overview
        </Typography>
        <Box className={styles.selectBox}>
          <SelectUnstyled className={styles.selectTimeframe} defaultValue="Today">
            <OptionUnstyled value="Today">Today</OptionUnstyled>
            <OptionUnstyled value="This Month">Monthly</OptionUnstyled>
          </SelectUnstyled>
          <ChevronDownIcon className={styles.icon} />
        </Box>
      </Box>
      <Box className={styles.content}>
        <Card className={`${styles.card} ${styles.transactions}`}>
          <Box className={styles.cardTop}>
            <Typography className={styles.cardTitle} variant="inherit">
              Transactions
            </Typography>
          </Box>
          <Typography className={styles.cardContent} variant="inherit">
            8
          </Typography>
        </Card>
        <Card className={`${styles.card} ${styles.spendings}`}>
          <Box className={styles.cardTop}>
            <Typography className={styles.cardTitle} variant="inherit">
              Spendings
            </Typography>
          </Box>
          <Typography className={styles.cardContent} variant="inherit">
            -$54.34
          </Typography>
        </Card>
        <Card className={`${styles.card} ${styles.deposits}`}>
          <Box className={styles.cardTop}>
            <Typography className={styles.cardTitle} variant="inherit">
              Deposits
            </Typography>
          </Box>
          <Typography className={styles.cardContent} variant="inherit">
            +$175.52
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default OverviewSection;
