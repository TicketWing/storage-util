"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisUtil = void 0;
const error_util_1 = require("./error.util");
class RedisUtil {
    client;
    errCode = 501;
    errName = "Redis Error";
    init(client) {
        this.client = client;
        return this;
    }
    async get(key) {
        if (!this.client) {
            throw new error_util_1.CustomError(this.errName, "Client error", this.errCode);
        }
        const data = await this.client.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }
    async set(key, data) {
        if (!this.client) {
            throw new error_util_1.CustomError(this.errName, "Client error", this.errCode);
        }
        const stringifiedData = JSON.stringify(data);
        await this.client.set(key, stringifiedData);
    }
    async update(key, data) {
        if (!this.client) {
            throw new error_util_1.CustomError(this.errName, "Client error", this.errCode);
        }
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
        if (!this.client) {
            throw new error_util_1.CustomError(this.errName, "Client error", this.errCode);
        }
        await this.client.del(key);
    }
}
exports.RedisUtil = RedisUtil;
