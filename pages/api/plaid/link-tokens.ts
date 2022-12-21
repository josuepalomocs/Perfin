import { NextApiRequest, NextApiResponse } from "next";
import { LinkTokenCreateRequest } from "plaid";
import { isAuthorizedRequest } from "../../../server/auth";
import plaidClient from "../../../plaid/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isAuthorizedRequest(req)) {
    return res.status(401).json({ error: { code: 401, name: "Unauthorized", message: "Client not authorized access to requested resource" } });
  }

  if (req.method === "POST") {
    const { data: linkTokenCreateRequest }: { data: LinkTokenCreateRequest } = req.body;
    return await plaidClient
      .linkTokenCreate(linkTokenCreateRequest)
      .then(({ data }) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: { code: 500, name: "Internal server error", message: "Failed to create Plaid Link token" } });
      });
  }

  return res.status(500).json({ error: { code: 501, name: "Not implemented", message: "Request method not implemented" } });
};

export default handler;
