import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import firebaseAuth from "../../firebase/index";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail, User } from "firebase/auth";
import { Box, Divider, FormLabel, Link, Typography } from "@mui/material";
import { ButtonUnstyled, FormControlUnstyled, InputUnstyled } from "@mui/base";
import styles from "./styles/loginSection.module.css";

const LoginSection = () => {
  const loginWithCredentialsHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const loginWithGoogleHandleSubmit = () => {};

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Welcome back</Typography>
      <Typography className={styles.subTitle}>Login to access the dashboard</Typography>
      <Box className={styles.form} component="form" onSubmit={loginWithCredentialsHandleSubmit}>
        <FormControlUnstyled className={styles.inputTextBox}>
          <FormLabel className={styles.label} htmlFor="emailInput">
            Email
          </FormLabel>
          <InputUnstyled id="emailInput" className={styles.inputText} type="email" placeholder="email@perfin.com" />
        </FormControlUnstyled>
        <FormControlUnstyled className={styles.inputTextBox}>
          <FormLabel className={styles.label} htmlFor="passwordInput">
            Password
          </FormLabel>
          <InputUnstyled id="passwordInput" className={styles.inputText} type="password" placeholder="••••••••" />
        </FormControlUnstyled>
        <FormControlUnstyled className={styles.inputCheckboxAndLinkBox}>
          <Box className={styles.inputCheckboxBox}>
            <InputUnstyled id="rememberPasswordInput" className={styles.input} type="checkbox" />
            <FormLabel className={styles.label} htmlFor="rememberPasswordInput">
              Remember password
            </FormLabel>
          </Box>
          <Link className={styles.link} href="#">
            Forgot password?
          </Link>
        </FormControlUnstyled>
        <Box className={styles.loginWithCredentialsBox}>
          <ButtonUnstyled id="loginWithCredentials" className={`${styles.loginButton} ${styles.withCredentials}`} type="submit">
            Login
          </ButtonUnstyled>
        </Box>
        <Typography className={styles.loginButtonDividerText}>Or</Typography>
        <Box className={styles.loginWithProviderBox}>
          <ButtonUnstyled id="loginWithGoogle" className={`${styles.loginButton} ${styles.withGoogle}`} onClick={loginWithGoogleHandleSubmit}>
            Continue with Google
          </ButtonUnstyled>
        </Box>
      </Box>
      <Box className={styles.registerBox}>
        <Typography className={styles.registerPrompt}>Don't have an account?</Typography>
        <Link className={styles.registerLink} href="#">
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginSection;
