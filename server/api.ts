import db from "./pg/config";

export interface postItemParameters {
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

export const postItem = async ({ itemId, accessToken, uid }: postItemParameters) => {
  const queryText = `INSERT INTO item(plaid_item_id, plaid_access_token, firebase_uid) VALUES ($1, $2, $3) RETURNING (plaid_item_id, plaid_access_token, firebase_uid) `;

  return db
    .query(queryText, [itemId, accessToken, uid])
    .then((item) => {
      return item;
    })
    .catch((error) => {
      return null;
    });
};
