import { User } from "firebase/auth";
import { PerfinRequestCredential } from "../types";

const getPerfinRequestCredential = async (user: User) => {
  try {
    const idToken = await user.getIdToken();
    const uid = user.uid;
    const perfinRequestCredential: PerfinRequestCredential = {
      idToken,
      uid,
    };
    return perfinRequestCredential;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getPerfinRequestCredential;
