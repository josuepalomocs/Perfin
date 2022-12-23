import axios from "axios";
import { User } from "firebase/auth";
import { CountryCode, ItemPublicTokenExchangeRequest, ItemPublicTokenExchangeResponse, LinkTokenCreateRequest, LinkTokenCreateResponse, Products } from "plaid";
import { postLinkToken } from "../api";

export const createLinkToken = async (user: User) => {
  const request: LinkTokenCreateRequest = {
    user: {
      client_user_id: user.uid,
    },
    client_name: "Perfin",
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: "en",
  };

  return await postLinkToken(request, user);
};

export const exchangePublicTokenForItem = async (publicToken: string) => {
  const request: ItemPublicTokenExchangeRequest = {
    public_token: publicToken,
  };

  return await axios
    .post<ItemPublicTokenExchangeResponse>("/api/items", { data: request })
    .then(({ data }) => {
      return data;
    })
    .catch(() => {});
};
