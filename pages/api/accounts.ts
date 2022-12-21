import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth as auth } from "../../lib/firebase/admin";

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
};

export default handler;
