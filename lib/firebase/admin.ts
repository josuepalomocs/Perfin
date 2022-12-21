import { apps, auth, credential } from "firebase-admin";
import { getApp, initializeApp } from "firebase-admin/app";

const serviceAccount = require("./serviceAccountKey.json");

const firebaseConfig = {
  credential: credential.cert(serviceAccount),
  databaseURL: "https://perfin-b4307-default-rtdb.firebaseio.com",
};

const appName = "perfin";

if (apps.length === 0) {
  initializeApp(firebaseConfig, appName);
}

const app = getApp("perfin");
export const adminAuth = auth(app);
