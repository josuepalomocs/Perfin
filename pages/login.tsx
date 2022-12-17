import Head from "next/head";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm.tsx/LoginForm";
import { GetServerSidePropsContext } from "next";
import adminAuth from "../lib/firebase/admin";
import styles from "../styles/login/login.module.css";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="Login" content="Perfin | Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.wrapper}>
        <LoginForm />
      </Box>
    </>
  );
};

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const {
//     req: {
//       cookies: { firebaseToken },
//     },
//   } = context;

//   if (!firebaseToken) {
//     return { props: {} };
//   }

//   return adminAuth
//     .verifyIdToken(firebaseToken)
//     .then(() => {
//       return { redirect: { permanent: false, destination: "/" } };
//     })
//     .catch((error) => {
//       return { props: {} };
//     });
// };

export default Login;
