import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import auth from "../../../firebase";

interface LoginCredentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginWithEmailAndPassword = ({ email, password }: LoginCredentials) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const { code, message } = error;
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

  return { errorMessage, handleLoginWithEmailAndPassword, handleLoginWithGooglePopup };
};

export default useLogin;
