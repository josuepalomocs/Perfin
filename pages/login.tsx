import { Box } from "@mui/material";
import Head from "next/head";
import LoginForm from "../components/LoginForm.tsx/LoginForm";
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
