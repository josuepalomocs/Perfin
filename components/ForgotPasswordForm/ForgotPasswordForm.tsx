import React from "react";
import { Box, FormLabel, Link, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles/forgotPasswordForm.module.css";
import useForgotPassword from "./hooks/useForgotPassword";
import { ButtonUnstyled, InputUnstyled } from "@mui/base";
import { ErrorMessage } from "@hookform/error-message";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

const ForgotPasswordForm = () => {
  const {
    handleSubmit: emailHandleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" } });

  const { errorMessage, successMessage, handleResetPassword } = useForgotPassword();

  const emailOnSubmit: SubmitHandler<{ email: string }> = ({ email }) => {
    handleResetPassword(email);
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Forgot password</Typography>
      <Typography className={styles.subTitle}>Enter the email address associated with your account to reset your password</Typography>
      {errorMessage && (
        <Box className={styles.onSubmitErrorBox}>
          <ExclamationCircleIcon className={styles.errorIcon} />
          <Typography className={styles.errorMessage} variant="inherit">
            {errorMessage}
          </Typography>
        </Box>
      )}
      {successMessage && (
        <Box className={styles.onSubmitSuccessBox}>
          <CheckIcon className={styles.successIcon} />
          <Typography className={styles.successMessage} variant="inherit">
            {successMessage}
          </Typography>
        </Box>
      )}
      <Box className={styles.form} component="form" onSubmit={emailHandleSubmit(emailOnSubmit)} noValidate>
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
        <Box className={styles.resetPasswordBox}>
          <ButtonUnstyled id="resetPassword" className={styles.resetPassword} type="submit">
            Continue
          </ButtonUnstyled>
        </Box>
      </Box>
      <Box className={styles.loginBox}>
        <Typography className={styles.loginPrompt}>All done?</Typography>
        <Link className={styles.loginLink} href="/login">
          Back to login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
