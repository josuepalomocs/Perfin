import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import LoginForm from "../components/LoginForm.tsx/LoginForm";
import UserContext from "../context/UserContext";
import styles from "../styles/login/login.module.css";
import { NextApiRequest, NextApiResponse } from "next";

const Login = () => {
  const { user } = useContext(UserContext);

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

export const getServerSideProps = async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {};

export default Login;
