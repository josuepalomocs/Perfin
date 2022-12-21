import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { setCookie, deleteCookie } from "cookies-next";

const useUser = (): [User | null, Dispatch<SetStateAction<User | null>>] => {
  const [user, setUser] = useState<User | null>(null);

  const setAuthCookie = async (user: User) => {
    const token = await user.getIdToken();
    setCookie("authToken", token);
  };

  const deleteAuthCookie = async () => {
    deleteCookie("firebaseToken");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        deleteAuthCookie();
      } else {
        setUser(user);
        setAuthCookie(user);
      }
    });
    auth.onIdTokenChanged((user) => {
      if (user) {
        setAuthCookie(user);
      }
    });
  }, []);

  return [user, setUser];
};

export default useUser;
