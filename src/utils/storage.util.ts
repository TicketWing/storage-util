import knex, { Knex } from "knex";
import { RedisUtil } from "./redis.util";
import { CustomError } from "./error.util";
import { Options } from "../constructors/options.constructor";
import { KnexConfig, RedisConfig } from "../types/storage.types";

export class Storage {
  private redis: RedisUtil;
  private database: Knex<any, unknown[]>;
  private tableName: string;

  constructor(knexConf: KnexConfig, redisConf: RedisConfig, table: string) {
    this.redis = new RedisUtil(redisConf);
    this.database = knex(knexConf);
    this.tableName = table;
  }

  private async handler<T>(promise: Promise<T>, msg: string): Promise<T> {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new CustomError("Database", msg, 500);
    }
  }

  private processReturning<T>(obj: T, returning: string[]) {
    const result: any = {};

    for (const field in obj) {
      if (returning.includes(field)) {
        result[field] = obj[field];
      }
    }

    return result;
  }

  async get(options: Options): Promise<any[]> {
    const { conditions, select } = options;
    const response = await this.database.where(conditions).select(...select);
    return response;
  }

  async getCache<T>(id: string) {
    const cached = await this.redis.get<T>(id);

    if (!cached) {
      const query = this.database(this.tableName).where({ id }).select();
      const result = await this.handler(query, "Error in get");
      return result;
    }

    return cached;
  }

  async insert<T>(data: T, options: Options): Promise<string> {
    const { cacheable, returning } = options;
    const query = this.database(this.tableName)
      .insert(data)
      .returning(returning);
    const inserted = await this.handler(query, "Error in insert");
    const key = inserted[0].id;

    if (cacheable) {
      await this.redis.set(key, inserted[0]);
    }

    return key;
  }

  async update<T>(data: T, options: Options): Promise<void> {
    const { key, cacheable, conditions, returning } = options;
    const query = this.database(this.tableName).where(conditions).update(data);
    await this.handler(query, "Error in update");

    if (key && cacheable) {
      const updations = this.processReturning(data, returning);
      await this.redis.update(key, updations);
    }
  }

  async delete(options: Options): Promise<void> {
    const { key, cacheable, conditions } = options;
    const query = this.database.where(conditions).del();
    await this.handler(query, "Error in delete");

    if (key && cacheable) {
      await this.redis.delete(key);
    }
  }
}
