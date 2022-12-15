import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import auth from "../../../lib/firebase/client-auth";
import { useRouter } from "next/router";

interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const useRegister = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    setIsRedirecting(true);
    router.push("/");
  };

  const handleRegisterWithCredentials = ({ email, firstName, lastName, password, confirmPassword }: RegisterData) => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          if (errorMessage) {
            setErrorMessage("");
          }
          updateProfile(user, { displayName: `${firstName} ${lastName}` }).catch((error) => {
            throw error;
          });
          handleRedirect();
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
            case "auth/email-already-in-use":
              setErrorMessage("The email provided is associated with an existing account");
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

  return { errorMessage, isRedirecting, handleRegisterWithCredentials, handleRegisterWithGooglePopup };
};

export default useRegister;
