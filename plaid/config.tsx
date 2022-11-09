import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const PLAID_ENV = process.env.PLAID_ENV as string;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID as string;
const PLAID_SECRET = process.env.PLAID_SECRET as string;

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const client = new PlaidApi(configuration);

export default client;