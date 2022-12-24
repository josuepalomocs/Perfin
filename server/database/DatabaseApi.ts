import NodePostgres from "./NodePostgres";

export interface LinkToken {
  id: string;
  value: string;
  expirationDate: string;
  uid: string;
}

export interface LinkTokenQueryArguments extends Omit<LinkToken, "id"> {}

class DatabaseApi extends NodePostgres {
  public constructor() {
    super();
  }

  public createLinkToken = async (linkTokenQueryArguments: LinkTokenQueryArguments) => {
    const { value, expirationDate, uid } = linkTokenQueryArguments;
    const query = `INSERT INTO link_token(
        value, expiration_date, uid
      ) VALUES (
        $1, $2, $3
      ) RETURNING
        value AS "linkToken", expiration_date AS "expirationDate"
      `;
    const result = await this.queryDatabase<LinkToken>(query, [value, expirationDate, uid]);
    return result ? result.rows[0] : null;
  };

  public getLinkToken = async (linkTokenQueryArguments: Omit<LinkToken, "id">) => {
    const { value, expirationDate, uid } = linkTokenQueryArguments;
    const query = `INSERT INTO link_token(
        value, expiration_date, uid
      ) VALUES (
        $1, $2, $3
      ) RETURNING
        value
      `;
    const result = await this.queryDatabase<LinkToken>(query, [value, expirationDate, uid]);
    return result ? result.rows : null;
  };
}

export default DatabaseApi;
