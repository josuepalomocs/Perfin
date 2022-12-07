import { BellIcon } from "@heroicons/react/24/solid";
import { ButtonUnstyled } from "@mui/base";
import { Avatar, Box, Typography } from "@mui/material";
import Head from "next/head";
import CardSection from "../components/CardSection/CardSection";
import useNavigation from "../components/NavigationSection/hooks/useNavigation";
import NavigationSection from "../components/NavigationSection/navigationSection";
import Transaction from "../components/Transaction/Transaction";
import TransactionSection from "../components/TransactionSection/TransactionSection";
import styles from "../styles/index/index.module.css";

const Home = () => {
  const { navigationItemList, selectedNavigationItem, setSelectedNavigationItem } = useNavigation();

  return (
    <div className={"App"}>
      <Head>
        <title>Home</title>
        <meta name="Home" content="Perfin | Personal Finance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.pageWrapper}>
        <NavigationSection
          navigationItemList={navigationItemList}
          selectedNavigationItem={selectedNavigationItem}
          setSelectedNavigationItem={setSelectedNavigationItem}
        />
        <Box className={styles.main}>
          <Box className={styles.header}>
            <Typography className={styles.title} variant="inherit"></Typography>
            <Box className={styles.right}>
              <ButtonUnstyled id="viewNotifications" className={styles.viewNotifications}>
                <BellIcon className={styles.icon} />
              </ButtonUnstyled>
              <ButtonUnstyled id="redirectToUserProfile" className={styles.profileRedirect}>
                <Avatar className={styles.userAvatar} />
              </ButtonUnstyled>
            </Box>
          </Box>

          <Box className={styles.grid}>
            {selectedNavigationItem.id === "cardSection" && <CardSection />}
            {selectedNavigationItem.id === "dashboardSection" && <TransactionSection />}
          </Box>
        </Box>
        {/* <TransactionSection /> */}
      </Box>
    </div>
  );
};

export default Home;
