import { QueryResult } from "pg";
import db from "./config";

export interface Item {
  itemId: string;
  accessToken: string;
  uid: string;
}

export const getItemListByUid = async (uid: string) => {
  const queryText = `SELECT item_id AS itemId,
    plaid_item_id AS plaidItemId, 
    plaid_access_token AS plaidAccessToken, 
    firebase_uid AS firebaseUid 
    FROM item WHERE item_id = $1`;

  return db
    .query(queryText, [uid])
    .then((itemList) => {
      return itemList;
    })
    .catch((error) => {
      return null;
    });
};

export const createItem = async ({ itemId, accessToken, uid }: Item) => {
  const queryText = `INSERT INTO item(plaid_item_id, plaid_access_token, firebase_uid) VALUES ($1, $2, $3) RETURNING plaid_item_id AS itemId, plaid_access_token AS accessToken, firebase_uid AS uid`;

  return db
    .query(queryText, [itemId, accessToken, uid])
    .then((item: QueryResult<Item>) => {
      return item.rows[0];
    })
    .catch((error) => {
      return null;
    });
};
