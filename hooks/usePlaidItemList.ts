import { useState, useEffect } from "react";
import axios from "axios";
import { Item, ItemGetRequest } from "plaid";
import { getEnvironmentData } from "worker_threads";

const PLAID_HOSTNAME = getEnvironmentData("PLAID_HOSTNAME");

const usePlaidItemList = () => {
  const [itemList, setItemList] = useState<Item[] | null>(null);
  const access_token = "placeholder";

  useEffect(() => {
    const getItemList = async () => {
      const apiEndpoint = `${PLAID_HOSTNAME}/api/plaid/item/get`;
      const request: ItemGetRequest = {
        access_token,
      };
      const { data } = await axios.get(apiEndpoint);
    };

    getItemList();
  }, [itemList]);

  return { itemList };
};

export default usePlaidItemList;
