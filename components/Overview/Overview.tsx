import { Box, Typography } from "@mui/material";
import styles from "./styles/overview.module.css";

const Overview = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Overview
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <Box className={`${styles.card} ${styles.span6}`}>
          <Typography className={styles.description} variant="inherit">
            Transactions
          </Typography>
          <Typography className={styles.value} variant="inherit">
            8
          </Typography>
        </Box>
        <Box className={`${styles.card} ${styles.span6}`}>
          <Typography className={styles.description} variant="inherit">
            Upcoming payment
          </Typography>
          <Typography className={styles.value} variant="inherit">
            Oct 22
          </Typography>
        </Box>
        <Box className={`${styles.card} ${styles.span6}`}>
          <Typography className={styles.description} variant="inherit">
            Spendings
          </Typography>
          <Typography className={styles.value} variant="inherit">
            -$54.21
          </Typography>
        </Box>
        <Box className={`${styles.card} ${styles.span6}`}>
          <Typography className={styles.description} variant="inherit">
            Deposits
          </Typography>
          <Typography className={styles.value} variant="inherit">
            +$178.97
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
