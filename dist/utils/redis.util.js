"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisUtil = void 0;
const error_util_1 = require("./error.util");
const redis_consts_1 = require("../consts/redis.consts");
class RedisUtil {
    client;
    errCode = 501;
    errName = "Redis Error";
    success = redis_consts_1.successStatuses;
    fail = redis_consts_1.failedStatuses;
    constructor(client) {
        this.init(client);
    }
    checkConnection(client) {
        if (this.success.includes(client.status)) {
            return true;
        }
        return false;
    }
    async init(client) {
        const isConnected = this.checkConnection(client);
        if (!isConnected) {
            await client.connect();
        }
        this.client = client;
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
