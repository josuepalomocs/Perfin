import axios from "axios";

const exchangePublicToken = async (publicToken: string) => {
  const response = await axios.post<{ access_token: string; item_id: string }>("api/plaid/exchange-public-token", { publicToken });
  const accessToken = response.data.access_token;
  const itemId = response.data.item_id;
  return { accessToken, itemId };
};

export default exchangePublicToken;
