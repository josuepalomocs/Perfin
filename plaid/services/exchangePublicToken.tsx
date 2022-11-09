import axios from 'axios';

const exchangePublicToken = async(publicToken: string) => {
  const response = await axios.post<{ access_token: string, item_id: string }>('http://localhost:3000/api/exchange_public_token', { publicToken });
  const accessToken = response.data.access_token
  const itemId = response.data.item_id;
  return { accessToken, itemId };
}

export default exchangePublicToken;