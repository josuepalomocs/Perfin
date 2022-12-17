import { NextApiRequest, NextApiResponse } from "next";
import { AccountBase, AccountsGetRequest } from "plaid";
import plaidClient from "../../../plaid/config";

const getItemAccountsList = async (accountsGetRequestList: AccountsGetRequest[]) => {
  let itemAccountsList: AccountBase[] = [];

  for (let i = 0; i < accountsGetRequestList.length; i++) {
    const itemAccountList = await plaidClient
      .accountsGet(accountsGetRequestList[i])
      .then(({ data: { accounts } }) => {
        return accounts;
      })
      .catch((error) => {
        return [];
      });
    if (itemAccountList.length) {
      itemAccountsList.push(itemAccountList[i]);
    }
  }
  return itemAccountsList;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data: accountsGetRequestList }: { data: AccountsGetRequest[] } = req.body;

    return await getItemAccountsList(accountsGetRequestList).then((data) => {
      console.log(data);
      return res.status(200).json(data);
    });
  }
  return res.status(500).json({ error: "Unsupported request method", message: `Request method \"${req.method}\" not supported` });
};

export default handler;
