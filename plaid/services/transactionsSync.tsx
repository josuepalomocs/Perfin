import axios from "axios";

const transactionSync = async (accessToken: string) => {
  const response = await axios.post("api/plaid/transactions-sync", { accessToken });
  return response.data;
};

export default transactionSync;
