import { Redis } from "ioredis";
import { ErrorConstructor } from "../constructors/error.constructor";

export class RedisUtil {
  private client: Redis;
  private errCode = 501;
  private errName = "Redis Error";

  constructor(client: Redis) {
    this.client = client;
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
      throw new ErrorConstructor(this.errName, "Does not exist", this.errCode);
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
