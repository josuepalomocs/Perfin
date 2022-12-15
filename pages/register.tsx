import React, { useContext } from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "../styles/register/register.module.css";
import UserContext from "../context/UserContext";
import adminAuth from "../lib/firebase/admin-auth";
import { GetServerSidePropsContext } from "next";

const Register = () => {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="Register" content="Perfin | Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.wrapper}>
        <RegisterForm />
      </Box>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const {
    req: {
      cookies: { firebaseToken },
    },
  } = context;

  if (!firebaseToken) {
    return { props: {} };
  }

  return adminAuth
    .verifyIdToken(firebaseToken)
    .then(() => {
      return { redirect: { permanent: false, destination: "/" } };
    })
    .catch((error) => {
      return { props: {} };
    });
};

export default Register;
