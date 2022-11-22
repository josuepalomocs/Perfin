import Head from 'next/head';
import CardSection from '../components/CardSection/CardSection';
import NavigationSection from '../components/NavigationSection/navigationSection';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import TransactionSection from '../components/TransactionSection/TransactionSection';
import styles from '../styles/index.module.css';

const Home = () => {
  return (
    <div className={'App'}>
      <Head>
        <title>Home</title>
        <meta name='Home' content='Perfin | Personal Finance' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <PageWrapper className={styles.pageWrapper}>
        {/* <NavigationSection /> */}
        <TransactionSection />
        <CardSection />
      </PageWrapper>
    </div>
  )
}

export default Home;
