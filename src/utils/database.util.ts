import knex, { Knex } from "knex";
import { KnexConfig } from "../types/config.types";
import {
  DeleteDBOptions,
  GetDBOptions,
  InsertDBOptions,
  UpdateDBOptions,
} from "../types/database.types";
import { CustomError } from "./error.util";

export class DatabaseUtil {
  private table: string;
  private errName = "Database";
  private errCode = 501;
  private database: Knex;

  constructor(config: KnexConfig, table: string) {
    this.database = knex(config);
    this.table = table;
  }

  private async handler<T>(promise: Promise<T>, msg: string): Promise<T> {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new CustomError(this.errName, msg, this.errCode);
    }
  }

  async get(options: GetDBOptions) {
    const { select, where } = options;
    const query = this.database.where(where).select(...select);
    const record = await this.handler(query, "GET Error");
    return record[0];
  }

  async insert<T>(data: T, options: InsertDBOptions): Promise<any> {
    const query = this.database(this.table)
      .insert(data)
      .returning(options.returning);
    const inserted = await this.handler(query, "INSERT Error");
    return inserted[0];
  }

  async update<T>(data: T, options: UpdateDBOptions): Promise<void> {
    const query = this.database(this.table).where(options.where).update(data);
    await this.handler(query, "UPDATE Error");
  }

  async delete(options: DeleteDBOptions) {
    const query = this.database.where(options.where).del();
    await this.handler(query, "DELETE Error");
  }
}
