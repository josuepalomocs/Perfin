import { NextApiRequest, NextApiResponse } from "next";
import { authorizeRequest } from "../../server/auth/services";
import { LinkTokenCreateRequest } from "plaid";
import plaidClient from "../../plaid/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return authorizeRequest(req, res, (uid) => {
    console.log(`The uid is: ${uid}`);
    if (req.method === "POST") {
      const { data: request }: { data: LinkTokenCreateRequest } = req.body;
      return plaidClient
        .linkTokenCreate(request)
        .then(({ data }) => {
          return res.status(200).json({ linkToken: data.link_token });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: { code: 500, name: "Internal server error", message: "Failed to create Plaid Link token" } });
        });
    }
  });
};

export default handler;
