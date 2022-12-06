import Head from "next/head";
import CardSection from "../components/CardSection/CardSection";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import styles from "../styles/cards.module.css";

const Home = () => {
  return (
    <>
      <Head>
        <title>Cards</title>
        <meta name="Cards" content="Perfin | Personal Finance" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <PageWrapper className={styles.pageWrapper}>
        <CardSection />
      </PageWrapper>
    </>
  );
};

export default Home;
