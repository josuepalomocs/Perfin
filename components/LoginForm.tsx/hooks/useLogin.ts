import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../../lib/firebase/client";

interface LoginCredentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    setIsRedirecting(true);
    router.push("/");
  };

  const handleLoginWithEmailAndPassword = ({ email, password }: LoginCredentials) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (errorMessage) {
          setErrorMessage("");
        }
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
          default:
            setErrorMessage(`Unknown error: ${code}`);
            break;
        }
      });
  };

  const handleLoginWithGooglePopup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(handleRedirect)
      .catch((error) => {
        const { code, message, customData } = error;
        const { email } = customData;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return { errorMessage, isRedirecting, handleLoginWithEmailAndPassword, handleLoginWithGooglePopup };
};

export default useLogin;
