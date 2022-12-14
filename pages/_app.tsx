import React from "react";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import UserContext from "../context/UserContext";
import useUser from "../hooks/useUser";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useUser();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </UserContext.Provider>
  );
};

export default App;
