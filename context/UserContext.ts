import { User } from "firebase/auth";
import React from "react";

interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContextDefaultValue = {
  user: null,
  setUser: () => {},
};

const UserContext = React.createContext<UserContext>(UserContextDefaultValue);

export default UserContext;
