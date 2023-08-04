"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const cache_util_1 = require("./cache.util");
const error_util_1 = require("./error.util");
const database_util_1 = require("./database.util");
class Storage {
    cache;
    database;
    constructor(pool, client, table) {
        this.cache = new cache_util_1.CacheUtil(client);
        this.database = new database_util_1.DatabaseUtil(pool, table);
    }
    async get(options) {
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
    async insert(data, options) {
        const { cacheOptions, dbOptions } = options;
        const value = await this.database.insert(data, dbOptions);
        if (cacheOptions) {
            if (!dbOptions.returning.includes(cacheOptions.keyField)) {
                throw new error_util_1.CustomError("Cache Error", "Missed key", 501);
            }
            await this.cache.set(value, cacheOptions);
        }
        return value.id || null;
    }
    async update(data, options) {
        const { dbOptions, cacheOptions } = options;
        await this.database.update(data, dbOptions);
        if (cacheOptions) {
            await this.cache.update(data, cacheOptions);
        }
    }
    async delete(options) {
        const { cacheOptions, dbOptions } = options;
        await this.database.delete(dbOptions);
        if (cacheOptions) {
            await this.cache.delete(cacheOptions);
        }
    }
}
exports.Storage = Storage;
