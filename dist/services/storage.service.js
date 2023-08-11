"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheableStorage = void 0;
const cache_util_1 = require("../utils/cache.util");
const sql_database_util_1 = require("../utils/sql-database.util");
const error_constructor_1 = require("../constructors/error.constructor");
const nosql_database_util_1 = require("../utils/nosql-database.util");
class CacheableStorage {
    cache;
    database;
    constructor(pool, client, table = undefined) {
        this.cache = new cache_util_1.CacheUtil(client);
        this.database = table
            ? new sql_database_util_1.SQLDatabaseUtil(pool, table)
            : new nosql_database_util_1.NoSQLDatabaseUtil(pool);
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
                throw new error_constructor_1.ErrorConstructor("Cache Error", "Missed key", 501);
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
exports.CacheableStorage = CacheableStorage;
