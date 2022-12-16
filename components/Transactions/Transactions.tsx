import { Box, List, ListItem, Typography } from "@mui/material";
import styles from "./styles/transactions.module.css";

const Transactions = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Transactions
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <List className={styles.transactionList}>
          <ListItem className={styles.transactionListItem}>
            <Typography className={styles.dailyTransactionListItemDate} variant="inherit">
              Oct 12
            </Typography>
            <List className={styles.dailyTransactionList}>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Amazon
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Retail
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                  <Typography className={styles.balanceAfterTransaction} variant="inherit">
                    $4,235.12
                  </Typography>
                </Box>
              </ListItem>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Spotify
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Entertainment
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                </Box>
              </ListItem>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Spectrum
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Internet
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                </Box>
              </ListItem>
            </List>
          </ListItem>

          <ListItem className={styles.transactionListItem}>
            <Typography className={styles.dailyTransactionListItemDate} variant="inherit">
              Sep 24
            </Typography>
            <List className={styles.dailyTransactionList}>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Amazon
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Retail
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                  <Typography className={styles.balanceAfterTransaction} variant="inherit">
                    $4,235.12
                  </Typography>
                </Box>
              </ListItem>
            </List>
          </ListItem>
          <ListItem className={styles.transactionListItem}>
            <Typography className={styles.dailyTransactionListItemDate} variant="inherit">
              Oct 12
            </Typography>
            <List className={styles.dailyTransactionList}>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Amazon
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Retail
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                  <Typography className={styles.balanceAfterTransaction} variant="inherit">
                    $4,235.12
                  </Typography>
                </Box>
              </ListItem>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Spotify
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Entertainment
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                </Box>
              </ListItem>
              <ListItem className={styles.dailyTransactionListItem}>
                <Box className={styles.transactionBoxLeft}>
                  <Typography className={styles.transactionName} variant="inherit">
                    Spectrum
                  </Typography>
                  <Typography className={styles.transactionType} variant="inherit">
                    Internet
                  </Typography>
                </Box>
                <Box className={styles.transactionBoxRight}>
                  <Typography className={styles.transactionAmount} variant="inherit">
                    -$45.15
                  </Typography>
                </Box>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Transactions;
