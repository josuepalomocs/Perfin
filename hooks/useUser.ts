import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import auth from "../firebase";

const useUser = (): [User | null, Dispatch<SetStateAction<User | null>>] => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const setAuthCookie = async (user: User) => {
    const token = await user.getIdToken();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        return;
      }
      setUser(user);
      setAuthCookie(user);
    });
  }, []);

  return [user, setUser];
};

export default useUser;
