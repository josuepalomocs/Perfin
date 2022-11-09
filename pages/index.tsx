import Head from 'next/head';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import TransactionSection from '../components/TransactionSection/TransactionSection';

const Home = () => {
  return (
    <div className={'App'}>
      <Head>
        <title>Home</title>
        <meta name='Home' content='Perfin | Personal Finance' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <PageWrapper>
        <TransactionSection />
      </PageWrapper>
    </div>
  )
}

export default Home;
