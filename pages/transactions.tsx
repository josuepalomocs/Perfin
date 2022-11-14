import Head from 'next/head';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import TransactionSection from '../components/TransactionSection/TransactionSection';
import styles from '../styles/signup.module.css';

const Signup = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
        <meta name='Transactions' content='Perfin | Personal Finance' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWrapper className={styles.pageWrapper}>
        <TransactionSection />
      </PageWrapper>
    </>
  );
};

export default Signup;