import {
  GetCacheOptions,
  InsertCacheOptions,
  DeleteCacheOptions,
  UpdateCacheOptions,
} from "../types/cache.types";
import { Redis } from "ioredis";
import { RedisUtil } from "./redis.util";
import { ErrorHandler } from "./error-handler.util";

export class CacheUtil extends ErrorHandler {
  private redis: RedisUtil;

  constructor(client: Redis) {
    super("Cache", 501);
    this.redis = new RedisUtil(client);
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
