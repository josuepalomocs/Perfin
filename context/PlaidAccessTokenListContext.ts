import React from "react";

interface PlaidAccessTokenListContext {
  plaidAccessTokenList: string[] | null;
  setPlaidAccessTokenList: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const PlaidAccessTokenListContextDefaultValue = {
  plaidAccessTokenList: null,
  setPlaidAccessTokenList: () => {},
};

const PlaidAccessTokenListContext = React.createContext<PlaidAccessTokenListContext>(PlaidAccessTokenListContextDefaultValue);

export default PlaidAccessTokenListContext;
