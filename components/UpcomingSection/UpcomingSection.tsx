import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles/upcomingSection.module.css";

const UpcomingSection = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Upcoming
        </Typography>
      </Box>
    </Box>
  );
};

export default UpcomingSection;
