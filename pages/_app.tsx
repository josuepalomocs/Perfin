import React, { useState } from "react";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import "../styles/globals.css";

type PlaidAccessToken = string;

interface PlaidContext {
  accessTokenList: PlaidAccessToken[] | [];
  setAccessTokenList: React.Dispatch<React.SetStateAction<PlaidAccessToken[]>>;
}

const PlaidContextDefaultValue = {
  accessTokenList: [],
  setAccessTokenList: () => {},
};

export const PlaidContext = React.createContext<PlaidContext>(PlaidContextDefaultValue);

const App = ({ Component, pageProps }: AppProps) => {
  const [accessTokenList, setAccessTokenList] = useState<PlaidAccessToken[]>([]);

  return (
    <PlaidContext.Provider value={{ accessTokenList, setAccessTokenList }}>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </PlaidContext.Provider>
  );
};

export default App;
