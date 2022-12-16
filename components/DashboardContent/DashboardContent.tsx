import { Container } from "@mui/material";
import Accounts from "../Accounts/Accounts";
import Balance from "../Balance/Balance";
import Overview from "../Overview/Overview";
import Transactions from "../Transactions/Transactions";
import styles from "./styles/dashboardContent.module.css";

const DashboardContent = () => {
  return (
    <Container className={styles.container}>
      <Overview />
      <Transactions />
      <Balance />
      <Accounts />
    </Container>
  );
};

export default DashboardContent;
