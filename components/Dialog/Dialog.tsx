import React from "react";
import { Controller } from "react-hook-form";
import { Dialog as DialogMUI, DialogTitle, DialogContent, Typography, DialogActions, Box, InputLabel, Button } from "@mui/material";
import { InputUnstyled } from "@mui/base";
import { Dialog as DialogProps } from "../../types/dialog";
import styles from "./styles/dialog.module.css";

const Dialog = ({ open = false, handleClose, type = "prompt", title, message, inputList, actionList, control }: DialogProps) => {
  const renderDialogContent = () => {
    if (type === "prompt") {
      return <Typography className={styles.dialogContentMessage}>{message}</Typography>;
    }
    if (type === "form" && inputList) {
      return inputList.map((input) => {
        const { id, label, slotProps, placeholder, imageSrc, width = "full", borderType = "round" } = input;
        return (
          <Box className={`${styles.inputBox} ${styles[width]}`} key={id}>
            <InputLabel className={styles.inputLabel} htmlFor={id}>
              {label}
            </InputLabel>
            <Controller
              name={id}
              control={control}
              render={({ field }) => {
                return <InputUnstyled {...field} id={id} className={`${styles.input} ${styles[borderType]}`} slotProps={slotProps} placeholder={placeholder} />;
              }}
            />
            {imageSrc && <Box className={styles.inputImage} component="img" src={imageSrc} />}
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
