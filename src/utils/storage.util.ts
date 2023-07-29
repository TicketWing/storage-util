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

  private processExculde<T>(obj: T, exclude: string[] | undefined) {
    const result: any = { ...obj };

    if (exclude) {
      exclude.forEach((item) => {
        delete result[item];
      });
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
      const query = this.database(this.tableName).select();
      const result = await this.handler(query, "Error in get");
      return result;
    }

    return cached;
  }

  async insert<T>(data: T, options: Options): Promise<string> {
    const query = this.database(this.tableName).insert(data).returning("id");
    const inserted = await this.handler(query, "Error in insert");
    const key = inserted[0].id;

    if (options.cacheable) {
      const cacheableObj = this.processExculde(data, options.exclude);
      await this.redis.set(key, cacheableObj);
    }

    return key;
  }

  async update<T>(data: T, options: Options): Promise<void> {
    const { key, conditions, exclude } = options;
    const query = this.database(this.tableName).where(conditions).update(data);
    await this.handler(query, "Error in update");

    if (key) {
      const cacheable = this.processExculde(data, exclude);
      await this.redis.update(key, cacheable);
    }
  }

  async delete(options: Options): Promise<void> {
    const { key, conditions } = options;
    const query = this.database.where(conditions).del();
    await this.handler(query, "Error in delete");

    if (key) {
      await this.redis.delete(key);
    }
  }
}
