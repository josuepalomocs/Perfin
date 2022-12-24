import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { ItemPublicTokenExchangeRequest } from "plaid";
import { adminAuth as auth } from "../../lib/firebase/admin";
import plaidClient from "../../plaid/config";
import { getItemListByUid } from "../../server/api";
import { createItem } from "../../server/database/services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authToken = getCookie("authToken", { req });
  if (authToken) {
    return auth
      .verifyIdToken(authToken.toString())
      .then(async ({ uid }) => {
        if (req.method === "GET") {
          const itemList = await getItemListByUid(uid);
          return res.status(200).json(itemList);
        }

        if (req.method === "POST") {
          const { data: request }: { data: ItemPublicTokenExchangeRequest } = req.body;
          return await plaidClient
            .itemPublicTokenExchange(request)
            .then(async ({ data }) => {
              const item = await createItem({ itemId: data.item_id, accessToken: data.access_token, uid });
              return res.status(200).json(item);
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).json({ error: { code: 500, name: "Internal server error", message: "Failed to create Plaid item" } });
            });
        }

        return res.status(501).json({ error: { code: 501, name: "Not implemented", message: "Request method not implemented" } });
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({ error: { code: 501, name: "Unauthorized", message: "Invalid request auth token" } });
      });
  }

  return res.status(501).json({ error: { code: 501, name: "Not implemented", message: "Missing request auth token" } });
};

export default handler;
