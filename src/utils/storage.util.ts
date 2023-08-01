import knex, { Knex } from "knex";
import { RedisUtil } from "./redis.util";
import { CustomError } from "./error.util";
import { Options } from "../constructors/options.constructor";
import { KnexConfig, RedisConfig } from "../types/config.types";
import {
  DeleteCacheOptions,
  GetCacheOptions,
  InsertCacheOptions,
  UpdateCacheOptions,
} from "../types/cache.types";
import {
  DeleteQueries,
  GetQueries,
  InsertQueries,
  UpdateQueries,
} from "../types/queries.types";

export class Storage {
  private table: string;
  private redis: RedisUtil;
  private errCode = 500;
  private errName = "Storage Error";
  private database: Knex<any, unknown[]>;

  constructor(knexConf: KnexConfig, redisConf: RedisConfig, table: string) {
    this.table = table;
    this.database = knex(knexConf);
    this.redis = new RedisUtil(redisConf);
  }

  private async handler<T>(promise: Promise<T>, msg: string): Promise<T> {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      throw new CustomError(this.errName, msg, this.errCode);
    }
  }

  private includeInCache<T>(obj: T, fields: string[]) {
    const result: any = {};

    for (const field in obj) {
      if (fields.includes(field)) {
        result[field] = obj[field];
      }
    }

    return result;
  }

  async get(options: Options<GetQueries, GetCacheOptions>): Promise<any[]> {
    const { select, where } = options.queries;
    const response = await this.database.where(where).select(...select);
    return response;
  }

  async getCache<T>(id: string) {
    const cached = await this.redis.get<T>(id);

    if (!cached) {
      const query = this.database(this.table).where({ id }).select();
      const result = await this.handler(query, "GET Error");
      return result;
    }

    return cached;
  }

  async insert<T>(
    data: T,
    options: Options<InsertQueries, InsertCacheOptions>
  ): Promise<string> {
    const { returning } = options.queries;
    const query = this.database(this.table).insert(data).returning(returning);
    const inserted = await this.handler(query, "INSERT Error");
    const value = inserted[0];

    if (options.cacheable && options.cacheOptions) {
      const { keyField, cachedFields } = options.cacheOptions;

      if (!returning.includes(keyField)) {
        throw new CustomError(this.errName, "Missed key", this.errCode);
      }

      const key = value[keyField];
      const cached = this.includeInCache(value, cachedFields);
      await this.redis.set(key, cached);
    }

    return value.id || null;
  }

  async update<T>(
    data: T,
    options: Options<UpdateQueries, UpdateCacheOptions>
  ): Promise<void> {
    const { where } = options.queries;
    const query = this.database(this.table).where(where).update(data);
    await this.handler(query, "UPDATE Error");

    if (options.cacheable && options.cacheOptions) {
      const { cacheKey, updatingFields } = options.cacheOptions;
      const updations = this.includeInCache(data, updatingFields);
      await this.redis.update(cacheKey, updations);
    }
  }

  async delete(
    options: Options<DeleteQueries, DeleteCacheOptions>
  ): Promise<void> {
    const { where } = options.queries;
    const query = this.database.where(where).del();
    await this.handler(query, "DELETE Error");

    if (options.cacheable && options.cacheOptions) {
      const { cacheKey } = options.cacheOptions;
      await this.redis.delete(cacheKey);
    }
  }
}
