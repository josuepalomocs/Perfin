import { NextApiRequest, NextApiResponse } from "next";
import { ItemPublicTokenExchangeRequest } from "plaid";
import plaidClient from "../../../plaid/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { public_token } = req.body;
  const request: ItemPublicTokenExchangeRequest = {
    public_token,
  };
  try {
    const { data } = await plaidClient.itemPublicTokenExchange(request);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export default handler;
