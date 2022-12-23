import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Box, List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import { AccountBase, AccountsGetRequest, AccountsGetResponse } from "plaid";
import { useEffect, useState } from "react";
import PlaidLink from "../PlaidLink/PlaidLink";
import styles from "./styles/accounts.module.css";

const Accounts = () => {
  const [accountList, setAccountList] = useState<AccountBase[] | null>(null);
  // useEffect(() => {
  //   const getAccountList = async () => {
  //     const accountGetRequestList: AccountsGetRequest[] = [];
  //     const { data: accountList } = await axios.post<AccountBase[]>("/api/plaid/accounts", { data: accountGetRequestList });
  //     setAccountList(accountList);
  //   };

  //   getAccountList();
  // }, []);

  const renderAccountList = () => {
    if (accountList) {
      return (
        <List className={styles.accountList}>
          {accountList.map(({ account_id, official_name, mask }) => {
            return (
              <ListItem className={styles.account} key={account_id}>
                <Box className={styles.accountLeftBox}>
                  <Box className={styles.accountInstitutionLogo} component="img" src="/chase_logo.svg" />
                  <Typography className={styles.accountInstitutionName}>
                    {official_name} - {mask}
                  </Typography>
                </Box>
                <Box className={styles.accountRightBox}>
                  <ChevronRightIcon className={styles.chevronRightIcon} />
                </Box>
              </ListItem>
            );
          })}
        </List>
      );
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Linked Accounts
        </Typography>
        <PlaidLink />
      </Box>
      <Box className={styles.bottom}>{renderAccountList()}</Box>
    </Box>
  );
};

export default Accounts;
