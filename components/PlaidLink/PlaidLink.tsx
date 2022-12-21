import { ButtonUnstyled } from "@mui/base";
import axios from "axios";
import { CountryCode, ItemPublicTokenExchangeRequest, ItemPublicTokenExchangeResponse, LinkTokenCreateRequest, LinkTokenCreateResponse, Products } from "plaid";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  PlaidLinkError,
  PlaidLinkOnEvent,
  PlaidLinkOnEventMetadata,
  PlaidLinkOnExit,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkStableEvent,
  usePlaidLink,
} from "react-plaid-link";
import UserContext from "../../context/UserContext";
import styles from "./styles/plaidLink.module.css";

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState("");
  const { user } = useContext(UserContext);

  const createLinkToken = async () => {
    const linkTokenCreateRequest: LinkTokenCreateRequest = {
      user: {
        client_user_id: user!.uid,
      },
      client_name: "Perfin",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    };
    await axios
      .post<LinkTokenCreateResponse>("/api/plaid/link-tokens", { data: linkTokenCreateRequest })
      .then(({ data: { link_token } }) => {
        setLinkToken(link_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exchangePublicTokenForAccessToken = async (public_token: string) => {
    const itemPublicTokenExchangeRequest: ItemPublicTokenExchangeRequest = {
      public_token,
    };
    await axios
      .post<ItemPublicTokenExchangeResponse>("/api/plaid/access-tokens", { data: itemPublicTokenExchangeRequest })
      .then(async ({ data: { access_token, item_id } }) => {
        console.log(`Generated access token: ${access_token} , with item id: ${item_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    await exchangePublicTokenForAccessToken(public_token);
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>(async (error: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
    if (error) {
      switch (error.error_code) {
        case "INVALID_LINK_TOKEN":
          setLinkToken("");
          await createLinkToken();
      }
    }
  }, []);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName: PlaidLinkStableEvent | string, metadata: PlaidLinkOnEventMetadata) => {
    console.log(`Event Name: ${eventName}\n
        Metadata: ${metadata}`);
  }, []);

  const { ready, open } = usePlaidLink({
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
