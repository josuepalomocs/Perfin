import { Box, List, ListItem, Typography } from "@mui/material";
import styles from "./styles/accounts.module.css";

const Accounts = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Accounts
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <List className={styles.accountList}>
          <ListItem className={styles.account}>
            <Box className={styles.accountLeftBox}>
              <Box className={styles.accountLogo} component="img" src="/chase_logo.svg" />
            </Box>
            <Box className={styles.accountRightBox}></Box>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Accounts;
