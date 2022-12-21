import { Pool, QueryResult } from "pg";
import getEnvironmentVariable from "../../env/getEnvironmentVariable";

const PG_USER = getEnvironmentVariable("PG_USER");
const PG_HOST = getEnvironmentVariable("PG_HOST");
const PG_DATABASE = getEnvironmentVariable("PG_DATABASE");
const PG_PASSWORD = getEnvironmentVariable("PG_PASSWORD");
const PG_PORT = getEnvironmentVariable("PG_PORT");

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: Number(PG_PORT),
});

const db = {
  query: (text: string, parameters: (string | number)[]) => {
    return new Promise((resolve: (result: QueryResult<any>) => void, reject) => {
      pool.query(text, parameters, (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

export default db;
