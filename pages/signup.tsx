import Head from 'next/head';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import SignupSection from '../components/SignupSection/SignupSection';
import styles from '../styles/signup.module.css';

const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name='Sign up' content='Perfin | Personal Finance' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWrapper className={styles.pageWrapper}>
        <SignupSection />
      </PageWrapper>
    </>
  );
};

export default Signup;