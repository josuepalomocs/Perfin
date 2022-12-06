import React from "react";
import { Controller } from "react-hook-form";
import { Dialog as DialogMUI, DialogTitle, DialogContent, Typography, DialogActions, Box, InputLabel, Button } from "@mui/material";
import { InputUnstyled } from "@mui/base";
import { Dialog as DialogProps } from "../../types/dialog";
import { ErrorMessage } from "@hookform/error-message";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import styles from "./styles/dialog.module.css";

const Dialog = ({ open = false, handleClose, type = "prompt", title, message, inputList, actionList, control, errors }: DialogProps) => {
  console.log(errors);
  const renderDialogContent = () => {
    if (type === "prompt") {
      return (
        <Typography className={styles.dialogContentMessage} variant="inherit">
          {message}
        </Typography>
      );
    }
    if (type === "form" && inputList) {
      return inputList.map((input) => {
        const { id, label, validationOptions, slotProps, placeholder, imageSrc, width = "full", borderType = "round" } = input;
        return (
          <Box className={`${styles.inputBox} ${styles[width]}`} key={id}>
            <InputLabel className={styles.inputLabel} htmlFor={id}>
              {label}
            </InputLabel>
            <Controller
              name={id}
              control={control}
              rules={validationOptions}
              render={({ field: { ref, ...field } }) => {
                return (
                  <InputUnstyled
                    id={id}
                    className={`${styles.input} ${styles[borderType]}`}
                    slotProps={slotProps}
                    placeholder={placeholder}
                    inputRef={ref}
                    {...field}
                  />
                );
              }}
            />
            {imageSrc && <Box className={styles.inputImage} component="img" src={imageSrc} />}
            <ErrorMessage
              errors={errors}
              name={id}
              render={({ message }) => {
                return (
                  <Box className={styles.inputErrorBox}>
                    <ExclamationCircleIcon className={styles.inputErrorIcon} />
                    <Typography className={styles.inputErrorMessage} variant="inherit">
                      {message}
                    </Typography>
                  </Box>
                );
              }}
            />
          </Box>
        );
      });
    }
  };

  const renderDialogActions = () => {
    if (actionList) {
      return actionList.map((action) => {
        const { id, type = "positive", text, handleClick } = action;
        return (
          <Button key={id} id={id} className={`${styles.action} ${styles[type]}`} onClick={handleClick} disableFocusRipple={true}>
            {text}
          </Button>
        );
      });
    }
  };

  return (
    <DialogMUI className={styles.dialog} open={open} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
      <DialogContent className={styles.dialogContent}>{renderDialogContent()}</DialogContent>
      <DialogActions className={styles.dialogActions}>{renderDialogActions()}</DialogActions>
    </DialogMUI>
  );
};

export default Dialog;
