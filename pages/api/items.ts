import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth as auth } from "../../lib/firebase/admin";
import { getItemListByUid, postItem, postItemParameters } from "../../server/api";

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
          const { data }: { data: postItemParameters } = req.body;
          const item = await postItem(data);
          return res.status(200).json(item);
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
