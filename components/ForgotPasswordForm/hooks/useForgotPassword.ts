import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../../lib/firebase/client";

const useForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setErrorMessage("");
        setSuccessMessage("An email has been sent to your inbox with a reset password link ");
      })
      .catch((error) => {
        const { code } = error;
        switch (code) {
          case "auth/user-not-found":
            setErrorMessage("The email/password combination provided does not match an account");
            break;
          case "auth/invalid-email":
            setErrorMessage("The email provided is not valid");
            break;
          default:
            setErrorMessage(`Unknown error: ${code}`);
            break;
        }
      });
  };

  return { errorMessage, successMessage, handleResetPassword };
};

export default useForgotPassword;
