import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth as auth } from "../../lib/firebase/admin";

export type OnAuthorized = (req: NextApiRequest, res: NextApiResponse, uid: string) => void;
export type OnUnauthorized = (res: NextApiResponse) => void;

export const authorizeRequest = async (req: NextApiRequest, res: NextApiResponse, onAuthorized: OnAuthorized, onUnauthorized: OnUnauthorized) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return onUnauthorized(res);
  }
  try {
    const decodedIdToken = await auth.verifyIdToken(authToken);
    return onAuthorized(req, res, decodedIdToken.uid);
  } catch (error) {
    console.log(error);
    return onUnauthorized(res);
  }
};
