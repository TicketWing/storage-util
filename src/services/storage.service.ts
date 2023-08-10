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
import { Knex } from "knex";
import { Redis } from "ioredis";
import { Options } from "../types/options.types";
import { CacheUtil } from "../utils/cache.util";
import { SQLDatabaseUtil } from "../utils/sql-database.util";
import { ErrorConstructor } from "../constructors/error.constructor";


export class CacheableSQLStorage {
  private cache: CacheUtil;
  private database: SQLDatabaseUtil;

  constructor(pool: Knex, client: Redis, table: string) {
    this.cache = new CacheUtil(client);
    this.database = new SQLDatabaseUtil(pool, table);
  }

  async get(
    options: Options<GetDBOptions, GetCacheOptions | undefined>
  ): Promise<any> {
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
        throw new ErrorConstructor("Cache Error", "Missed key", 501);
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
