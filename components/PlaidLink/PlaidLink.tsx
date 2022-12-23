import { ButtonUnstyled } from "@mui/base";
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
import apiClient from "../../client/api/index";
import { createLinkToken, exchangePublicTokenForItem } from "../../client/plaid/services";
import UserContext from "../../context/UserContext";
import styles from "./styles/plaidLink.module.css";

export type LinkToken = string | null;

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState<LinkToken>(null);
  const { user } = useContext(UserContext);

  const handleLaunchPlaidLink = async () => {
    if (user) {
      const idToken = await user.getIdToken();
      const uid = user.uid;
      const perfinApiUser = {
        idToken,
        uid,
      };
      try {
        const linkToken = await apiClient.createLinkToken(perfinApiUser);
        console.log(linkToken);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    const item = await exchangePublicTokenForItem(public_token);
    console.log(item);
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>(async (error: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
    if (error) {
      console.log(error);
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
    <ButtonUnstyled id="initPlaidLink" className={styles.button} onClick={handleLaunchPlaidLink}>
      Link Account
    </ButtonUnstyled>
  );
};

export default PlaidLink;
