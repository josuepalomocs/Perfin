import React, { useContext } from "react";
import Head from "next/head";
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "../styles/register/register.module.css";
import UserContext from "../context/UserContext";

const Register = () => {
  const { user } = useContext(UserContext);
  const redirectDialogIsOpen = Boolean(user);

  if (redirectDialogIsOpen) {
    return (
      <Dialog className={styles.redirectDialog} open={redirectDialogIsOpen}>
        <DialogTitle className={styles.title}>Just a moment</DialogTitle>
        <DialogContent className={styles.content}>
          <DialogContentText className={styles.message}>You are being redirected to the dashboard...</DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }

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

export default Register;
