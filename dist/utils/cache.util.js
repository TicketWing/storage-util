"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheUtil = void 0;
const error_util_1 = require("./error.util");
const redis_util_1 = require("./redis.util");
class CacheUtil {
    redis;
    errCode = 500;
    errName = "Redis Error";
    constructor(client) {
        this.redis = new redis_util_1.RedisUtil().init(client);
    }
    async handler(promise, msg) {
        try {
            const result = await promise;
            return result;
        }
        catch (error) {
            throw new error_util_1.CustomError(this.errName, msg, this.errCode);
        }
    }
    includeInCache(obj, fields) {
        const result = {};
        for (const field in obj) {
            if (fields.includes(field)) {
                result[field] = obj[field];
            }
        }
        return result;
    }
    async get(options) {
        const { cacheKey, cachedFields } = options;
        const query = this.redis.get(cacheKey);
        const record = await this.handler(query, "GET Error");
        const result = this.includeInCache(record, cachedFields);
        return result;
    }
    async set(data, options) {
        const { keyField, cachedFields } = options;
        const key = data[keyField];
        const cached = this.includeInCache(data, cachedFields);
        const query = this.redis.set(key, cached);
        await this.handler(query, "SET Error");
    }
    async update(data, options) {
        const { cacheKey, updatingFields } = options;
        const updations = this.includeInCache(data, updatingFields);
        const query = this.redis.update(cacheKey, updations);
        await this.handler(query, "UPDATE Error");
    }
    async delete(options) {
        const query = this.redis.delete(options.cacheKey);
        await this.handler(query, "DELETE Error");
    }
}
exports.CacheUtil = CacheUtil;
