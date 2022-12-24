import { NextApiRequest, NextApiResponse } from "next";
import { LinkTokenCreateRequest } from "plaid";
import { authorizeRequest } from "../../server/auth/services";
import plaidClient from "../../plaid/config";
import database from "../../server/database";

const linkTokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await authorizeRequest(req, res, onAuthorized, onUnauthorized);
};

const onAuthorized = async (req: NextApiRequest, res: NextApiResponse, uid: string) => {
  if (req.method === "POST") {
    const request: LinkTokenCreateRequest = req.body;
    try {
      const { data } = await plaidClient.linkTokenCreate(request);
      const linkToken = await database.createLinkToken({ value: data.link_token, expirationDate: data.expiration, uid });
      return res.status(200).json(linkToken);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: { code: 500, name: "Internal server error", message: "Failed to create Plaid Link token" } });
    }
  }

  return res.status(500).json({ error: { code: 405, name: "Method not allowed", message: "Request method not supported" } });
};

const onUnauthorized = (res: NextApiResponse) => {
  return res.status(401).json({ error: { code: 401, name: "Unauthorized", message: "Request is not authorized access to the requested resource" } });
};

export default linkTokenHandler;
