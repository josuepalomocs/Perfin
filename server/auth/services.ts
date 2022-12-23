import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth as auth } from "../../lib/firebase/admin";

// export type RequestAuthMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => any) => any;

export const authorizeRequest = async (req: NextApiRequest, res: NextApiResponse, requestHandler: (uid: string) => void) => {
  const authToken = req.headers.authorization;
  console.log(authToken);
  if (authToken) {
    return auth
      .verifyIdToken(authToken.toString())
      .then(async ({ uid }) => {
        // request is authorized
        return requestHandler(uid);
      })
      .catch((error) => {
        // request is not authorized
        console.log(error);
        return res.status(401).json({ error: { code: 401, name: "Unauthorized", message: "Invalid request authentication token" } });
      });
  }

  return res.status(401).json({ error: { code: 401, name: "Unauthorized", message: "Missing request authentication token" } });
};
