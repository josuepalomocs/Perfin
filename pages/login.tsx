import Head from 'next/head';
import LoginSection from '../components/LoginSection.tsx/LoginSection';
import PageWrapper from '../components/PageWrapper/PageWrapper';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='Login' content='Perfin | Personal Finance' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageWrapper>
        <LoginSection />
      </PageWrapper>
    </>
  );
};

export default Login;