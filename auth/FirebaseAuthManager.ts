import { adminAuth } from "../lib/firebase/admin";

class FirebaseAuthManager {
  getUser(uid: string) {
    return adminAuth
      .getUser(uid)
      .then((userRecord) => {
        return userRecord;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  verifyIdToken(token: string) {
    return adminAuth
      .verifyIdToken(token)
      .then((decodedToken) => {
        return decodedToken;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}

export default FirebaseAuthManager;
