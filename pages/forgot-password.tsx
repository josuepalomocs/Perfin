import React from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import ForgotPasswordForm from "../components/ForgotPasswordForm/ForgotPasswordForm";
import styles from "../styles/forgotPassword/forgotPassword.module.css";

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="Forgot Password" content="Perfin | Forgot Password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.wrapper}>
        <ForgotPasswordForm />
      </Box>
    </>
  );
};

export default ForgotPassword;
