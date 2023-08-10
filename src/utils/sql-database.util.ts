import { Knex } from "knex";
import {
  DatabaseUtil,
  DeleteDBOptions,
  GetDBOptions,
  InsertDBOptions,
  UpdateDBOptions,
} from "../types/database.types";
import { ErrorHandler } from "./error-handler.util";

export class SQLDatabaseUtil extends ErrorHandler implements DatabaseUtil {
  private table: string;
  private pool: Knex;

  constructor(pool: Knex, table: string) {
    super("Database", 501);
    this.pool = pool;
    this.table = table;
  }

  async get(options: GetDBOptions) {
    const { select, where } = options;
    const query = this.pool(this.table)
      .select(...select)
      .where(where);
    const record = await this.handler(query, "GET Error");
    return record[0];
  }

  async insert<T>(data: T, options: InsertDBOptions): Promise<any> {
    const query = this.pool(this.table)
      .returning(options.returning || ["id"])
      .insert(data);
    const inserted = await this.handler(query, "INSERT Error");
    return inserted[0];
  }

  async update<T>(data: T, options: UpdateDBOptions): Promise<void> {
    const query = this.pool(this.table).where(options.where).update(data);
    await this.handler(query, "UPDATE Error");
  }

  async delete(options: DeleteDBOptions) {
    const query = this.pool(this.table).where(options.where).del();
    await this.handler(query, "DELETE Error");
  }
}
