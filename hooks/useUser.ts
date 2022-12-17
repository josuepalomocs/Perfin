import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import Cookies from "js-cookie";

const useUser = (): [User | null, Dispatch<SetStateAction<User | null>>] => {
  const [user, setUser] = useState<User | null>(null);

  const setAuthCookie = async (user: User) => {
    const token = await user.getIdToken();
    Cookies.set("firebaseToken", token);
  };

  const deleteAuthCookie = async () => {
    Cookies.remove("firebaseToken");
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
