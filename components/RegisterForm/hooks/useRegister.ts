import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../../lib/firebase/auth";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterWithCredentials = ({ email, firstName, lastName, password, confirmPassword }: RegisterData) => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      createUserWithEmailAndPassword(auth, email, password).catch((error) => {
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
    }
  };

  const handleRegisterWithGooglePopup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const { code, message, customData } = error;
        const { email } = customData;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return { errorMessage, handleRegisterWithCredentials, handleRegisterWithGooglePopup };
};

export default useRegister;
