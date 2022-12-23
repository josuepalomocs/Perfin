import { CountryCode, LinkTokenCreateRequest, LinkTokenCreateResponse, Products } from "plaid";
import HttpClient from "./HttpClient";

interface LinkToken {
  id: string;
  value: string;
  expirationDate: string;
  bearerUid: string;
}

interface PerfinApiUser {
  idToken: string;
  uid: string;
}

class PerfinClient extends HttpClient {
  public constructor() {
    super("http://localhost:3000");
  }

  public async createLinkToken(user: PerfinApiUser) {
    const apiEndpoint = "/api/link-tokens";
    const data: LinkTokenCreateRequest = {
      user: {
        client_user_id: user.uid,
      },
      client_name: "Perfin",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    };

    const linkToken = await this.createResource<LinkToken>(apiEndpoint, data, config);
    return linkToken;
  }

  public async getLinkToken(user: { uid: string; idToken: string }) {
    const apiEndpoint = "/api/link-tokens";
    const config = {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    };

    const linkToken = await this.getResource<LinkToken>(apiEndpoint, config);
    return linkToken;
  }

  public async deleteLinkToken(user: { uid: string; idToken: string }) {
    const apiEndpoint = "/api/link-tokens";
    const config = {
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    };

    const response = await this.deleteResource(apiEndpoint, config);
    return response;
  }
}

export default PerfinClient;
