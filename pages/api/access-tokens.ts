import { NextApiRequest, NextApiResponse } from "next";
import { ItemPublicTokenExchangeRequest } from "plaid";
import { isAuthorizedRequest } from "../../server/auth";
import plaidClient from "../../plaid/config";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../lib/firebase/client";
import { firebaseAuthManager } from "../../auth";
import { adminAuth as auth } from "../../lib/firebase/admin";
import { getCookie } from "cookies-next";
import { idID } from "@mui/material/locale";
import { access } from "fs";

const storeAccessToken = async (uid: string, access_token: string, item_id: string) => {
  const docRef = await addDoc(collection(firestore, "access_tokens"), {
    uid,
    access_token,
    item_id,
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authToken = getCookie("authToken", { req, res });
  if (!authToken) {
    return res.status(401).json({ error: { code: 401, name: "Unauthorized", message: "Client request auth token not found" } });
  }

  const decodedIdToken = await auth
    .verifyIdToken(authToken.toString())
    .then((decodedIdToken) => {
      return decodedIdToken;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  if (!decodedIdToken) {
    return res.status(401).json({ error: { code: 401, name: "Unauthorized", message: "Client request auth token is invalid" } });
  }

  if (req.method === "POST") {
    const { data: itemPublicTokenExchangeRequest }: { data: ItemPublicTokenExchangeRequest } = req.body;
    return await plaidClient
      .itemPublicTokenExchange(itemPublicTokenExchangeRequest)
      .then(({ data }) => {
        storeAccessToken(decodedIdToken.uid, data.access_token, data.item_id);
        return res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: { code: 500, name: "Internal server error", message: "Failed to exchange Plaid public token for access token" } });
      });
  }

  return res.status(500).json({ error: { code: 501, name: "Not implemented", message: "Request method not implemented" } });
};

export default handler;
