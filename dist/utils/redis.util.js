"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisUtil = void 0;
const ioredis_1 = require("ioredis");
const error_util_1 = require("./error.util");
class RedisUtil {
    client;
    errCode = 501;
    errName = "Redis Error";
    constructor(config) {
        this.client = new ioredis_1.Redis(config);
    }
    async get(key) {
        const data = await this.client.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
    async set(key, data) {
        const stringifiedData = JSON.stringify(data);
        await this.client.set(key, stringifiedData);
    }
    async update(key, data) {
        const record = await this.get(key);
        if (!record) {
            throw new error_util_1.CustomError(this.errName, "Does not exist", this.errCode);
        }
        for (const field in data) {
            if (record[field] !== undefined) {
                record[field] = data[field];
            }
        }
        await this.set(key, record);
    }
    async delete(key) {
        await this.client.del(key);
    }
}
exports.RedisUtil = RedisUtil;
