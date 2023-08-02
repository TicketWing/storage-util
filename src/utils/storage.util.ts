import {
  DeleteDBOptions,
  GetDBOptions,
  InsertDBOptions,
  UpdateDBOptions,
} from "../types/database.types";
import {
  DeleteCacheOptions,
  GetCacheOptions,
  InsertCacheOptions,
  UpdateCacheOptions,
} from "../types/cache.types";
import { Options } from "../constructors/options.constructor";
import { CacheUtil } from "./cache.util";
import { CustomError } from "./error.util";
import { DatabaseUtil } from "./database.util";
import { KnexConfig, RedisConfig } from "../types/config.types";

export class Storage {
  private cache: CacheUtil;
  private database: DatabaseUtil;

  constructor(knexConf: KnexConfig, redisConf: RedisConfig, table: string) {
    this.cache = new CacheUtil(redisConf);
    this.database = new DatabaseUtil(knexConf, table);
  }

  async get(options: Options<GetDBOptions, GetCacheOptions>): Promise<any[]> {
    const { dbOptions, cacheOptions } = options;

    if (cacheOptions) {
      let instance = await this.cache.get(cacheOptions);

      if (!instance) {
        const { cachedFields } = cacheOptions;
        instance = await this.database.get(dbOptions);
        await this.cache.set(instance, { keyField: "id", cachedFields });
      }
      return instance;
    }

    const record = await this.database.get(dbOptions);
    return record;
  }

  async insert<T>(
    data: T,
    options: Options<InsertDBOptions, InsertCacheOptions | undefined>
  ): Promise<string> {
    const { cacheOptions, dbOptions } = options;
    const value = await this.database.insert<T>(data, dbOptions);

    if (cacheOptions) {
      if (!dbOptions.returning.includes(cacheOptions.keyField)) {
        throw new CustomError("Cache Error", "Missed key", 501);
      }

      await this.cache.set(value, cacheOptions);
    }

    return value.id || null;
  }

  async update<T>(
    data: T,
    options: Options<UpdateDBOptions, UpdateCacheOptions | undefined>
  ): Promise<void> {
    const { dbOptions, cacheOptions } = options;
    await this.database.update(data, dbOptions);

    if (cacheOptions) {
      await this.cache.update(data, cacheOptions);
    }
  }

  async delete(
    options: Options<DeleteDBOptions, DeleteCacheOptions | undefined>
  ): Promise<void> {
    const { cacheOptions, dbOptions } = options;
    await this.database.delete(dbOptions);

    if (cacheOptions) {
      await this.cache.delete(cacheOptions);
    }
  }
}
