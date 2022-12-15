import React from "react";
import { Backdrop, Box, CircularProgress, Divider, FormLabel, Link, Typography } from "@mui/material";
import { ButtonUnstyled, InputUnstyled } from "@mui/base";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles/registerForm.module.css";
import useRegister from "./hooks/useRegister";
import { ErrorMessage } from "@hookform/error-message";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const {
    handleSubmit: credentialsHandleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterData>({ defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" } });

  const { errorMessage, isRedirecting, handleRegisterWithCredentials, handleRegisterWithGooglePopup } = useRegister();

  const googlePopupOnSubmit = () => {
    handleRegisterWithGooglePopup();
  };

  const credentialsOnSubmit: SubmitHandler<RegisterData> = (credentials) => {
    handleRegisterWithCredentials(credentials);
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Sign up</Typography>
      <Typography className={styles.subTitle}>Register to start tracking your finances</Typography>
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
      <Box className={styles.form} component="form" onSubmit={credentialsHandleSubmit(credentialsOnSubmit)} noValidate>
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
          name="firstName"
          control={control}
          rules={{ required: { value: true, message: "Field is required" } }}
          render={({ field }) => {
            return (
              <Box className={`${styles.inputTextBox} ${styles.halfWidth} ${styles.roundedRight}`}>
                <FormLabel className={styles.label} htmlFor="firstNameInput">
                  First name
                </FormLabel>
                <InputUnstyled {...field} id="firstNameInput" className={styles.inputText} type="text" placeholder="John" />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
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
          name="lastName"
          control={control}
          rules={{ required: { value: true, message: "Field is required" } }}
          render={({ field }) => {
            return (
              <Box className={`${styles.inputTextBox} ${styles.halfWidth} ${styles.roundedLeft}`}>
                <FormLabel className={styles.label} htmlFor="lastNameInput">
                  Last name
                </FormLabel>
                <InputUnstyled {...field} id="lastNameInput" className={styles.inputText} type="text" placeholder="Doe" />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
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
          rules={{ required: { value: true, message: "Field is required" }, minLength: { value: 8, message: "Password must be at least 8 characters long" } }}
          render={({ field }) => {
            return (
              <Box className={`${styles.inputTextBox} ${styles.halfWidth} ${styles.roundedRight}`}>
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
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: { value: true, message: "Field is required" } }}
          render={({ field }) => {
            return (
              <Box className={`${styles.inputTextBox} ${styles.halfWidth} ${styles.roundedLeft}`}>
                <FormLabel className={styles.label} htmlFor="confirmPasswordInput">
                  Confirm password
                </FormLabel>
                <InputUnstyled {...field} id="confirmPasswordInput" className={styles.inputText} type="password" placeholder="••••••••" />
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
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
        <Box className={styles.loginWithCredentialsBox}>
          <ButtonUnstyled id="loginWithCredentials" className={`${styles.loginButton} ${styles.withCredentials}`} type="submit">
            Register
          </ButtonUnstyled>
        </Box>
      </Box>
      <Box className={styles.registerBox}>
        <Typography className={styles.registerPrompt}>Already have an account?</Typography>
        <Link className={styles.registerLink} href="/login">
          Login
        </Link>
      </Box>
      <Backdrop className={styles.circularProgress} open={isRedirecting}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default RegisterForm;
