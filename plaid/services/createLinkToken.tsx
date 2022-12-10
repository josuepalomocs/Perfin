import axios from "axios";
import { LinkTokenCreateResponse } from "plaid";

const createLinkToken = async () => {
  const response = await axios.get<LinkTokenCreateResponse>("api/plaid/create-link-token");
  return response.data.link_token;
};

export default createLinkToken;
