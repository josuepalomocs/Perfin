import React, { useCallback, useContext, useEffect, useState } from "react";
import { ButtonUnstyled } from "@mui/base";
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOnExit,
  PlaidLinkOnExitMetadata,
  PlaidLinkError,
  PlaidLinkOnEvent,
  PlaidLinkStableEvent,
  PlaidLinkOnEventMetadata,
} from "react-plaid-link";
import axios from "axios";
import styles from "./styles/plaidLink.module.css";
import { ItemPublicTokenExchangeResponse, LinkTokenCreateResponse } from "plaid";
import { PlaidContext } from "../../pages/_app";

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState("");
  const { accessTokenList, setAccessTokenList } = useContext(PlaidContext);

  const createLinkToken = async () => {
    const { data } = await axios.get<LinkTokenCreateResponse>("/api/plaid/create-link-token");
    const { link_token } = data;
    setLinkToken(link_token);
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    const { data } = await axios.post<ItemPublicTokenExchangeResponse>("/api/plaid/exchange-public-token", { public_token });
    const { access_token } = data;
    setAccessTokenList(accessTokenList.length === 0 ? [access_token] : [...accessTokenList, access_token]);
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>((error: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
    console.log("Exited");
    if (error != null && error.error_code === "INVALID_LINK_TOKEN") {
      createLinkToken();
    }
  }, []);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName: PlaidLinkStableEvent | string, metadata: PlaidLinkOnEventMetadata) => {
    console.log(`Event Name: ${eventName}\n
        Metadata: ${metadata}`);
  }, []);

  const { ready, open, error } = usePlaidLink({
    onSuccess,
    onExit,
    onEvent,
    token: linkToken,
  });

  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready]);

  return (
    <ButtonUnstyled id="initPlaidLink" className={styles.button} onClick={createLinkToken}>
      Link Account
    </ButtonUnstyled>
  );
};

export default PlaidLink;
