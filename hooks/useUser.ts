import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { setCookie, deleteCookie } from "cookies-next";
import PerfinClient from "../client/api/PerfinClient";

const useUser = (): [User | null, Dispatch<SetStateAction<User | null>>] => {
  const [user, setUser] = useState<User | null>(null);
  const [perfinClient, setPerfinClient] = useState<PerfinClient | null>(null);

  useEffect(() => {
    const createPerfinClient = async (user: User) => {
      const perfinClient = await PerfinClient.CreatePerfinClient(user);
      const linkToken = await perfinClient.createLinkToken();
      console.log(linkToken);
    };

    auth.onAuthStateChanged((user) => {
      if (!user) {
        return setUser(null);
      }
      if (!perfinClient) {
        createPerfinClient(user);
      }
    });
  }, []);

  return [user, setUser];
};

export default useUser;
