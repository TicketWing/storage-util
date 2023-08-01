import { Redis } from "ioredis";
import { RedisConfig } from "../types/config.types";
import { CustomError } from "./error.util";

export class RedisUtil {
  private client: Redis;
  private errCode = 501;
  private errName = "Redis Error";

  constructor(config: RedisConfig) {
    this.client = new Redis(config);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  async set<T>(key: string, data: T): Promise<void> {
    const stringifiedData = JSON.stringify(data);
    await this.client.set(key, stringifiedData);
  }

  async update<I, T>(key: string, data: T): Promise<void> {
    const record = await this.get<any>(key);

    if (!record) {
      throw new CustomError(this.errName, "Does not exist", this.errCode);
    }

    for (const field in data) {
      if (record[field] !== undefined) {
        record[field] = data[field];
      }
    }

    await this.set<I>(key, record);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
