import { User } from "firebase/auth";
import { CountryCode, LinkTokenCreateRequest, LinkTokenCreateResponse, Products } from "plaid";
import HttpClient from "./HttpClient";

interface LinkToken {
  id: string;
  value: string;
  expirationDate: string;
  bearerUid: string;
}

class PerfinClient extends HttpClient {
  private readonly _uid: string;
  private _idToken: string;

  private constructor(uid: string, idToken: string) {
    super("http://localhost:3000");
    this._uid = uid;
    this._idToken = idToken;
  }

  public static async CreatePerfinClient(user: User) {
    const idToken = await user.getIdToken();
    return new PerfinClient(user.uid, idToken);
  }

  public async createLinkToken() {
    const apiEndpoint = "/api/link-tokens";
    const data: LinkTokenCreateRequest = {
      user: {
        client_user_id: this._uid,
      },
      client_name: "Perfin",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    };
    const config = {
      headers: {
        Authorization: `Bearer ${this._idToken}`,
      },
    };

    const linkToken = await this.createResource<LinkToken>(apiEndpoint, data, config);
    return linkToken;
  }

  public async getLinkToken() {
    const apiEndpoint = "/api/link-tokens";
    const config = {
      headers: {
        Authorization: `Bearer ${this._idToken}`,
      },
    };

    const linkToken = await this.getResource<LinkToken>(apiEndpoint, config);
    return linkToken;
  }

  public async deleteLinkToken() {
    const apiEndpoint = "/api/link-tokens";
    const config = {
      headers: {
        Authorization: `Bearer ${this._idToken}`,
      },
    };

    const response = await this.deleteResource(apiEndpoint, config);
    return response;
  }
}

export default PerfinClient;
