import { NextApiRequest, NextApiResponse } from 'next';
import { RemovedTransaction, Transaction, TransactionsSyncRequest } from 'plaid';
import plaidClient from '../../plaid/config';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  // Provide a cursor from your database if you've previously
  // received one for the Item. Leave null if this is your
  // first sync call for this Item. The first request will
  // return a cursor.
  let cursor;
  // New transaction updates since "cursor"
  let added: Array<Transaction> = [];
  let modified: Array<Transaction> = [];
  // Removed transaction ids
  let removed: Array<RemovedTransaction> = [];
  let hasMore = true;
  // Retrieve access token from request body
  const { accessToken } = req.body;
  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request: TransactionsSyncRequest = {
      access_token: accessToken,
      cursor: cursor,
    };
    try {
      const response = await plaidClient.transactionsSync(request);
      const data = response.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;
      res.status(200).json(data);
    } catch(error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
  // Persist cursor and updated data
  // database.applyUpdates(itemId, added, modified, removed, cursor);
}

export default handler;