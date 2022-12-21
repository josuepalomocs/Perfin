import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuthManager } from "../auth";

export const isAuthorizedRequest = (req: NextApiRequest) => {
  // get auth token from request header
  const authToken = getCookie("authToken", { req });
  if (!authToken) {
    return false;
  }

  // verify auth token via firebase-admin auth service
  const decodedIdToken = firebaseAuthManager.verifyIdToken(authToken.toString());
  if (!decodedIdToken) {
    return false;
  }

  return true;
};
