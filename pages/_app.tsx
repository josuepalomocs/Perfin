import React from "react";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import UserContext from "../context/UserContext";
import useUser from "../hooks/useUser";
import "../styles/globals.css";
import usePlaidAccessTokenList from "../hooks/usePlaidAccessTokenList";

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useUser();
  const {} = usePlaidAccessTokenList();

  console.log(`Value of user at app level: ${user}`);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </UserContext.Provider>
  );
};

export default App;
