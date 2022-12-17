import { NextApiRequest, NextApiResponse } from "next";
import { LinkTokenCreateRequest } from "plaid";
import plaidClient from "../../../plaid/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { data: linkTokenCreateRequest }: { data: LinkTokenCreateRequest } = req.body;

    return await plaidClient
      .linkTokenCreate(linkTokenCreateRequest)
      .then(({ data }) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json({ error, message: "Unknown server error", detail: "Failed to create a Plaid Link token" });
      });
  }
  return res.status(500).json({ error: "Unsupported request method", message: `Request method \"${req.method}\" not supported` });
};

export default handler;
