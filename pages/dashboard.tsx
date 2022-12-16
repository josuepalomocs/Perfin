import { Box, Container } from "@mui/material";
import Head from "next/head";
import DashboardContent from "../components/DashboardContent/DashboardContent";
import Header from "../components/Header/Header";
import styles from "../styles/dashboard/dashboard.module.css";

const Dashboard = () => {
  return (
    <Box className={styles.wrapper}>
      <Head>
        <meta name="description" content="The Perfin dashboard displays an analytical overview of a users' finances for linked bank accounts." />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <DashboardContent />
    </Box>
  );
};

export default Dashboard;
