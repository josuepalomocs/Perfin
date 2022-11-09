import plaidClient from '../../plaid/config';
import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid';
import { NextApiRequest, NextApiResponse } from 'next';

// const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const request: LinkTokenCreateRequest = {
		user: {
			client_user_id: 'user-id',
		},
		client_name: 'Perfin',
    products: [Products.Transactions],
		country_codes: [CountryCode.Us],
		language: 'en',
	}
	try {
		const { data } = await plaidClient.linkTokenCreate(request);
    res.status(200).json(data);
	} catch (error) {
		console.log(error);
    res.status(400).json(error);
	}
}

export default handler;