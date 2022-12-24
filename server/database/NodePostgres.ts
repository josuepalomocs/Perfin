import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";
import getEnvironmentVariable from "../../env/getEnvironmentVariable";

abstract class NodePostgres {
  private readonly configuration: PoolConfig;
  private readonly pool: Pool;

  public constructor() {
    this.configuration = this.getPoolConfiguration();
    this.pool = new Pool(this.configuration);
  }

  private getPoolConfiguration(): PoolConfig {
    return {
      user: getEnvironmentVariable("PG_USER"),
      host: getEnvironmentVariable("PG_HOST"),
      database: getEnvironmentVariable("PG_DATABASE"),
      password: getEnvironmentVariable("PG_PASSWORD"),
      port: Number(getEnvironmentVariable("PG_PORT")),
    };
  }

  protected async queryDatabase<R extends QueryResultRow>(query: string, values?: any[]) {
    try {
      const queryResult = await this.pool.query<R>(query, values);
      return queryResult;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default NodePostgres;
