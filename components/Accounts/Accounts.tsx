import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ButtonUnstyled } from "@mui/base";
import { Box, List, ListItem, Typography } from "@mui/material";
import styles from "./styles/accounts.module.css";

const Accounts = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Linked Accounts
        </Typography>
      </Box>
      <Box className={styles.bottom}>
        <List className={styles.accountList}>
          <ListItem className={styles.account}>
            <Box className={styles.accountLeftBox}>
              <Box className={styles.accountInstitutionLogo} component="img" src="/chase_logo.svg" />
              <Typography className={styles.accountInstitutionName}>JPMorgan Chase & Co - 6784</Typography>
            </Box>
            <Box className={styles.accountRightBox}>
              <ChevronRightIcon className={styles.chevronRightIcon} />
            </Box>
          </ListItem>
        </List>
        <List className={styles.accountList}>
          <ListItem className={styles.account}>
            <Box className={styles.accountLeftBox}>
              <Box className={styles.accountInstitutionLogo} component="img" src="/bofa_logo.svg" />
              <Typography className={styles.accountInstitutionName}>Bank of America - 6784</Typography>
            </Box>
            <Box className={styles.accountRightBox}>
              <ChevronRightIcon className={styles.chevronRightIcon} />
            </Box>
          </ListItem>
        </List>
        <List className={styles.accountList}>
          <ListItem className={styles.account}>
            <Box className={styles.accountLeftBox}>
              <Box className={styles.accountInstitutionLogo} component="img" src="/capitalone_logo.svg" />
              <Typography className={styles.accountInstitutionName}>Capital One - 7136</Typography>
            </Box>
            <Box className={styles.accountRightBox}>
              <ChevronRightIcon className={styles.chevronRightIcon} />
            </Box>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Accounts;
