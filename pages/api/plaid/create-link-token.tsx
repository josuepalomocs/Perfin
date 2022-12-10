import { NextApiRequest, NextApiResponse } from "next";
import { CountryCode, LinkTokenCreateRequest, Products } from "plaid";
import plaidClient from "../../../plaid/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: "user_id",
    },
    client_name: "Perfin",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
  };
  try {
    const { data } = await plaidClient.linkTokenCreate(request);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;
