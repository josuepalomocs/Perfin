import React, { useEffect, useState } from "react";
import createLinkToken from "../../plaid/services/createLinkToken";
import Container from "../Container/Container";
import PlaidLink from "../PlaidLink/PlaidLink";
import styles from "./styles/transactionSection.module.css";

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
    <Container className={styles.container} type="section">
      <Text className={styles.heading} type={"h1"}>
        Transactions
      </Text>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRowHeaders}>
            <th className={styles.tableHeader}>
              <Button id="transactionListSortByName" className={styles.listSortByColumn} onClick={() => {}}>
                MERCHANT
              </Button>
            </th>
            <th className={styles.tableHeader}>
              <Button id="transactionListSortByDate" className={styles.listSortByColumn} onClick={() => {}}>
                DATE
              </Button>
            </th>
            <th className={styles.tableHeader}>
              <Button id="transactionListSortByAccount" className={styles.listSortByColumn} onClick={() => {}}>
                ACCOUNT
              </Button>
            </th>
            <th className={styles.tableHeader}>
              <Button id="transactionListSortByAmount" className={styles.listSortByColumn} onClick={() => {}}>
                AMOUNT
              </Button>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr className={styles.tableRowData}>
            <td className={`${styles.tableData} ${styles.merchantData}`}>
              <Image className={styles.merchantLogo} src={"https://logo.clearbit.com/target.com"} alt={"Merchant logo"} width={40} height={40} />
              <Text className={styles.merchantName} type="p">
                TARGET
              </Text>
            </td>
            <td className={styles.tableData}>Nov 1, 2022</td>
            <td className={styles.tableData}>QuickSilver 7116</td>
            <td className={`${styles.amount} ${styles.positive}`}>+$54.78</td>
          </tr>
          <tr className={styles.tableRowData}>
            <td className={`${styles.tableData} ${styles.merchantData}`}>
              <Image className={styles.merchantLogo} src={"https://logo.clearbit.com/amazon.com"} alt={"Merchant logo"} width={40} height={40} />
              <Text className={styles.merchantName} type="p">
                AMAZON
              </Text>
            </td>
            <td className={styles.tableData}>Oct 24, 2022</td>
            <td className={styles.tableData}>QuickSilver 7116</td>
            <td className={`${styles.amount} ${styles.negative}`}>-$12.47</td>
          </tr>
          <tr className={styles.tableRowData}>
            <td className={`${styles.tableData} ${styles.merchantData}`}>
              <Image className={styles.merchantLogo} src={"https://logo.clearbit.com/spotify.com"} alt={"Merchant logo"} width={40} height={40} />
              <Text className={styles.merchantName} type="p">
                SPOTIFY
              </Text>
            </td>
            <td className={styles.tableData}>Oct 21, 2022</td>
            <td className={styles.tableData}>QuickSilver 7116</td>
            <td className={`${styles.amount} ${styles.negative}`}>-$47.12</td>
          </tr>
          <tr className={styles.tableRowData}>
            <td className={`${styles.tableData} ${styles.merchantData}`}>
              <Image className={styles.merchantLogo} src={"https://logo.clearbit.com/samsung.com"} alt={"Merchant logo"} width={40} height={40} />
              <Text className={styles.merchantName} type="p">
                SAMSUNG
              </Text>
            </td>
            <td className={styles.tableData}>Sep 5, 2022</td>
            <td className={styles.tableData}>QuickSilver 7116</td>
            <td className={`${styles.amount} ${styles.positive}`}>+$47.12</td>
          </tr>
          <tr className={styles.tableRowData}>
            <td className={`${styles.tableData} ${styles.merchantData}`}>
              <Image className={styles.merchantLogo} src={"https://logo.clearbit.com/offwhite.com"} alt={"Merchant logo"} width={40} height={40} />
              <Text className={styles.merchantName} type="p">
                OFF-WHITE
              </Text>
            </td>
            <td className={styles.tableData}>Sep 2, 2022</td>
            <td className={styles.tableData}>QuickSilver 7116</td>
            <td className={`${styles.amount} ${styles.negative}`}>-$504.57</td>
          </tr>
        </tbody>
      </table>
      {/* <Button id='addExternalTransaction' className={styles.addExternal}>Add External Transaction</Button> */}
      {/* <Container className={styles.actionsContainer}>
				<Button id={'linkAccountWithPlaid'} className={styles.linkAccount} onClick={() => { setRenderPlaidLink(true) }}>Link Account</Button>
			</Container> */}
      {linkToken ? <PlaidLink linkToken={linkToken} /> : <></>}
    </Container>
  );
};

export default TransactionSection;
