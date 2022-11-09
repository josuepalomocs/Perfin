import axios from 'axios';

const transactionSync = async(accessToken: string) => {
  const response = await axios.post('api/transactions_sync', { accessToken });
  return response.data;
}

export default transactionSync;