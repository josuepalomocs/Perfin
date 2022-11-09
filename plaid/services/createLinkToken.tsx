import axios from 'axios';
import { LinkTokenCreateResponse } from 'plaid';

const createLinkToken = async() => {
  const response = await axios.get<LinkTokenCreateResponse>('api/create_link_token');
  return response.data.link_token;
}

export default createLinkToken;