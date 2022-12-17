import { NextApiRequest, NextApiResponse } from "next";
import { ItemPublicTokenExchangeRequest } from "plaid";
import plaidClient from "../../../plaid/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data: itemPublicTokenExchangeRequest }: { data: ItemPublicTokenExchangeRequest } = req.body;

    return await plaidClient
      .itemPublicTokenExchange(itemPublicTokenExchangeRequest)
      .then(({ data }) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({ error, message: "Unknown server error", detail: "Failed to exchange Plaid public token for access token" });
      });
  }
  return res.status(500).json({ error: "Unsupported request method", message: `Request method \"${req.method}\" not supported` });
};

export default handler;
