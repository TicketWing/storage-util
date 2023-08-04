import { Redis } from "ioredis";
import { CustomError } from "./error.util";

export class RedisUtil {
  private client: Redis | undefined;
  private errCode = 501;
  private errName = "Redis Error";

  init(client: Redis) {
    this.client = client;
    return this;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.client) {
      throw new CustomError(this.errName, "Client error", this.errCode);
    }

    const data = await this.client.get(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  async set<T>(key: string, data: T): Promise<void> {
    if (!this.client) {
      throw new CustomError(this.errName, "Client error", this.errCode);
    }

    const stringifiedData = JSON.stringify(data);
    await this.client.set(key, stringifiedData);
  }

  async update<I, T>(key: string, data: T): Promise<void> {
    if (!this.client) {
      throw new CustomError(this.errName, "Client error", this.errCode);
    }
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
    if (!this.client) {
      throw new CustomError(this.errName, "Client error", this.errCode);
    }
    await this.client.del(key);
  }
}
