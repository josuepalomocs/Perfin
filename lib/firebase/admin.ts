import admin from "firebase-admin";
import { auth } from "firebase-admin";
import { getApp } from "firebase-admin/app";

const serviceAccount = require("./serviceAccountKey.json");

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://perfin-b4307-default-rtdb.firebaseio.com",
};

const appName = "perfin";

if (admin.apps.length === 0) {
  admin.initializeApp(firebaseConfig, appName);
}

const app = getApp("perfin");
const adminAuth = auth(app);

export default adminAuth;
