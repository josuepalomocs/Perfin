import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Backdrop, Box, CircularProgress, Container, Divider, FormLabel, Link, Typography } from "@mui/material";
import { ButtonUnstyled, InputUnstyled } from "@mui/base";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useLogin from "./hooks/useLogin";
import styles from "./styles/loginForm.module.css";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    handleSubmit: emailAndPasswordHandleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const { errorMessage, isRedirecting, handleLoginWithEmailAndPassword, handleLoginWithGooglePopup } = useLogin();

  const emailAndPasswordOnSubmit: SubmitHandler<LoginData> = (credentials) => {
    handleLoginWithEmailAndPassword(credentials);
  };

  const googlePopupOnSubmit = () => {
    handleLoginWithGooglePopup();
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Welcome back</Typography>
      <Typography className={styles.subTitle}>Login to access the dashboard</Typography>
      <Box className={styles.loginWithProviderBox}>
        <ButtonUnstyled id="loginWithGoogle" className={`${styles.loginButton} ${styles.withGoogle}`} onClick={googlePopupOnSubmit}>
          <Box className={styles.googleLogo} component="img" src="/google_logo.svg" />
          Continue with Google
        </ButtonUnstyled>
      </Box>
      <Box className={styles.divider}>
        <Divider className={styles.loginButtonDivider}>Or</Divider>
      </Box>
      {errorMessage && (
        <Box className={styles.onSubmitErrorBox}>
          <ExclamationCircleIcon className={styles.errorIcon} />
          <Typography className={styles.errorMessage} variant="inherit">
            {errorMessage}
          </Typography>
        </Box>
      )}
      <Box className={styles.form} component="form" onSubmit={emailAndPasswordHandleSubmit(emailAndPasswordOnSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{ required: { value: true, message: "Field is required" } }}
          render={({ field }) => {
            return (
              <Box className={styles.inputTextBox}>
                <FormLabel className={styles.label} htmlFor="emailInput">
                  Email
                </FormLabel>
                <InputUnstyled {...field} id="emailInput" className={styles.inputText} type="email" placeholder="email@perfin.com" />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => {
                    return (
                      <Box className={styles.inputTextErrorBox}>
                        <ExclamationCircleIcon className={styles.errorIcon} />
                        <Typography className={styles.errorMessage} variant="inherit">
                          {message}
                        </Typography>
                      </Box>
                    );
                  }}
                />
              </Box>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: { value: true, message: "Field is required" } }}
          render={({ field }) => {
            return (
              <Box className={styles.inputTextBox}>
                <FormLabel className={styles.label} htmlFor="passwordInput">
                  Password
                </FormLabel>
                <InputUnstyled {...field} id="passwordInput" className={styles.inputText} type="password" placeholder="••••••••" />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => {
                    return (
                      <Box className={styles.inputTextErrorBox}>
                        <ExclamationCircleIcon className={styles.errorIcon} />
                        <Typography className={styles.errorMessage} variant="inherit">
                          {message}
                        </Typography>
                      </Box>
                    );
                  }}
                />
              </Box>
            );
          }}
        />
        <Box className={styles.inputCheckboxAndLinkBox}>
          <Link className={styles.link} href="/forgot-password">
            Forgot password?
          </Link>
        </Box>
        <Box className={styles.loginWithCredentialsBox}>
          <ButtonUnstyled id="loginWithCredentials" className={`${styles.loginButton} ${styles.withCredentials}`} type="submit">
            Login
          </ButtonUnstyled>
        </Box>
      </Box>
      <Box className={styles.registerBox}>
        <Typography className={styles.registerPrompt}>Don't have an account?</Typography>
        <Link className={styles.registerLink} href="/register">
          Register
        </Link>
      </Box>
      <Backdrop className={styles.circularProgress} open={isRedirecting}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default LoginForm;
