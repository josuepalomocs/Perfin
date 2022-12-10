import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import getEnvironmentVariable from "../env/getEnvironmentVariable";

const PLAID_ENV = getEnvironmentVariable("PLAID_ENV");
const PLAID_CLIENT_ID = getEnvironmentVariable("PLAID_CLIENT_ID");
const PLAID_SECRET = getEnvironmentVariable("PLAID_SECRET");
const PLAID_VERSION = getEnvironmentVariable("PLAID_VERSION");

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": PLAID_VERSION,
    },
  },
});

const client = new PlaidApi(configuration);

export default client;
