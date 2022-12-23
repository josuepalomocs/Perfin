import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { setCookie, deleteCookie } from "cookies-next";

const useUser = (): [User | null, Dispatch<SetStateAction<User | null>>] => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });
  }, []);

  return [user, setUser];
};

export default useUser;
