import React, { useContext, useEffect, useState } from "react";
import createLinkToken from "../../plaid/services/createLinkToken";
import { Box, Typography } from "@mui/material";
import PlaidLink from "../PlaidLink/PlaidLink";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./styles/transactionSection.module.css";
import { getDataGridColumns } from "./utilities";
import getDummyTransactionList from "./faker/getDummyTransactionList";
import { PlaidContext } from "../../pages/_app";

const TransactionSection = () => {
  const [transactionList, setTransactionList] = useState();
  const { accessTokenList, setAccessTokenList } = useContext(PlaidContext);

  useEffect(() => {});

  return (
    <Box className={styles.container}>
      <Box className={styles.top}>
        <Typography className={styles.title} variant="inherit">
          Transactions
        </Typography>
        <PlaidLink />
      </Box>
      <DataGrid
        className={styles.dataGrid}
        rows={getDummyTransactionList(100)}
        columns={getDataGridColumns()}
        disableColumnSelector
        disableColumnFilter
        disableColumnMenu
        disableDensitySelector
        disableSelectionOnClick
        hideFooterSelectedRowCount
        autoPageSize
      />
    </Box>
  );
};

export default TransactionSection;
