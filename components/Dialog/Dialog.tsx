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
        const { id, label, slotProps, placeholder, imageSrc } = input;
        return (
          <Box className={styles.inputBox} key={id}>
            <InputLabel className={styles.inputLabel} htmlFor={id}>
              {label}
            </InputLabel>
            <Controller
              name={id}
              control={control}
              render={({ field }) => {
                return <InputUnstyled {...field} id={id} className={styles.input} slotProps={slotProps} placeholder={placeholder} />;
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
        return (
          <Button key={action.id} id={action.id} className={styles.actionButton} onClick={action.handleClick}>
            {action.text}
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
