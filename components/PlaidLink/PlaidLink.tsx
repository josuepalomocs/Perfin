import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess, 
	PlaidLinkOnSuccessMetadata, PlaidLinkOnExit, PlaidLinkOnExitMetadata,
	PlaidLinkError, PlaidLinkOnEvent, PlaidLinkStableEvent,
  PlaidLinkOnEventMetadata } from 'react-plaid-link';
import exchangePublicToken from '../../plaid/services/exchangePublicToken';
import transactionsSync from '../../plaid/services/transactionsSync';

interface PlaidLinkProps {
  linkToken: string | null,
}

const PlaidLink = ({ linkToken } : PlaidLinkProps) => {
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      const { accessToken, itemId } = await exchangePublicToken(public_token);
      const response = await transactionsSync(accessToken);
      console.log(response);
    }, []
  );
  
  const onExit = useCallback<PlaidLinkOnExit>(
    (error: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
      // log and save error and metadata
      // handle invalid link token
      if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
        // generate new link token
      }
      // to handle other error codes, see https://plaid.com/docs/errors/
    }, []
  );
  
  const onEvent = useCallback<PlaidLinkOnEvent>(
    (
      eventName: PlaidLinkStableEvent | string,
      metadata: PlaidLinkOnEventMetadata,
    ) => {
      // log eventName and metadata
      console.log(`Event Name: ${eventName}\n
        Metadata: ${metadata}`);
    }, []
  );
  
  const { ready, open, exit } = usePlaidLink({
    onSuccess,
    onExit,
    onEvent,
    token: linkToken,
  });

  useEffect(() => {
    if(linkToken) {
      console.log('Link token available...');
      if(ready) {
        console.log('Plaid Link is ready...');
        open();
      }
    }
  }, [linkToken, ready]);

  return (
    <></>  
  );
}

export default PlaidLink;