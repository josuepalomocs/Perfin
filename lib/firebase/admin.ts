import { initializeApp } from "firebase-admin/app";
import { applicationDefault } from "firebase-admin/lib/app/credential-factory";
import getEnvironmentVariable from "../../env/getEnvironmentVariable";

const GOOGLE_APPLICATION_CREDENTIALS = getEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
import serviceAccount from GOOGLE_APPLICATION_CREDENTIALS;

const defaultApp = initializeApp({ credential: applicationDefault() });

const defaultAuth = getAuth(defaultApp);
