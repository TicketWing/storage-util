import {
  DeleteCacheOptions,
  GetCacheOptions,
  InsertCacheOptions,
  UpdateCacheOptions,
} from "../types/cache.types";
import { RedisConfig } from "../types/config.types";
import { CustomError } from "./error.util";
import { RedisUtil } from "./redis.util";

export class CacheUtil {
  private redis: RedisUtil;
  private errCode = 500;
  private errName = "Redis Error";

  constructor(config: RedisConfig) {
    this.redis = new RedisUtil(config);
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

  async get(options: GetCacheOptions) {
    const { cacheKey, cachedFields } = options;
    const query = this.redis.get(cacheKey);
    const record = await this.handler(query, "GET Error");
    const result = this.includeInCache(record, cachedFields);
    return result;
  }

  async set(data: any, options: InsertCacheOptions): Promise<void> {
    const { keyField, cachedFields } = options;
    const key = data[keyField];
    const cached = this.includeInCache(data, cachedFields);
    const query = this.redis.set(key, cached);
    await this.handler(query, "SET Error");
  }

  async update(data: any, options: UpdateCacheOptions) {
    const { cacheKey, updatingFields } = options;
    const updations = this.includeInCache(data, updatingFields);
    const query = this.redis.update(cacheKey, updations);
    await this.handler(query, "UPDATE Error");
  }

  async delete(options: DeleteCacheOptions) {
    const query = this.redis.delete(options.cacheKey);
    await this.handler(query, "DELETE Error");
  }
}
