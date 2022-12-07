import React, { useEffect, useState } from "react";
import createLinkToken from "../../plaid/services/createLinkToken";
import { Box, Container, Typography } from "@mui/material";
import PlaidLink from "../PlaidLink/PlaidLink";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./styles/transactionSection.module.css";
import { getDataGridColumns, getDataGridRows } from "./utilities";

const TransactionSection = () => {
  const [renderPlaidLink, setRenderPlaidLink] = useState(false);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (renderPlaidLink && !linkToken) {
        setLinkToken(await createLinkToken());
      }
    })();
  }, [renderPlaidLink, linkToken]);

  return (
    <Box className={styles.container}>
      <Typography className={styles.title} variant="inherit">
        Transactions
      </Typography>
      <DataGrid
        className={styles.dataGrid}
        rows={[
          { id: 1, name: "Target", date: "Oct 24", account: "Chase Checking 5847", amount: "+$5.45" },
          { id: 2, name: "Chase", date: "Oct 21", account: "Chase Checking 5847", amount: "-$64.75" },
          { id: 3, name: "Amazon", date: "Oct 14", account: "Capital One Credit 8478", amount: "-$23.48" },
          { id: 4, name: "Spotify", date: "Sep 25", account: "Capital One Credit 8478", amount: "+$7.87" },
          { id: 5, name: "Apple", date: "Sep 11", account: "Chase Checking 5847", amount: "-$1024.27" },
          { id: 6, name: "Target", date: "Oct 24", account: "Chase Checking 5847", amount: "+$5.45" },
          { id: 7, name: "Chase", date: "Oct 21", account: "Chase Checking 5847", amount: "-$64.75" },
          { id: 8, name: "Amazon", date: "Oct 14", account: "Capital One Credit 8478", amount: "-$23.48" },
          { id: 9, name: "Spotify", date: "Sep 25", account: "Capital One Credit 8478", amount: "+$7.87" },
          { id: 10, name: "Apple", date: "Sep 11", account: "Chase Checking 5847", amount: "-$1024.27" },
          { id: 11, name: "Target", date: "Oct 24", account: "Chase Checking 5847", amount: "+$5.45" },
          { id: 12, name: "Chase", date: "Oct 21", account: "Chase Checking 5847", amount: "-$64.75" },
          { id: 13, name: "Amazon", date: "Oct 14", account: "Capital One Credit 8478", amount: "-$23.48" },
          { id: 14, name: "Spotify", date: "Sep 25", account: "Capital One Credit 8478", amount: "+$7.87" },
          { id: 15, name: "Apple", date: "Sep 11", account: "Chase Checking 5847", amount: "-$1024.27" },
        ]}
        columns={getDataGridColumns()}
        disableColumnSelector
        disableColumnFilter
        disableColumnMenu
        disableDensitySelector
        disableSelectionOnClick
        hideFooterSelectedRowCount
        autoPageSize
      />
      {linkToken ? <PlaidLink linkToken={linkToken} /> : <></>}
    </Box>
  );
};

export default TransactionSection;
