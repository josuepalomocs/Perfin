CREATE TABLE item(
  item_id SERIAL PRIMARY KEY NOT NULL,
  plaid_item_id VARCHAR(50) NOT NULL,
  plaid_access_token VARCHAR(100) NOT NULL,
  firebase_uid VARCHAR(50) NOT NULL
);

CREATE TABLE link_token(
  id SERIAL PRIMARY KEY NOT NULL,
  value VARCHAR(100) NOT NULL,
  expiration_date TIMESTAMP NOT NULL,
  bearer_id VARCHAR(100)
);